$root = Join-Path $PSScriptRoot '..\'
Set-Location $root
$imagesDir = Join-Path $root 'assets\images'
$queries = @(
  'Margherita Pizza','Pepperoni Pizza','BBQ Chicken Pizza','Classic Burger','Cheeseburger','Vegan Burger','Salmon Sushi','Tuna Roll','Veggie Roll','Caesar Salad','Greek Salad','Chicken Salad','Chocolate Cake','Cheesecake','Ice Cream','Truffle Pizza','Spicy Burger','Dragon Roll','Pesto Pizza','Fruit Tart'
)
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

for($i=0;$i -lt $queries.Count;$i++){
  $n = $i + 1
  $q = $queries[$i]
  $encoded = [uri]::EscapeDataString($q)
  $url = "https://source.unsplash.com/1200x800/?$encoded,food"
  $out = Join-Path $imagesDir "img$($n).jpg"
  if(Test-Path $out){
    Copy-Item $out "$out.bak" -Force
    Write-Output "Backed up existing $out -> $out.bak"
  }
  Write-Output ("Downloading #{0}: {1} -> {2}" -f $n, $q, $out)
  Download-WithRetries $url $out
}

Write-Output "\nFinal sizes:"
Get-ChildItem -Path $imagesDir -Filter 'img*.jpg' -File | Sort-Object Name | Select-Object Name, Length | Format-Table -AutoSize
