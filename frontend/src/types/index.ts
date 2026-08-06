// ===========================================
// MOIRA - Shared TypeScript Types
// ===========================================

// ── User & Auth ──────────────────────────────

export type UserRole = "ADMIN" | "MANAGER" | "DRIVER" | "VIEWER";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl: string | null;
  phone: string | null;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// ── Vehicle & Fleet ──────────────────────────

export type VehicleStatus = "ACTIVE" | "IDLE" | "MAINTENANCE" | "OUT_OF_SERVICE";
export type VehicleType = "SEDAN" | "SUV" | "VAN" | "TRUCK" | "BUS" | "ELECTRIC" | "HYBRID";
export type FuelType = "GASOLINE" | "DIESEL" | "ELECTRIC" | "HYBRID" | "CNG";

export interface Vehicle {
  id: string;
  registrationNo: string;
  name: string;
  type: VehicleType;
  fuelType: FuelType;
  status: VehicleStatus;
  make: string;
  model: string;
  year: number;
  color: string | null;
  mileage: number;
  fuelLevel: number;
  lastServiceDate: string | null;
  nextServiceDate: string | null;
  insuranceExpiry: string | null;
  currentLat: number | null;
  currentLng: number | null;
  currentSpeed: number | null;
  isOnline: boolean;
  driverId: string | null;
  driver: User | null;
  createdAt: string;
  updatedAt: string;
}

export interface TelemetryRecord {
  id: string;
  vehicleId: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number | null;
  fuelLevel: number | null;
  engineTemp: number | null;
  odometer: number | null;
  recordedAt: string;
}

// ── Route ────────────────────────────────────

export type RouteStatus = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface Route {
  id: string;
  name: string;
  userId: string;
  vehicleId: string | null;
  status: RouteStatus;
  originLat: number;
  originLng: number;
  originAddress: string;
  destLat: number;
  destLng: number;
  destAddress: string;
  distanceKm: number | null;
  estimatedTimeMin: number | null;
  actualTimeMin: number | null;
  fuelConsumed: number | null;
  co2Emission: number | null;
  isOptimized: boolean;
  scheduledAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
  waypoints: Waypoint[];
  vehicle: Vehicle | null;
  createdAt: string;
  updatedAt: string;
}

export interface Waypoint {
  id: string;
  routeId: string;
  latitude: number;
  longitude: number;
  address: string | null;
  order: number;
  arrivedAt: string | null;
}

export interface CreateRoutePayload {
  name: string;
  vehicleId?: string;
  originLat: number;
  originLng: number;
  originAddress: string;
  destLat: number;
  destLng: number;
  destAddress: string;
  scheduledAt?: string;
  waypoints?: Array<{
    latitude: number;
    longitude: number;
    address?: string;
    order: number;
  }>;
}

// ── Traffic ──────────────────────────────────

export interface TrafficPrediction {
  id: string;
  regionName: string;
  latitude: number;
  longitude: number;
  radiusKm: number;
  congestionIdx: number;
  avgSpeedKmh: number | null;
  incidentCount: number;
  predictedAt: string;
  validUntil: string;
  confidence: number;
}

// ── Analytics ────────────────────────────────

export interface AnalyticsSnapshot {
  id: string;
  date: string;
  totalTrips: number;
  totalDistanceKm: number;
  totalFuelConsumed: number;
  totalCo2Emission: number;
  avgTripDurationMin: number;
  activeVehicles: number;
  onTimePercentage: number;
  costSavings: number;
}

export interface DashboardStats {
  totalVehicles: number;
  activeVehicles: number;
  totalRoutes: number;
  completedRoutes: number;
  totalDistanceKm: number;
  avgOnTimePercentage: number;
  totalCostSavings: number;
  totalCo2Saved: number;
}

// ── AI Assistant ─────────────────────────────

export type MessageRole = "USER" | "ASSISTANT" | "SYSTEM";

export interface Message {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  isActive: boolean;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface AskAssistantPayload {
  conversationId?: string;
  message: string;
}

// ── Notifications ────────────────────────────

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
}

// ── API Response ─────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
