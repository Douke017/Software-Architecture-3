# Script PowerShell en la raíz de Week7 para ejecutar Assignment 6
param (
    [string]$Model = "gemini-2.5-flash"
)

& "$PSScriptRoot\Assignment6\run_assignment6.ps1" -Model $Model
