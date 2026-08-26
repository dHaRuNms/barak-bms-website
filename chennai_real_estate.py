import os
import math
from typing import Dict, Any

# Coordinates for Blubridge Technologies, E160 Tiger Vardhachari road, Besant Nagar
CENTER_LAT = 12.9972
CENTER_LON = 80.2675

def calculate_distance_to_office(lat: float, lon: float) -> str:
    """
    Calculate the great circle distance in kilometers between a given property (lat, lon) 
    and Blubridge Technologies (Besant Nagar office).
    
    Args:
        lat: Latitude of the property
        lon: Longitude of the property
        
    Returns:
        A formatted string with the distance in km.
    """
    try:
        lat = float(lat)
        lon = float(lon)
        R = 6371.0 # Earth radius in km
        dlat = math.radians(lat - CENTER_LAT)
        dlon = math.radians(lon - CENTER_LON)
        a = math.sin(dlat / 2)**2 + math.cos(math.radians(CENTER_LAT)) * math.cos(math.radians(lat)) * math.sin(dlon / 2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        distance = R * c
        
        return f"{distance:.2f} km"
    except Exception as e:
        return f"Error calculating distance: {str(e)}"

# Register tool
TOOLS = [calculate_distance_to_office]
