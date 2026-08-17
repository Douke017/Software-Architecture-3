const fs = require('fs');
const path = require('path');

function getCompiledPrompt(hitoNumber) {
    const weekDir = __dirname;
    const hitosDir = path.join(weekDir, 'hitos_prompted');
    const sharedDir = path.join(weekDir, '..', 'shared_context');

    // 1. Contexto Específico de la Semana (Rol temático y Problema de negocio)
    const rolePath = path.join(weekDir, 'context', 'role.md');
    const role = fs.existsSync(rolePath) ? fs.readFileSync(rolePath, 'utf8') : '';

    const problemPath = path.join(weekDir, 'context', 'problem_description.md');
    const problem = fs.existsSync(problemPath) ? fs.readFileSync(problemPath, 'utf8') : '';

    // 2. Skills Técnicas Globales Reutilizables (C4 Structurizr, PlantUML Linter, Markdown Standard)
    const c4Guide = fs.readFileSync(path.join(sharedDir, 'structurizr_c4_guide.md'), 'utf8');
    const plantuml = fs.readFileSync(path.join(sharedDir, 'plantuml_guide.md'), 'utf8');
    const markdown = fs.readFileSync(path.join(sharedDir, 'markdown_guide.md'), 'utf8');

    let promptPath;
    if (hitoNumber === 'report') {
        promptPath = path.join(hitosDir, 'report_prompt.md');
    } else {
        promptPath = path.join(hitosDir, `prompt${hitoNumber}.md`);
    }

    if (!fs.existsSync(promptPath)) {
        throw new Error(`El prompt solicitado no existe en ${promptPath}`);
    }
    const hitoPrompt = fs.readFileSync(promptPath, 'utf8');

    return `
=========================================
DIRECTIVA DE ROL DE LA SEMANA (WEEK ROLE)
=========================================
${role}

=========================================
DESCRIPCIÓN DEL PROBLEMA DEL PROYECTO
=========================================
${problem}

=========================================
SKILLS Y ESTÁNDARES TÉCNICOS GLOBALES (SHARED SKILLS)
=========================================

--- GUÍA MAESTRA DE STRUCTURIZR & MODELO C4 (C4-PLANTUML STANDARD) ---
${c4Guide}

--- GUÍA DE PLANTUML & LINTER ANTI-ERRORES ---
${plantuml}

--- ESTÁNDAR DE FORMATO MARKDOWN ---
${markdown}

=========================================
TAREAS ESPECÍFICAS DE GENERACIÓN
=========================================
${hitoPrompt}
`;
}

if (require.main === module) {
    const hitoNum = process.argv[2] || 1;
    try {
        const prompt = getCompiledPrompt(hitoNum);
        console.log(`[OK] Prompt compilado para Hito/Reporte (${hitoNum}): ${prompt.length} caracteres.`);
    } catch (e) {
        console.error(`[ERROR] ${e.message}`);
    }
}

module.exports = { getCompiledPrompt };
