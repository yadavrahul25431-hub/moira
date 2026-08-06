# ==============================================================================
# MoveMind AI - Start Script
# ==============================================================================
# This script installs dependencies and starts both the frontend and backend 
# concurrently for local development.
# ==============================================================================

$Root = $PSScriptRoot
$BackendDir = Join-Path $Root "backend"
$FrontendDir = Join-Path $Root "frontend"

Write-Host "Starting MoveMind AI Platform..." -ForegroundColor Cyan

# Check if node is installed
if (-not (Get-Command "npm" -ErrorAction SilentlyContinue)) {
    Write-Host "Error: npm is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

# 1. Setup Backend
Write-Host "`n[1/3] Setting up Backend..." -ForegroundColor Yellow
Push-Location $BackendDir
npm install

# Check for .env file
if (-not (Test-Path ".env")) {
    Write-Host "Warning: backend/.env not found. Copying .env.example..." -ForegroundColor Magenta
    Copy-Item ".env.example" -Destination ".env"
    Write-Host "Action Required: Please update backend/.env with your Supabase DATABASE_URL and GEMINI_API_KEY." -ForegroundColor Red
}
Pop-Location

# 2. Setup Frontend
Write-Host "`n[2/3] Setting up Frontend..." -ForegroundColor Yellow
Push-Location $FrontendDir
npm install
Pop-Location

# 3. Start Both Services
Write-Host "`n[3/3] Launching Services..." -ForegroundColor Green

Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$BackendDir'; npm run dev`"" -WindowStyle Normal
Start-Process powershell -ArgumentList "-NoExit -Command `"cd '$FrontendDir'; npm run dev`"" -WindowStyle Normal

Write-Host "`nMoveMind AI is starting!" -ForegroundColor Green
Write-Host "Backend will be available at: http://localhost:5000"
Write-Host "Frontend will be available at: http://localhost:3000"

