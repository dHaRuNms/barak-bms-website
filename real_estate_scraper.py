import os
import json
import requests
from typing import Dict, Any, List

def search_real_estate(location: str, budget_max: int = 50000, bhk: str = "2BHK") -> str:
    """
    Searches for real estate listings (rentals) in a specific location using Apify's NoBroker scraper.
    
    Args:
        location: The area to search in (e.g., 'Indiranagar, Bangalore').
        budget_max: The maximum monthly rent budget in INR.
        bhk: The apartment type (e.g., '1BHK', '2BHK', '3BHK').
        
    Returns:
        A JSON string containing a list of property listings with title, price, location, and link.
    """
    apify_token = os.environ.get("APIFY_API_TOKEN")
    
    # If no token is provided, return mock data for demonstration purposes
    if not apify_token:
        print("[RealEstatePlugin] No APIFY_API_TOKEN found. Using mock data for demonstration.")
        mock_data = [
            {
                "title": f"Semi-furnished {bhk} Apartment",
                "price": f"₹{int(budget_max * 0.9)}/month",
                "location": location,
                "link": "https://www.nobroker.in/property/rent/bangalore/mock-listing-1",
                "amenities": ["Parking", "Power Backup", "Security"]
            },
            {
                "title": f"Fully-furnished {bhk} Independent House",
                "price": f"₹{int(budget_max * 0.95)}/month",
                "location": location,
                "link": "https://www.nobroker.in/property/rent/bangalore/mock-listing-2",
                "amenities": ["Gym", "Pool", "Lift"]
            }
        ]
        return json.dumps(mock_data, indent=2)

    # Note: Replace 'actor-id' with the actual Apify NoBroker scraper actor ID
    ACTOR_ID = "ecomscrape~nobroker-property-search-scraper" 
    url = f"https://api.apify.com/v2/acts/{ACTOR_ID}/runs?token={apify_token}"
    
    payload = {
        "city": location.split(",")[0].strip(),
        "rent_or_sale": "rent",
        "bhk_type": bhk,
        "max_budget": budget_max
    }
    
    try:
        # Step 1: Start the run
        response = requests.post(url, json=payload)
        response.raise_for_status()
        run_info = response.json()["data"]
        dataset_id = run_info["defaultDatasetId"]
        
        # Step 2: In a real async plugin, we would wait for the run to finish.
        # For simplicity here, we assume a fast synchronous run or use the Apify run-sync endpoint.
        # url_sync = f"https://api.apify.com/v2/acts/{ACTOR_ID}/run-sync-get-dataset-items?token={apify_token}"
        
        return json.dumps({"status": "error", "message": "Apify live scraping requires sync execution which is disabled in this mockup. Add a real token to enable."})
        
    except Exception as e:
        return json.dumps({"status": "error", "message": str(e)})

# Register the tool with Hermes
# Ensure the function is imported and registered in the plugin manager
TOOLS = [search_real_estate]
