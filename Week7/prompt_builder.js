const fs = require('fs');
const path = require('path');

function getCompiledPrompt(hitoNumber) {
    const weekDir = __dirname;
    const hitosDir = path.join(weekDir, 'hitos_prompted');
    const outputsDir = path.join(weekDir, 'outputs');
    const sharedDir = path.join(weekDir, '..', 'shared_context');

    const role = fs.readFileSync(path.join(sharedDir, 'role.md'), 'utf8');
    const architecture = fs.readFileSync(path.join(sharedDir, 'architecture_framework.md'), 'utf8');
    const twelveFactor = fs.readFileSync(path.join(sharedDir, 'twelve_factor_app_guide.md'), 'utf8');
    const c4Guide = fs.readFileSync(path.join(sharedDir, 'structurizr_c4_guide.md'), 'utf8');
    const plantuml = fs.readFileSync(path.join(sharedDir, 'plantuml_guide.md'), 'utf8');
    const markdown = fs.readFileSync(path.join(sharedDir, 'markdown_guide.md'), 'utf8');

    const problemPath = path.join(weekDir, 'context', 'problem_description.md');
    const problem = fs.existsSync(problemPath) ? fs.readFileSync(problemPath, 'utf8') : '';

    // Cargar automáticamente entregables de hitos anteriores para mantener coherencia acumulativa
    let previousOutputsText = '';
    const currentHitoNum = parseInt(hitoNumber, 10);
    if (!isNaN(currentHitoNum) && currentHitoNum > 1) {
        previousOutputsText += '\n=========================================\nCONTEXTO ACUMULADO DE HITOS ANTERIORES\n=========================================\n';
        for (let i = 1; i < currentHitoNum; i++) {
            const prevPath = path.join(outputsDir, `output${i}.md`);
            if (fs.existsSync(prevPath)) {
                previousOutputsText += `\n--- ENTREGABLE APROBADO HITO ${i} (output${i}.md) ---\n${fs.readFileSync(prevPath, 'utf8')}\n`;
            }
        }
    }

    let promptPath;
    if (hitoNumber === 'report') {
        promptPath = path.join(hitosDir, 'report_prompt.md');
        // Para el reporte consolidado, cargar todos los outputs
        previousOutputsText += '\n=========================================\nENTREGABLES ACUMULADOS DE TODOS LOS HITOS (SEMANA 7)\n=========================================\n';
        for (let i = 1; i <= 4; i++) {
            const p = path.join(outputsDir, `output${i}.md`);
            if (fs.existsSync(p)) {
                previousOutputsText += `\n--- OUTPUT HITO ${i} ---\n${fs.readFileSync(p, 'utf8')}\n`;
            }
        }
    } else {
        promptPath = path.join(hitosDir, `prompt${hitoNumber}.md`);
    }

    if (!fs.existsSync(promptPath)) {
        throw new Error(`El prompt solicitado no existe en ${promptPath}`);
    }
    const hitoPrompt = fs.readFileSync(promptPath, 'utf8');

    return `
=========================================
DIRECTIVAS Y CONTEXTO COMPARTIDO DEL SISTEMA (MASTER SHARED SKILLS)
=========================================

--- DIRECTIVA DE ROL DEL ARQUITECTO (MASTER ROLE) ---
${role}

--- MARCO MAESTRO DE ARQUITECTURA DE MICROSERVICIOS & EDA ---
${architecture}

--- GUÍA MAESTRA: THE TWELVE-FACTOR APP PARA MICROSERVICIOS (12-FACTOR.NET) ---
${twelveFactor}

--- GUÍA MAESTRA DE STRUCTURIZR & MODELO C4 (C4-PLANTUML STANDARD) ---
${c4Guide}

--- GUÍA DE PLANTUML & LINTER ANTI-ERRORES ---
${plantuml}

--- ESTÁNDAR DE FORMATO MARKDOWN ---
${markdown}

=========================================
CONTEXTO ESPECÍFICO DEL DOMINIO SHOPSTREAM (WEEK 7)
=========================================
${problem}
${previousOutputsText}

=========================================
PAUTAS METODOLÓGICAS Y OBJETIVOS DE ANÁLISIS (HITO ${hitoNumber})
=========================================
${hitoPrompt}
`;
}

if (require.main === module) {
    const hitoNum = process.argv[2] || 1;
    try {
        const prompt = getCompiledPrompt(hitoNum);
        console.log(`[OK] Prompt compilado con Shared Skills y Contexto Acumulado (${hitoNum}): ${prompt.length} caracteres.`);
    } catch (e) {
        console.error(`[ERROR] ${e.message}`);
    }
}

module.exports = { getCompiledPrompt };
