# setup-babel.ps1
# Joseph, this script manages your Babel environment and prevents path duplication errors.
# Mirroring: src/clients -> dist/clients and src/blogs -> dist/blogs

# 1. Verify Node.js and npm are installed
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Error "npm is not installed. Please install Node.js from https://nodejs.org/"
    exit
}

Write-Host "--- Initializing Node.js Project ---" -ForegroundColor Cyan
if (!(Test-Path "package.json")) {
    npm init -y
}

# 2. Only install npm dependencies if node_modules is missing
if (!(Test-Path "node_modules")) {
    Write-Host "--- node_modules missing. Installing Babel dependencies ---" -ForegroundColor Cyan
    npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react
} else {
    Write-Host "--- Dependencies found. Skipping npm install. ---" -ForegroundColor Gray
}

# 3. Create .babelrc configuration
$babelConfig = @'
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
'@
$babelConfig | Set-Content -Path ".babelrc" -Encoding UTF8

# 4. Create Build Script in package.json
# Using -d (out-dir) mirrors the src structure into dist
$packageJson = Get-Content "package.json" | ConvertFrom-Json
if (!$packageJson.scripts) { $packageJson.scripts = @{} }
$packageJson.scripts.build = "babel src -d dist"
$packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json" -Encoding UTF8

# 5. Folder Organization & Migration
Write-Host "--- Organizing Project Structure ---" -ForegroundColor Cyan
$srcDirs = @("src", "src/clients", "src/blogs")
foreach ($dir in $srcDirs) {
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir }
}

# Move existing JS files to src to prevent them from being served directly
Get-ChildItem -Path "." -Filter *.js -Exclude "setup-babel.ps1", "package.json", "package-lock.json", "tailwind.config.js" | ForEach-Object {
    Move-Item $_.FullName "src/" -Force
}
if (Test-Path "clients/*.js") { 
    Get-ChildItem -Path "clients" -Filter *.js | ForEach-Object { Move-Item $_.FullName "src/clients/" -Force }
}
if (Test-Path "blogs/*.js") { 
    Get-ChildItem -Path "blogs" -Filter *.js | ForEach-Object { Move-Item $_.FullName "src/blogs/" -Force }
}

# 6. Update HTML Files, Extract Babel Scripts & Fix Paths
$htmlPaths = @("index.html", "clients/index.html", "blogs/index.html")

foreach ($path in $htmlPaths) {
    if (Test-Path $path) {
        Write-Host "--- Scanning $path ---" -ForegroundColor Yellow
        $content = Get-Content -Raw $path
        
        # A. EXTRACT INLINE BABEL SCRIPTS
        if ($content -match '(?s)<script type="text/babel">(.*?)</script>') {
            $inlineJs = $Matches[1].Trim()
            
            # Determine target filename based on directory
            $isSub = $path -match "clients|blogs"
            $subName = if ($path -match "clients") { "clients" } else { "blogs" }
            $fileName = if ($isSub) { "$subName/main.js" } else { "main.js" }
            
            # Save the extracted code to the src folder
            $inlineJs | Set-Content "src/$fileName" -Encoding UTF8
            Write-Host "  > Extracted Babel logic to src/$fileName" -ForegroundColor Green
            
            # Replace the block with a production link
            $distPath = if ($path -eq "index.html") { "dist/$fileName" } else { "../dist/$fileName" }
            $content = $content -replace '(?s)<script type="text/babel">.*?</script>', "<script src=""$distPath""></script>"
        }

        # B. REMOVE BABEL CDN
        $content = $content -replace '<script src="https://unpkg\.com/@babel/standalone/babel\.min\.js"></script>', ''
        $content = $content -replace '<script src="https://cdnjs\.cloudflare\.com/ajax/libs/babel-standalone/.*"></script>', ''

        # C. FIX PATHS FOR EXTERNAL SCRIPTS
        # Regex ensures we don't double-prefix or touch absolute paths
        $regex = 'src="(?!(?:dist\/|\.\.\/dist\/|http|\/))([^"]+\.js)"'
        
        if ($path -match "clients") {
            $content = $content -replace $regex, 'src="../dist/clients/$1"'
        } elseif ($path -match "blogs") {
            $content = $content -replace $regex, 'src="../dist/blogs/$1"'
        } else {
            $content = $content -replace $regex, 'src="dist/$1"'
        }

        # D. CLEANUP
        $content = $content -replace 'type="text/babel"', ''
        $content = $content -replace '/dist//', '/dist/'
        $content = $content -replace 'dist/dist/', 'dist/'

        $content | Set-Content $path -Encoding UTF8
    }
}

# 7. Comprehensive Build Verification Check
Write-Host "`n--- Build Verification Check ---" -ForegroundColor Cyan
Write-Host "Running compilation..."
npm run build

$checkFiles = @("dist/main.js", "dist/clients/main.js", "dist/blogs/main.js")
foreach ($file in $checkFiles) {
    if (Test-Path $file) {
        $stats = Get-Item $file
        Write-Host "SUCCESS: $file created at $($stats.LastWriteTime)." -ForegroundColor Green
    } else {
        $srcFile = $file -replace "dist/", "src/"
        if (Test-Path $srcFile) {
            Write-Warning "ERROR: $file missing. Check $srcFile for syntax errors."
        }
    }
}

Write-Host "`nReady for GitHub Pages deployment!" -ForegroundColor Green