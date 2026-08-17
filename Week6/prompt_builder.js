const fs = require('fs');
const path = require('path');

function readContextFile(filename, weekDir) {
    const weekContextFile = path.join(weekDir, 'context', filename);
    const sharedContextFile = path.join(__dirname, '..', 'shared_context', filename);

    if (fs.existsSync(weekContextFile)) {
        return fs.readFileSync(weekContextFile, 'utf8');
    } else if (fs.existsSync(sharedContextFile)) {
        return fs.readFileSync(sharedContextFile, 'utf8');
    }
    return '';
}

function getCompiledPrompt(hitoNumber) {
    const weekDir = __dirname;
    const hitosDir = path.join(weekDir, 'hitos_prompted');

    const role = readContextFile('role.md', weekDir);
    const problem = readContextFile('problem_description.md', weekDir);
    const plantuml = readContextFile('plantuml_guide.md', weekDir);

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
DIRECTIVAS Y CONTEXTO COMPARTIDO DEL SISTEMA
=========================================

--- DIRECTIVA DE ROL DEL ARQUITECTO (SHARED ROLE) ---
${role}

--- DESCRIPCIÓN DEL PROBLEMA DEL PROYECTO ---
${problem}

--- GUÍA DE PLANTUML Y REGLAS ANTI-ERRORES (SHARED LINTER) ---
${plantuml}

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
        console.log(`[OK] Prompt solicitado (${hitoNum}) listo en memoria (${prompt.length} caracteres).`);
    } catch (e) {
        console.error(`[ERROR] ${e.message}`);
    }
}

module.exports = { getCompiledPrompt };
