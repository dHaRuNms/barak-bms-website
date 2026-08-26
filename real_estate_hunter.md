# Chennai Real Estate Hunter Skill

## User Context
- **Name:** Dharun M S
- **Email:** dharunsudarsanam21@gmail.com
- **Phone:** +91 8300258551
- **Office:** Blubridge Technologies, E160 Tiger Vardhachari road, Besant nagar, Chennai 600090
- **Requirement:** We are a group of 4-5 bachelors. All suggested houses MUST allow bachelors.

## Trigger
When the user asks to run the Chennai real estate search, or asks for houses in Besant Nagar / Adyar / Thiruvanmiyur / Kottivakkam / Perungudi.

## Logic
1. Call the `search_chennai_rentals` tool. This tool handles the 7km radius logic, 30k budget, and bachelor filters.
2. Parse the JSON response.
3. If the tool returns a message about needing an API token, gently remind the user that we are using mock data for demonstration.

## Formatting Rules for Mobile (WhatsApp/Telegram)
You must present the results in a highly readable, mobile-friendly format. 
Use emojis and clean spacing. Do NOT use markdown tables.
Format each property exactly like this:

🏠 **[Title]**
💰 Rent: ₹[Price]
📍 Distance to Office: [Distance] km
👨‍🎓 Bachelor Friendly: Yes (4-5 guys)
📱 Contact: [If a phone number is provided, create a link like this: https://wa.me/91<number> (e.g., https://wa.me/919876543210)]
🔗 [Property Link]

---

**IMPORTANT SECURITY RULE:** Do NOT attempt to fill out forms on these links using the user's phone/email. Real estate portals require live SMS OTPs which you cannot access autonomously. Only provide the links so the user can log in on their own phone.
