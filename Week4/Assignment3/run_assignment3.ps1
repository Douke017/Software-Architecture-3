<#
 .SYNOPSIS
    Script de Automatización para Assignment 3 (Modelo C4 para PedidosYa EDA).
 .DESCRIPTION
    Ejecuta la compilación de Context Engineering y llama a Gemini API desde Assignment3.
 .EXAMPLE
    .\run_assignment3.ps1
#>

param (
    [Parameter(Mandatory=$false)]
    [string]$Model = "gemini-2.5-flash"
)

$ErrorActionPreference = "Stop"
$ScriptDir = $PSScriptRoot

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " Context Engineering Automation - Assignment 3" -ForegroundColor Cyan
Write-Host " (Modelo C4 & Structurizr - PedidosYa EDA)" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

if ($env:GEMINI_API_KEY -or $env:GOOGLE_API_KEY) {
    Write-Host "[INFO] GEMINI_API_KEY detectada. Ejecutando mediante Gemini API..." -ForegroundColor Yellow
    node "$ScriptDir\run_assignment3.js" $Model
} else {
    Write-Host "`n[REQUERIDO API KEY]" -ForegroundColor Yellow
    Write-Host "Por favor establece tu API key en PowerShell:" -ForegroundColor Gray
    Write-Host "  `$env:GEMINI_API_KEY=`"tu_api_key`"" -ForegroundColor White
    Write-Host "Y ejecuta: .\run_assignment3.ps1" -ForegroundColor White
}
