<#
 .SYNOPSIS
    Script de Automatización para generar el Informe Final report.md (Semana 4).
 .DESCRIPTION
    Sintetiza las decisiones de diseño y la representación visual de la arquitectura objetivo en un documento de máximo 2 páginas.
 .EXAMPLE
    .\run_report.ps1
#>

param (
    [Parameter(Mandatory=$false)]
    [string]$Model = "gemini-2.5-flash"
)

$ErrorActionPreference = "Stop"
$ScriptDir = $PSScriptRoot

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " Context Engineering Automation - Week 4 Final Report" -ForegroundColor Cyan
Write-Host " (Generación del informe sintético report.md)" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

if ($env:GEMINI_API_KEY -or $env:GOOGLE_API_KEY) {
    Write-Host "[INFO] GEMINI_API_KEY detectada. Ejecutando mediante Gemini API..." -ForegroundColor Yellow
    node "$ScriptDir\run_report.js" $Model
} else {
    Write-Host "`n[REQUERIDO API KEY]" -ForegroundColor Yellow
    Write-Host "Por favor establece tu API key en PowerShell:" -ForegroundColor Gray
    Write-Host "  `$env:GEMINI_API_KEY=`"tu_api_key`"" -ForegroundColor White
    Write-Host "Y ejecuta: .\run_report.ps1" -ForegroundColor White
}
