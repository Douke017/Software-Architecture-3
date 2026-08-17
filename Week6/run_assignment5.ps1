# Script PowerShell en la raíz de Week6 para ejecutar Assignment 5
param (
    [string]$Model = "gemini-2.5-flash"
)

& "$PSScriptRoot\Assignment5\run_assignment5.ps1" -Model $Model
