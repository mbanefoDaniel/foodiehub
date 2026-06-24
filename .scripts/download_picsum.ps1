$root = Join-Path $PSScriptRoot '..\'
Set-Location $root
$imagesDir = Join-Path $root 'assets\images'
if(-not (Test-Path $imagesDir)){
  New-Item -ItemType Directory -Path $imagesDir | Out-Null
}

function Download-WithRetries($url, $outPath){
  $max=3; $i=0
  while($i -lt $max){
    try{
      Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing -TimeoutSec 30
      Write-Output "OK: $outPath"
      return $true
    } catch {
      Write-Output "WARN: attempt $($i+1) failed for $url -> $($_.Exception.Message)"
      Start-Sleep -Seconds (2 * ($i+1))
      $i++
    }
  }
  Write-Output "ERROR: failed to download $url after $max attempts"
  return $false
}

for($n=1;$n -le 20;$n++){
  $out = Join-Path $imagesDir "img$($n).jpg"
  if(Test-Path $out){ Copy-Item $out "$out.bak" -Force; Write-Output "Backed up existing $out -> $out.bak" }
  $url = "https://picsum.photos/1200/800?random=$n"
  Write-Output ("Downloading #{0} -> {1}" -f $n, $out)
  Download-WithRetries $url $out
}

Write-Output "\nFinal sizes:"
Get-ChildItem -Path $imagesDir -Filter 'img*.jpg' -File | Sort-Object Name | Select-Object Name, Length | Format-Table -AutoSize
