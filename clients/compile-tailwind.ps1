# Load package.json
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json

# Ensure scripts exists
if (-not $packageJson.scripts) {
    # Create a new hashtable
    $scripts = @{}
} else {
    # Convert PSCustomObject → Hashtable
    $scripts = @{}
    $packageJson.scripts.PSObject.Properties | ForEach-Object {
        $scripts[$_.Name] = $_.Value
    }
}

# Add or overwrite build + watch
$scripts["build"] = "tailwindcss -i ./src/tailwind.css -o ./dist/output.css --minify"
$scripts["watch"] = "tailwindcss -i ./src/tailwind.css -o ./dist/output.css --watch"

# Assign back to packageJson
$packageJson | Add-Member -MemberType NoteProperty -Name scripts -Value $scripts -Force

# Save JSON
$packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
