<#
 .SYNOPSIS
    Script de Automatización para Assignment 2 (Ecosistema de Restaurante - McDonald's).
 .DESCRIPTION
    Ejecuta la compilación de Context Engineering y llama a Gemini API.
 .EXAMPLE
    .\Week3\run_assignment2.ps1
#>

param (
    [Parameter(Mandatory=$false)]
    [string]$Model = "gemini-2.5-flash"
)

$ErrorActionPreference = "Stop"
$ScriptDir = $PSScriptRoot

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " Context Engineering Automation - Assignment 2" -ForegroundColor Cyan
Write-Host " (Caso de Estudio: Ecosistema McDonald's)" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

if ($env:GEMINI_API_KEY -or $env:GOOGLE_API_KEY) {
    Write-Host "[INFO] GEMINI_API_KEY detectada. Ejecutando mediante Gemini API..." -ForegroundColor Yellow
    node "$ScriptDir\Assignment2\run_assignment2.js" $Model
} else {
    Write-Host "`n[REQUERIDO API KEY]" -ForegroundColor Yellow
    Write-Host "Por favor establece tu API key en PowerShell:" -ForegroundColor Gray
    Write-Host "  `$env:GEMINI_API_KEY=`"tu_api_key`"" -ForegroundColor White
    Write-Host "Y ejecuta: .\Week3\run_assignment2.ps1" -ForegroundColor White
}
