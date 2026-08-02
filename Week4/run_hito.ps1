<#
 .SYNOPSIS
    Script de Automatización para Context Engineering con Gemini (Semana 4).
 .DESCRIPTION
    Soporta la estructura automatizada de Week4:
      - hitos/ (Especificaciones brutas creadas por el usuario, ej. hito1.md, hito2.md...)
      - hitos_prompted/ (Prompts guiados de arquitectura auto-generados o refinados)
      - outputs/ (Entregables finales output1.md, output2.md...)
 .EXAMPLE
    .\run_hito.ps1 -Hito 1
#>

param (
    [Parameter(Mandatory=$false)]
    [string]$Hito = "1",
    
    [Parameter(Mandatory=$false)]
    [string]$Model = "gemini-2.5-flash"
)

$ErrorActionPreference = "Stop"
$ScriptDir = $PSScriptRoot

$RawHitoPath = Join-Path $ScriptDir "hitos\hito$Hito.md"
$PromptedHitoPath = Join-Path $ScriptDir "hitos_prompted\hito$Hito`_prompt.md"

if (-not (Test-Path $PromptedHitoPath) -and -not (Test-Path $RawHitoPath)) {
    Write-Host "[ERROR] No se encuentra la especificación del hito $Hito en hitos\hito$Hito.md" -ForegroundColor Red
    exit 1
}

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host " Context Engineering Automation - Week 4 (Hito $Hito)" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

if ($env:GEMINI_API_KEY -or $env:GOOGLE_API_KEY) {
    Write-Host "[INFO] GEMINI_API_KEY detectada. Ejecutando mediante Gemini API..." -ForegroundColor Yellow
    node "$ScriptDir\run_with_api.js" $Hito $Model
} else {
    Write-Host "`n[REQUERIDO API KEY]" -ForegroundColor Yellow
    Write-Host "Por favor establece tu API key en PowerShell:" -ForegroundColor Gray
    Write-Host "  `$env:GEMINI_API_KEY=`"tu_api_key`"" -ForegroundColor White
    Write-Host "Y ejecuta: .\run_hito.ps1 -Hito $Hito" -ForegroundColor White
}
