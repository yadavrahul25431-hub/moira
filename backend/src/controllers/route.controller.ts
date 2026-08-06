// ===========================================
// MoveMind AI — Route Controller
// ===========================================

import { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/error.middleware";

interface Coordinates {
  lat: number;
  lng: number;
}

// Helper to calculate straight line distance in km (Haversine)
function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
  const dLon = (coord2.lng - coord1.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.lat * (Math.PI / 180)) *
      Math.cos(coord2.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

// Generate intermediate points to simulate a polyline route
function generateSimulatedPolyline(start: Coordinates, end: Coordinates, segments = 20): [number, number][] {
  const points: [number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const fraction = i / segments;
    // Add a slight curve/jitter to make it look less artificial on a map
    const jitterLat = (Math.random() - 0.5) * 0.01 * (i === 0 || i === segments ? 0 : 1);
    const jitterLng = (Math.random() - 0.5) * 0.01 * (i === 0 || i === segments ? 0 : 1);
    
    const lat = start.lat + (end.lat - start.lat) * fraction + jitterLat;
    const lng = start.lng + (end.lng - start.lng) * fraction + jitterLng;
    points.push([lat, lng]);
  }
  return points;
}

const INDIAN_CITY_COORDS: Record<string, Coordinates> = {
  "Hyderabad": { lat: 17.3850, lng: 78.4867 },
  "Bengaluru": { lat: 12.9716, lng: 77.5946 },
  "Chennai": { lat: 13.0827, lng: 80.2707 },
  "Mumbai": { lat: 19.0760, lng: 72.8777 },
  "Delhi": { lat: 28.7041, lng: 77.1025 },
  "Pune": { lat: 18.5204, lng: 73.8567 },
  "Kolkata": { lat: 22.5726, lng: 88.3639 },
  "Ahmedabad": { lat: 23.0225, lng: 72.5714 },
  "Vijayawada": { lat: 16.5062, lng: 80.6480 },
  "Visakhapatnam": { lat: 17.6868, lng: 83.2185 },
  "Tirupati": { lat: 13.6288, lng: 79.4192 },
  "Anantapur": { lat: 14.6819, lng: 77.6006 },
  "Kurnool": { lat: 15.8281, lng: 78.0373 } // included for sample route
};

export async function optimizeRoute(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { source, destination, vehicleType, departureTime, priority } = req.body;

    if (!source || !destination || !vehicleType) {
      throw new AppError("Source, destination, and vehicleType are required.", 400);
    }

    // Parse coordinates from city names
    const sourceCoords = INDIAN_CITY_COORDS[source] || INDIAN_CITY_COORDS["Hyderabad"];
    const destCoords = INDIAN_CITY_COORDS[destination] || INDIAN_CITY_COORDS["Bengaluru"];

    // Calculate raw distance (straight line)
    // We multiply by 1.3 to simulate real road distance which is rarely a straight line
    const rawDistance = calculateDistance(sourceCoords, destCoords);
    const roadDistanceKm = rawDistance * 1.3;

    // Base assumptions by vehicle type (Indian Context)
    const vehicleFactors: Record<string, { speedKmH: number; fuelPer100Km: number; costPerKm: number; co2PerKm: number }> = {
      "TRUCK": { speedKmH: 50, fuelPer100Km: 22.0, costPerKm: 25.0, co2PerKm: 0.8 },
      "BIKE": { speedKmH: 40, fuelPer100Km: 2.5, costPerKm: 2.5, co2PerKm: 0.05 },
      "CAR": { speedKmH: 60, fuelPer100Km: 7.0, costPerKm: 8.0, co2PerKm: 0.15 },
      "CAB": { speedKmH: 60, fuelPer100Km: 7.0, costPerKm: 12.0, co2PerKm: 0.15 },
      "BUS": { speedKmH: 45, fuelPer100Km: 20.0, costPerKm: 35.0, co2PerKm: 0.6 },
      "ELECTRIC VEHICLE": { speedKmH: 60, fuelPer100Km: 0, costPerKm: 2.0, co2PerKm: 0 }, 
    };

    const factor = vehicleFactors[vehicleType.toUpperCase()] || vehicleFactors["TRUCK"];

    // Simulate Congestion Level (Low, Moderate, Heavy, Severe)
    const rand = Math.random();
    let congestionLevel = "Low";
    let trafficMultiplier = 1.0;

    if (rand > 0.9) {
      congestionLevel = "Severe";
      trafficMultiplier = 1.8;
    } else if (rand > 0.7) {
      congestionLevel = "Heavy";
      trafficMultiplier = 1.4;
    } else if (rand > 0.4) {
      congestionLevel = "Moderate";
      trafficMultiplier = 1.2;
    }

    // Calculate metrics
    const travelTimeHours = (roadDistanceKm / factor.speedKmH) * trafficMultiplier;
    const travelTimeMinutes = Math.round(travelTimeHours * 60);

    const formattedTime = travelTimeMinutes >= 60 
      ? `${Math.floor(travelTimeMinutes / 60)}h ${travelTimeMinutes % 60}m` 
      : `${travelTimeMinutes}m`;

    const fuelConsumption = (roadDistanceKm / 100) * factor.fuelPer100Km * (trafficMultiplier > 1 ? 1.1 : 1);
    
    // Convert to Indian Rupees (INR)
    const fuelCost = roadDistanceKm * factor.costPerKm * trafficMultiplier;
    
    // Simulate Toll Cost
    const tollCost = roadDistanceKm > 50 ? Math.round(roadDistanceKm * 1.5) : 0;
    
    // Carbon Footprint in kg
    const carbonFootprint = roadDistanceKm * factor.co2PerKm * trafficMultiplier;
    
    // Route Score (0-100)
    let routeScore = 95 - (trafficMultiplier * 10) - (tollCost > 500 ? 5 : 0);
    if (priority === "Fastest route") routeScore += 2;
    if (priority === "Lowest carbon emission" && vehicleType === "Electric vehicle") routeScore = 99;
    routeScore = Math.max(0, Math.min(100, Math.round(routeScore)));

    const polyline = generateSimulatedPolyline(sourceCoords, destCoords);

    res.status(200).json({
      success: true,
      data: {
        distanceKm: Math.round(roadDistanceKm * 10) / 10,
        travelTime: formattedTime,
        travelTimeMinutes,
        fuelConsumptionLiters: Math.round(fuelConsumption * 10) / 10,
        fuelCost: Math.round(fuelCost),
        tollCost: tollCost,
        routeScore: routeScore,
        carbonFootprint: Math.round(carbonFootprint * 10) / 10,
        congestionLevel,
        routePolyline: polyline,
        sourceCoords,
        destCoords
      }
    });
  } catch (error) {
    next(error);
  }
}
