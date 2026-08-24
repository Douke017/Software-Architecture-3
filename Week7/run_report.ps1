# Script PowerShell para ejecutar el Reporte Consolidado de la Semana 7 (ShopStream)
param (
    [string]$Model = "gemini-2.5-flash"
)

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " Context Engineering Automation - Week 7 Report" -ForegroundColor Cyan
Write-Host " Generando report.md con modelo $Model..." -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

if (-not $env:GEMINI_API_KEY) {
    Write-Host "[ERROR] GEMINI_API_KEY no detectada." -ForegroundColor Red
    Write-Host "Por favor establece la clave de API ejecutando:" -ForegroundColor Yellow
    Write-Host '$env:GEMINI_API_KEY="TU_API_KEY"' -ForegroundColor Yellow
    exit 1
}

node "$PSScriptRoot\run_report.js" $Model
