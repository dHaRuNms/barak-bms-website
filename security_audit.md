# Security Scan & Hardening Report: Hermes Agent Setup

This report provides a security assessment of the running Nous Research Hermes Agent setup on your system, identifying critical vulnerabilities, high-risk configurations, and recommended hardening measures.

## Executive Summary

| Component | Status | Risk Level | Details |
| :--- | :--- | :--- | :--- |
| **Network Security** | ⚠️ Expose Port `8642` | **CRITICAL** | Bound to `0.0.0.0` exposing the control interface to the entire local/public network. |
| **Isolation & Segregation** | ⚠️ Monolithic Container | **HIGH** | Gateway (hosting secrets) and Sandbox (executing commands) are in the same environment. |
| **Command Sanitization** | ❌ Tirith Scanner Missing | **HIGH** | Command filtering is disabled because the `tirith` binary is missing. |
| **Secret Management** |  Secure Permissions | **INFO** | `.env` has tight `600` permissions, but is accessible by the agent. |
| **Active Tools** | ⚠️ Dangerous Tools Enabled | **MEDIUM** | `terminal` and `computer_use` run without strict gateway constraints. |

---

## Technical Architecture & Attack Surface

The current setup runs a monolithic gateway inside Docker. The diagram below illustrates how a prompt injection or malicious code execution could compromise the system:

```mermaid
graph TD
    User([User: Telegram/WhatsApp]) -->|Interaction| Gateway[Hermes Gateway /opt/hermes]
    Gateway -->|Loads Config/Secrets| EnvFile[/.hermes/.env]
    Gateway -->|Local Backend| Shell[Local Container Shell]
    Shell -->|Write/Read Access| DataVol[/.hermes/ Directory Bind Mount]
    Shell -->|Network Access| LocalLAN[Internal Network / SSRF Target]
    
    style Gateway fill:#f9f,stroke:#333,stroke-width:2px
    style EnvFile fill:#ff9,stroke:#333,stroke-width:2px
    style DataVol fill:#f99,stroke:#333,stroke-width:2px
```

---

## Detailed Findings & Recommendations

### 1. Unrestricted Host Binding of Gateway Port (Port 8642)
> [!CAUTION]
> **Severity: CRITICAL**
> 
> The docker container binds port `8642` to `0.0.0.0:8642` on the host machine. If this machine is connected to a shared or public network, anyone on the network can access the Hermes API and WebUI dashboard, allowing unauthorized remote command execution.

*   **Risk**: Remote Code Execution (RCE) and theft of API keys/tokens.
*   **Remediation**: Rebind the port to `127.0.0.1` so it is only accessible locally or via an SSH tunnel.
    ```bash
    # Update your docker run or docker-compose config:
    # Change: -p 8642:8642
    # To:     -p 127.0.0.1:8642:8642
    ```

### 2. Lack of Gateway and Sandbox Segregation
> [!WARNING]
> **Severity: HIGH**
> 
> The gateway process and the command execution shell share the same container and the same mounted volume (`/home/dharun/.hermes` mounted at `/opt/data`).
> If the agent is compromised via prompt injection, it can execute terminal commands to read `.env` (stealing `NVIDIA_API_KEY` and `TELEGRAM_BOT_TOKEN`) or modify `SOUL.md` to permanently hijack the agent's behavior.

*   **Risk**: Post-exploitation privilege escalation and key theft.
*   **Remediation**: 
    1. Keep the credentials/gateway on the host or a separate host-isolated gateway container.
    2. Route command executions to an ephemeral sandbox container that does not mount the directory containing `.env` or `auth.json`.
    3. Ensure the system Docker socket is *not* mounted (verified: it is currently secure and not mounted).

### 3. Missing/Disabled Tirith Scanner
> [!WARNING]
> **Severity: HIGH**
> 
> Command sanitization relies on the Tirith scanner to detect destructive commands. Currently, the `tirith` binary is missing from the container PATH, and the `security` settings block in `config.yaml` is commented out.

*   **Risk**: Executing destructive commands (like `rm -rf /` or recursive deletions) without semantic inspection.
*   **Remediation**:
    1. Install the `tirith` binary inside the container or host.
    2. Explicitly configure and enable Tirith in `config.yaml` with fail-closed behavior:
       ```yaml
       security:
         redact_secrets: true
         tirith_enabled: true
         tirith_path: "tirith"
         tirith_timeout: 5
         tirith_fail_open: false  # Change to false to block commands if Tirith fails
       ```

### 4. SSRF Vulnerability via `web_browse`
> [!NOTE]
> **Severity: MEDIUM**
> 
> The `web_browse` tool is enabled but does not explicitly block access to private/internal IP ranges (like `127.0.0.1`, `10.0.0.0/8`, or cloud metadata services like `169.254.169.254`). An attacker could inject a prompt forcing the agent to request resources from internal infrastructure.

*   **Risk**: Server-Side Request Forgery (SSRF) targeting local network devices or the Docker host.
*   **Remediation**: Disable private URL resolution in your Hermes settings:
    ```bash
    docker exec -it hermes hermes tools disable web_browse --allow-private-urls
    # Or set the configuration flag explicitly:
    # web_browse: { allow_private_urls: false }
    ```

### 5. Insecure Command Approval in Headless Mode
> [!IMPORTANT]
> **Severity: MEDIUM**
> 
> Since the agent runs headless (integrated with Telegram and WhatsApp), verify how dangerous tool approvals (like `terminal` or `computer_use`) are handled. If auto-approvals are active (`--yolo` flag or `yolo: true` in config), any incoming message containing a prompt injection could execute arbitrary bash code.

*   **Remediation**:
    *   Do not bypass command verification.
    *   Use a dedicated channel/thread for interactive approvals or use a secondary fast LLM (Smart Approval) to rate-limit or reject high-risk command strings automatically.

---

## Action Plan (Next Steps)

1. **Rebuild Container with Safe Port Binding**: Modify your Docker startup configuration to bind port `8642` to localhost.
2. **Apply config.yaml Updates**: Uncomment the security block in `config.yaml` and install/verify Tirith.
3. **Audit Custom Skills**: Keep custom skills (like `real_estate_hunter.md`) strictly focused on formatting/tool invocation; do not embed raw scripts inside skills.