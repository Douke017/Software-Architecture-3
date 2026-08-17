# Script PowerShell para ejecutar Assignment 5 (Week 6 - Modelo C4 MSA & EDA)
param (
    [string]$Model = "gemini-2.5-flash"
)

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " Context Engineering Automation - Assignment 5" -ForegroundColor Cyan
Write-Host " Modelo C4 Orientado a Microservicios & EDA" -ForegroundColor Cyan
Write-Host " Ejecutando con modelo $Model..." -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

if (-not $env:GEMINI_API_KEY) {
    Write-Host "[ERROR] GEMINI_API_KEY no detectada." -ForegroundColor Red
    Write-Host "Por favor establece la clave de API ejecutando:" -ForegroundColor Yellow
    Write-Host '$env:GEMINI_API_KEY="TU_API_KEY"' -ForegroundColor Yellow
    exit 1
}

node "$PSScriptRoot\run_assignment5.js" $Model
