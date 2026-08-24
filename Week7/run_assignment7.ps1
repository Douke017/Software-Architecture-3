# Script PowerShell en la raíz de Week7 para ejecutar Assignment 7
param (
    [string]$Model = "gemini-2.5-flash"
)

& "$PSScriptRoot\Assignment7\run_assignment7.ps1" -Model $Model
