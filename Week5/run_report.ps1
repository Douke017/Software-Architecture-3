<#
 .SYNOPSIS
    Script de Automatización para generar el Documento de Diseño ASM de BookSphere (report.md - Semana 5).
 .DESCRIPTION
    Sintetiza Parte 1 (brevemente) y Parte 2 (en detalle) con tablas de servicios y datos y diagramación PlantUML.
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
Write-Host " Context Engineering Automation - Week 5 ASM Report" -ForegroundColor Cyan
Write-Host " (Documento de Diseño ASM de BookSphere)" -ForegroundColor Cyan
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
