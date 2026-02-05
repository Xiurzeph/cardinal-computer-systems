# Git Manager Script
# Set the base URL for your GitHub account
$baseGitHubUrl = "https://github.com/Xiurzeph/"

function Show-Menu {
    Clear-Host
    Write-Host "--- Git Management Tool ---" -ForegroundColor Cyan
    Write-Host "1. Download (Clone) a Repository"
    Write-Host "2. Sync (Pull) a Branch"
    Write-Host "3. Push to a Branch"
    Write-Host "Q. Quit"
    Write-Host "---------------------------"
}

do {
    Show-Menu
    $choice = Read-Host "Select an option"

    switch ($choice) {
        "1" {
            $repoName = Read-Host "Enter the repository name (e.g., cardinal-computer-systems)"
            $fullUrl = "$baseGitHubUrl$repoName"
            Write-Host "Cloning from $fullUrl..." -ForegroundColor Yellow
            git clone $fullUrl
            Pause
        }
        "2" {
            $branch = Read-Host "Enter the branch name to sync (e.g., main)"
            Write-Host "Syncing (pulling) $branch..." -ForegroundColor Yellow
            git pull origin $branch
            Pause
        }
        "3" {
            $branch = Read-Host "Enter the branch name to push to"
            $commitMsg = Read-Host "Enter commit message"
            
            Write-Host "Adding changes..." -ForegroundColor Yellow
            git add .
            git commit -m "$commitMsg"
            Write-Host "Pushing to $branch..." -ForegroundColor Yellow
            git push origin $branch
            Pause
        }
    }
} while ($choice -ne "q")