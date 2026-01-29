Write-Host "=== Cardinal Tailwind Build Script ===" -ForegroundColor Cyan

# Detect script directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Write-Host "Script directory detected as: $ScriptDir" -ForegroundColor Yellow

# Move into script directory
Set-Location $ScriptDir
Write-Host "Changed working directory to script folder." -ForegroundColor Yellow

# Check for package.json
$packageJsonPath = Join-Path $ScriptDir "package.json"
if (-Not (Test-Path $packageJsonPath)) {
    Write-Host "ERROR: package.json not found at $packageJsonPath" -ForegroundColor Red
    exit 1
}

Write-Host "package.json found. Loading..." -ForegroundColor Green

# Load package.json
try {
    $packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json
    Write-Host "package.json loaded successfully." -ForegroundColor Green
}
catch {
    Write-Host "ERROR: Failed to parse package.json" -ForegroundColor Red
    exit 1
}

# Ensure scripts exist
if (-not $packageJson.scripts) {
    Write-Host "No 'scripts' section found. Creating one..." -ForegroundColor Yellow
    $packageJson | Add-Member -MemberType NoteProperty -Name scripts -Value @{}
}

# Ensure build script exists
if (-not $packageJson.scripts.build) {
    Write-Host "Adding missing build script..." -ForegroundColor Yellow
    $packageJson.scripts.build = "npx tailwindcss -i ./src/tailwind.css -o ./dist/output.css --minify"
} else {
    Write-Host "Build script already exists." -ForegroundColor Green
}

# Save updated package.json
try {
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content $packageJsonPath -Encoding UTF8
    Write-Host "package.json updated successfully." -ForegroundColor Green
}
catch {
    Write-Host "ERROR: Failed to write package.json" -ForegroundColor Red
    exit 1
}

# Check for src/tailwind.css
$srcCss = Join-Path $ScriptDir "src\tailwind.css"
if (-Not (Test-Path $srcCss)) {
    Write-Host "ERROR: Missing src/tailwind.css at $srcCss" -ForegroundColor Red
    exit 1
}
Write-Host "Found src/tailwind.css" -ForegroundColor Green

# Check for dist folder
$distFolder = Join-Path $ScriptDir "dist"
if (-Not (Test-Path $distFolder)) {
    Write-Host "dist folder missing. Creating..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $distFolder | Out-Null
}

# Run npm install if node_modules missing
if (-Not (Test-Path (Join-Path $ScriptDir "node_modules"))) {
    Write-Host "node_modules missing. Running npm install..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "node_modules found. Skipping npm install." -ForegroundColor Green
}

# Run Tailwind build
Write-Host "Running Tailwind build..." -ForegroundColor Cyan
npm run build

Write-Host "=== Build Complete ===" -ForegroundColor Cyan
