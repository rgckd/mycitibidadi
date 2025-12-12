# Refactoring script to convert pages to use PHP includes
# This script replaces header and footer sections with PHP includes

$pages = @(
    @{
        file = "owners.php"
        page = "owners"
        headerEnd = 97
        footerStart = 430
    },
    @{
        file = "initiatives.php"
        page = "initiatives"
        headerEnd = 97
        footerStart = 454
    },
    @{
        file = "gallery.php"
        page = "gallery"
        headerEnd = 263
        footerStart = 315
    },
    @{
        file = "news.php"
        page = "news"
        headerEnd = 269
        footerStart = 424
    }
)

foreach ($pageInfo in $pages) {
    $file = $pageInfo.file
    $pageName = $pageInfo.page
    $headerEndLine = $pageInfo.headerEnd
    $footerStartLine = $pageInfo.footerStart
    
    Write-Host "Processing $file..." -ForegroundColor Green
    
    # Read the entire file
    $content = Get-Content $file -Raw
    $lines = Get-Content $file
    
    # Extract main content (between header and footer)
    $mainContent = $lines[$headerEndLine..($footerStartLine - 1)] -join "`n"
    
    # Create new file content
    $newContent = @"
<?php
`$current_page = '$pageName';
include 'includes/header.php';
?>

$mainContent

<?php include 'includes/footer.php'; ?>
"@
    
    # Write the new content
    Set-Content -Path $file -Value $newContent -NoNewline
    
    Write-Host "✓ Completed $file" -ForegroundColor Cyan
}

Write-Host "`n✓ All pages refactored successfully!" -ForegroundColor Green
Write-Host "Remember to test each page before committing." -ForegroundColor Yellow
