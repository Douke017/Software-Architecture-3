# Script PowerShell para ejecutar Assignment 7 (Week 7 - Patrones C4, Database-per-Service y DDD)
param (
    [string]$Model = "gemini-2.5-flash"
)

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " Context Engineering Automation - Assignment 7" -ForegroundColor Cyan
Write-Host " Patrones C4, Database-per-Service y Diseno DDD" -ForegroundColor Cyan
Write-Host " Ejecutando con modelo $Model..." -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

if (-not $env:GEMINI_API_KEY) {
    Write-Host "[ERROR] GEMINI_API_KEY no detectada." -ForegroundColor Red
    Write-Host "Por favor establece la clave de API ejecutando:" -ForegroundColor Yellow
    Write-Host '$env:GEMINI_API_KEY="TU_API_KEY"' -ForegroundColor Yellow
    exit 1
}

node "$PSScriptRoot\run_assignment7.js" $Model
