# Script PowerShell para ejecutar Assignment 6 (Week 7 - Validación C4, Elasticidad y Prime Video)
param (
    [string]$Model = "gemini-2.5-flash"
)

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " Context Engineering Automation - Assignment 6" -ForegroundColor Cyan
Write-Host " Validacion C4, Elasticidad y Ensayo Prime Video" -ForegroundColor Cyan
Write-Host " Ejecutando con modelo $Model..." -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

if (-not $env:GEMINI_API_KEY) {
    Write-Host "[ERROR] GEMINI_API_KEY no detectada." -ForegroundColor Red
    Write-Host "Por favor establece la clave de API ejecutando:" -ForegroundColor Yellow
    Write-Host '$env:GEMINI_API_KEY="TU_API_KEY"' -ForegroundColor Yellow
    exit 1
}

node "$PSScriptRoot\run_assignment6.js" $Model
