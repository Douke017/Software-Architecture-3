# Script PowerShell para ejecutar los Hitos de la Semana 7 (ShopStream)
param (
    [Parameter(Mandatory=$false)]
    [string]$Hito = "1",

    [Parameter(Mandatory=$false)]
    [string]$Model = "gemini-2.5-flash"
)

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " Context Engineering Automation - Week 7 (ShopStream)" -ForegroundColor Cyan
Write-Host " Ejecutando Hito $Hito con modelo $Model..." -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

if (-not $env:GEMINI_API_KEY) {
    Write-Host "[ERROR] GEMINI_API_KEY no detectada." -ForegroundColor Red
    Write-Host "Por favor establece la clave de API ejecutando:" -ForegroundColor Yellow
    Write-Host '$env:GEMINI_API_KEY="TU_API_KEY"' -ForegroundColor Yellow
    exit 1
}

node "$PSScriptRoot\run_with_api.js" $Hito $Model
