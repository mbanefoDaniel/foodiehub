$base='http://localhost:8000'
$root='C:\Users\USER\OneDrive\Desktop\FoodieHub'
Write-Output "Scanning HTML pages and linked assets from $base (root $root)"
$htmlFiles = Get-ChildItem -Path $root -Filter *.html | Select-Object -ExpandProperty FullName
$pattern = @'
(?i)(?:src|href)\s*=\s*["']([^"']+)["']
'@
foreach($f in $htmlFiles){
  $name = [IO.Path]::GetFileName($f)
  $url = "$base/$name"
  Write-Output "\n=== PAGE: $name -> $url ==="
  try{
    $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
    Write-Output ("PAGE STATUS: " + $resp.StatusCode)
    $html = $resp.Content
  } catch {
    Write-Output ("PAGE ERROR: " + $_.Exception.Message)
    continue
  }
  $matches = [regex]::Matches($html,$pattern)
  if($matches.Count -eq 0){ Write-Output '  No assets found.' }
  foreach($m in $matches){
    $asset = $m.Groups[1].Value
    if($asset -match '^(https?:)?//'){ 
      # external or protocol-relative
      $checkUrl = $asset
      if($asset -notmatch '^https?://'){ $checkUrl = 'https:' + $asset }
      try{ $r = Invoke-WebRequest -Uri $checkUrl -Method Head -UseBasicParsing -TimeoutSec 10; $s = $r.StatusCode } catch { $s = 'ERR' }
      Write-Output ("  ASSET: $asset -> $s")
    } else {
      # relative asset, map to filesystem
      $rel = $asset.TrimStart('/')
      $fullPath = Join-Path $root $rel
      $exists = Test-Path $fullPath
      Write-Output ("  ASSET: $asset -> local exists: $exists (" + ($fullPath) + ")")
    }
  }
}

Write-Output "\n--- JS Syntax Check ---"
$jsFiles = Get-ChildItem -Path (Join-Path $root 'assets\js') -Filter *.js -File -ErrorAction SilentlyContinue
if($jsFiles){
  foreach($js in $jsFiles){
    Write-Output "Checking $($js.Name)"
    try{
      $out = node --check $js.FullName 2>&1
      if($out){ $out | ForEach-Object { Write-Output "  $_" } } else { Write-Output "  OK" }
    } catch {
      Write-Output "  node check failed: $_"
    }
  }
} else { Write-Output 'No JS files found under assets/js' }
