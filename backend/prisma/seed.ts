// ===========================================
// MoveMind AI - Prisma Database Seed
// ===========================================

import { PrismaClient, UserRole, VehicleType, VehicleStatus, FuelType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding MoveMind AI database...\n");

  // ── Create Admin User ──────────────────────────
  const hashedPassword = await bcrypt.hash("Admin@123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@movemind.ai" },
    update: {},
    create: {
      email: "admin@movemind.ai",
      passwordHash: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      role: UserRole.ADMIN,
      phone: "+1-555-000-0001",
      isActive: true,
    },
  });
  console.log(`✅ Admin user created: ${admin.email}`);

  // ── Create Manager User ────────────────────────
  const manager = await prisma.user.upsert({
    where: { email: "manager@movemind.ai" },
    update: {},
    create: {
      email: "manager@movemind.ai",
      passwordHash: hashedPassword,
      firstName: "Sarah",
      lastName: "Chen",
      role: UserRole.MANAGER,
      phone: "+1-555-000-0002",
      isActive: true,
    },
  });
  console.log(`✅ Manager user created: ${manager.email}`);

  // ── Create Driver Users ────────────────────────
  const driverData = [
    { email: "driver1@movemind.ai", firstName: "Marcus", lastName: "Rivera" },
    { email: "driver2@movemind.ai", firstName: "Aisha", lastName: "Patel" },
    { email: "driver3@movemind.ai", firstName: "Jake", lastName: "Morrison" },
  ];

  const drivers = [];
  for (const d of driverData) {
    const driver = await prisma.user.upsert({
      where: { email: d.email },
      update: {},
      create: {
        email: d.email,
        passwordHash: hashedPassword,
        firstName: d.firstName,
        lastName: d.lastName,
        role: UserRole.DRIVER,
        isActive: true,
      },
    });
    drivers.push(driver);
    console.log(`✅ Driver created: ${driver.email}`);
  }

  // ── Create Vehicles ────────────────────────────
  const vehicleData = [
    {
      registrationNo: "MM-EV-001",
      name: "Tesla Model 3 #1",
      type: VehicleType.SEDAN,
      fuelType: FuelType.ELECTRIC,
      status: VehicleStatus.ACTIVE,
      make: "Tesla",
      model: "Model 3",
      year: 2024,
      color: "Pearl White",
      mileage: 12450,
      fuelLevel: 82,
      currentLat: 40.7128,
      currentLng: -74.006,
      currentSpeed: 45,
      isOnline: true,
      driverId: drivers[0].id,
    },
    {
      registrationNo: "MM-HY-002",
      name: "Toyota Camry Hybrid",
      type: VehicleType.SEDAN,
      fuelType: FuelType.HYBRID,
      status: VehicleStatus.ACTIVE,
      make: "Toyota",
      model: "Camry Hybrid",
      year: 2024,
      color: "Midnight Blue",
      mileage: 8320,
      fuelLevel: 67,
      currentLat: 40.7589,
      currentLng: -73.9851,
      currentSpeed: 32,
      isOnline: true,
      driverId: drivers[1].id,
    },
    {
      registrationNo: "MM-VN-003",
      name: "Ford Transit #1",
      type: VehicleType.VAN,
      fuelType: FuelType.DIESEL,
      status: VehicleStatus.IDLE,
      make: "Ford",
      model: "Transit",
      year: 2023,
      color: "Silver",
      mileage: 34200,
      fuelLevel: 55,
      currentLat: 40.7484,
      currentLng: -73.9857,
      isOnline: false,
      driverId: null,
    },
    {
      registrationNo: "MM-EV-004",
      name: "Rivian R1T",
      type: VehicleType.TRUCK,
      fuelType: FuelType.ELECTRIC,
      status: VehicleStatus.ACTIVE,
      make: "Rivian",
      model: "R1T",
      year: 2024,
      color: "Forest Green",
      mileage: 5680,
      fuelLevel: 91,
      currentLat: 40.7306,
      currentLng: -73.9352,
      currentSpeed: 28,
      isOnline: true,
      driverId: drivers[2].id,
    },
    {
      registrationNo: "MM-BUS-005",
      name: "Mercedes Sprinter",
      type: VehicleType.BUS,
      fuelType: FuelType.DIESEL,
      status: VehicleStatus.MAINTENANCE,
      make: "Mercedes",
      model: "Sprinter",
      year: 2022,
      color: "White",
      mileage: 67800,
      fuelLevel: 30,
      isOnline: false,
      driverId: null,
    },
  ];

  for (const v of vehicleData) {
    const vehicle = await prisma.vehicle.upsert({
      where: { registrationNo: v.registrationNo },
      update: {},
      create: v,
    });
    console.log(`✅ Vehicle created: ${vehicle.name} (${vehicle.registrationNo})`);
  }

  // ── Create Sample Analytics Snapshots ──────────
  const today = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const baseTrips = Math.floor(Math.random() * 15) + 20;
    const baseDist = baseTrips * (Math.random() * 25 + 30);

    await prisma.analyticsSnapshot.upsert({
      where: { date },
      update: {},
      create: {
        date,
        totalTrips: baseTrips,
        totalDistanceKm: Math.round(baseDist * 10) / 10,
        totalFuelConsumed: Math.round(baseDist * 0.08 * 10) / 10,
        totalCo2Emission: Math.round(baseDist * 0.12 * 10) / 10,
        avgTripDurationMin: Math.round((Math.random() * 20 + 25) * 10) / 10,
        activeVehicles: Math.floor(Math.random() * 3) + 3,
        onTimePercentage: Math.round((Math.random() * 15 + 82) * 10) / 10,
        costSavings: Math.round(Math.random() * 200 + 100),
      },
    });
  }
  console.log("✅ Analytics snapshots created (30 days)");

  // ── Create Sample Traffic Predictions ──────────
  const regions = [
    { name: "Midtown Manhattan", lat: 40.7549, lng: -73.984 },
    { name: "Brooklyn Bridge", lat: 40.7061, lng: -73.9969 },
    { name: "Times Square", lat: 40.758, lng: -73.9855 },
    { name: "Financial District", lat: 40.7074, lng: -74.0113 },
    { name: "Chelsea", lat: 40.7465, lng: -74.0014 },
  ];

  for (const region of regions) {
    const prediction = await prisma.trafficPrediction.create({
      data: {
        regionName: region.name,
        latitude: region.lat,
        longitude: region.lng,
        radiusKm: 3,
        congestionIdx: Math.round(Math.random() * 100) / 100,
        avgSpeedKmh: Math.round((Math.random() * 30 + 15) * 10) / 10,
        incidentCount: Math.floor(Math.random() * 5),
        predictedAt: new Date(),
        validUntil: new Date(Date.now() + 3600000),
        confidence: Math.round((Math.random() * 0.2 + 0.75) * 100) / 100,
      },
    });
    console.log(`✅ Traffic prediction: ${prediction.regionName}`);
  }

  console.log("\n🎉 Seed completed successfully!");
  console.log("\n📋 Login credentials:");
  console.log("   Admin:   admin@movemind.ai   / Admin@123");
  console.log("   Manager: manager@movemind.ai / Admin@123");
  console.log("   Drivers: driver[1-3]@movemind.ai / Admin@123");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
