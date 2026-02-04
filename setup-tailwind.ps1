<#
.SYNOPSIS
    Tailwind CSS 3.4.x Installer & Builder
    
.DESCRIPTION
    1. Checks for Node.js (Prerequisite).
    2. Initializes NPM and installs Tailwind CSS 3.4.x.
    3. Scaffolds folders (src, dist) and files (index.html, input.css) if they don't exist.
    4. Generates and customizes tailwind.config.js to watch 'index.html'.
    5. Runs the production build (minify).
    
.NOTES
    Run as Administrator is recommended but not strictly required if Node is already installed.
#>

# Stop on first error to prevent cascading failures
$ErrorActionPreference = "Stop"

function Write-Log {
    param([string]$Message, [string]$Color = "Cyan")
    Write-Host "[$((Get-Date).ToString('HH:mm:ss'))] $Message" -ForegroundColor $Color
}

try {
    Write-Log "Starting Tailwind CSS 3.4.x Setup..." "Green"

    # -------------------------------------------------------------------------
    # 1. Prerequisite Check: Node.js
    # -------------------------------------------------------------------------
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        throw "Node.js is not installed. Please install it from https://nodejs.org/ and try again."
    }
    $nodeVer = node -v
    Write-Log "Node.js found: $nodeVer"

    # -------------------------------------------------------------------------
    # 2. File & Folder Scaffolding (Safe Creation)
    # -------------------------------------------------------------------------
    # Define paths
    $projectRoot = Get-Location
    $srcDir      = Join-Path $projectRoot "src"
    $distDir     = Join-Path $projectRoot "dist"
    $inputFile   = Join-Path $srcDir "input.css"
    $indexFile   = Join-Path $projectRoot "index.html"
    $configFile  = Join-Path $projectRoot "tailwind.config.js"

    # Create Directories (only if missing)
    if (-not (Test-Path $srcDir)) {
        New-Item -Path $srcDir -ItemType Directory | Out-Null
        Write-Log "Created 'src' directory."
    }
    if (-not (Test-Path $distDir)) {
        New-Item -Path $distDir -ItemType Directory | Out-Null
        Write-Log "Created 'dist' directory."
    }

    # Create input.css (only if missing)
    if (-not (Test-Path $inputFile)) {
        $cssContent = "@tailwind base;`n@tailwind components;`n@tailwind utilities;"
        Set-Content -Path $inputFile -Value $cssContent
        Write-Log "Created 'src/input.css' with Tailwind directives."
    }

    # Create index.html (only if missing) - Acts as the reference file
    if (-not (Test-Path $indexFile)) {
        $htmlContent = @"
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="./dist/output.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline text-red-600">
    Hello world!
  </h1>
</body>
</html>
"@
        Set-Content -Path $indexFile -Value $htmlContent
        Write-Log "Created 'index.html' template."
    } else {
        Write-Log "Using existing 'index.html'."
    }

    # -------------------------------------------------------------------------
    # 3. NPM Initialization & Installation
    # -------------------------------------------------------------------------
    if (-not (Test-Path "package.json")) {
        Write-Log "Initializing npm..."
        npm init -y | Out-Null
    }

    Write-Log "Installing Tailwind CSS 3.4.x..."
    # We use cmd /c to ensure npm runs correctly in all PS environments
    cmd /c "npm install -D tailwindcss@3.4" 2>&1 | Out-Null
    
    # -------------------------------------------------------------------------
    # 4. Configuration & Customization
    # -------------------------------------------------------------------------
    if (-not (Test-Path $configFile)) {
        Write-Log "Generating tailwind.config.js..."
        cmd /c "npx tailwindcss init" 2>&1 | Out-Null
    }

    # CUSTOMIZATION: Programmatically inject 'index.html' into the content array
    Write-Log "Customizing tailwind.config.js..."
    $configContent = Get-Content $configFile -Raw
    
    # Regex to look for content: [] or content: [ ... ] and replace it
    # We force it to include index.html and src folder
    $newContentPattern = "content: [`"./index.html`", `"./src/**/*.{html,js}`"]"
    
    if ($configContent -match "content:\s*\[.*?\]") {
        $configContent = $configContent -replace "content:\s*\[.*?\]", $newContentPattern
        Set-Content -Path $configFile -Value $configContent
        Write-Log "Updated config to watch 'index.html' and 'src' folder."
    } else {
        Write-Log "Could not auto-update config content array. Please check manually." "Yellow"
    }

    # -------------------------------------------------------------------------
    # 5. Build & Minify
    # -------------------------------------------------------------------------
    Write-Log "Running Tailwind Minify Build..."
    
    # Executing the build command
    $buildCmd = "npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify"
    Invoke-Expression "cmd /c '$buildCmd'"

    Write-Log "------------------------------------------------" "Green"
    Write-Log "SUCCESS: Tailwind environment ready." "Green"
    Write-Log "Output file: ./dist/output.css" "Green"
    Write-Log "------------------------------------------------" "Green"

} catch {
    # -------------------------------------------------------------------------
    # Error Handling
    # -------------------------------------------------------------------------
    Write-Error "An error occurred during setup!"
    Write-Host "Error Details: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "At Line: $($_.InvocationInfo.ScriptLineNumber)" -ForegroundColor Red
    
    # Suggest specific fix if Node is missing or npm fails
    if ($_.Exception.Message -match "npm") {
        Write-Host "Tip: Ensure you have an internet connection and Node.js installed." -ForegroundColor Yellow
    }
}