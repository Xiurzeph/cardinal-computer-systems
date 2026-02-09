# setup-babel.ps1
# Automates the transition from in-browser Babel to pre-compiled scripts.

# 1. Verify Node.js and npm are installed
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error "npm is not installed. Please install Node.js from https://nodejs.org/"
    exit
}

Write-Host "--- Initializing Node.js Project ---" -ForegroundColor Cyan
if (!(Test-Path "package.json")) {
    npm init -y
}

Write-Host "--- Installing Babel Dependencies ---" -ForegroundColor Cyan
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react

# 2. Create .babelrc configuration
Write-Host "--- Creating .babelrc ---" -ForegroundColor Cyan
$babelConfig = @'
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
'@
$babelConfig | Set-Content -Path ".babelrc" -Encoding UTF8

# 3. Create a Build Script in package.json
Write-Host "--- Updating package.json scripts ---" -ForegroundColor Cyan
$packageJson = Get-Content "package.json" | ConvertFrom-Json
if (!$packageJson.scripts) { $packageJson.scripts = @{} }
$packageJson.scripts.build = "babel src -d dist"
$packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json" -Encoding UTF8

# 4. Prepare Directory Structure
Write-Host "--- Organizing Project Structure ---" -ForegroundColor Cyan
$srcDirs = @("src", "src/clients", "src/blogs")
foreach ($dir in $srcDirs) {
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir }
}

# Move .js files if they exist in the roots (ignoring critical project files)
# We exclude tailwind.config.js from being moved to src just in case it's in root
Get-ChildItem -Filter *.js -Exclude "setup-babel.ps1", "package.json", "package-lock.json", "tailwind.config.js" | ForEach-Object {
    Move-Item $_.FullName "src/" -Force
}
if (Test-Path "clients/*.js") { Move-Item "clients/*.js" "src/clients/" -Force }
if (Test-Path "blogs/*.js") { Move-Item "blogs/*.js" "src/blogs/" -Force }

# 5. Update HTML files
$htmlPaths = @("index.html", "clients/index.html", "blogs/index.html")

foreach ($path in $htmlPaths) {
    if (Test-Path $path) {
        Write-Host "--- Updating $path ---" -ForegroundColor Yellow
        $content = Get-Content -Raw $path
        
        # Remove Babel Standalone CDN
        $content = $content -replace '<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>', ''
        $content = $content -replace '<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/.*"></script>', ''
        
        # Fix Script Paths: Change relative src="app.js" to src="/dist/app.js" or similar
        # We also remove type="text/babel"
        $content = $content -replace 'type="text/babel"', ''
        
        # If the file is in a subfolder (clients/blogs), we point to root dist
        if ($path -ne "index.html") {
            $content = $content -replace 'src="(?!\/|http)(.*\.js)"', 'src="../dist/$1"'
        } else {
            $content = $content -replace 'src="(?!\/|http)(.*\.js)"', 'src="dist/$1"'
        }

        $content | Set-Content $path -Encoding UTF8
    }
}

Write-Host "`nSetup Complete!" -ForegroundColor Green
Write-Host "1. Run 'npm run build' to compile your code."
Write-Host "2. The Babel browser warning will be gone once you deploy the /dist folder."