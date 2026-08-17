const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
if (!apiKey) {
    console.error('\n[ERROR] No se encontró la variable de entorno GEMINI_API_KEY.');
    console.error('Por favor establece tu API Key en la consola:');
    console.error('  PowerShell:  $env:GEMINI_API_KEY="TU_API_KEY"\n');
    process.exit(1);
}

const modelName = process.argv[2] || 'gemini-2.5-flash';
const genAI = new GoogleGenerativeAI(apiKey);

const baseDir = __dirname;
const week6Dir = path.join(baseDir, '..');
const sharedDir = path.join(week6Dir, '..', 'shared_context');

function getCompiledPrompt() {
    // 1. Rol temático de la semana
    const roleFile = path.join(week6Dir, 'context', 'role.md');
    const roleText = fs.existsSync(roleFile) ? fs.readFileSync(roleFile, 'utf8') : '';

    // 2. Skills técnicas compartidas
    const c4File = path.join(sharedDir, 'structurizr_c4_guide.md');
    const plantumlFile = path.join(sharedDir, 'plantuml_guide.md');
    const markdownFile = path.join(sharedDir, 'markdown_guide.md');

    const c4Text = fs.readFileSync(c4File, 'utf8');
    const plantumlText = fs.readFileSync(plantumlFile, 'utf8');
    const markdownText = fs.readFileSync(markdownFile, 'utf8');

    // 3. Problema y objetivos del Assignment 5
    const problemFile = path.join(baseDir, 'problem_description.md');
    const objectivesFile = path.join(baseDir, 'specifics_objectives.md');
    const promptFile = path.join(baseDir, 'prompt_assignment5.md');

    const problemText = fs.readFileSync(problemFile, 'utf8');
    const objectivesText = fs.readFileSync(objectivesFile, 'utf8');
    const promptText = fs.readFileSync(promptFile, 'utf8');

    return `
=========================================
DIRECTIVA DE ROL DE LA SEMANA (WEEK ROLE)
=========================================
${roleText}

=========================================
SKILLS Y ESTÁNDARES TÉCNICOS GLOBALES (SHARED SKILLS)
=========================================

--- GUÍA MAESTRA DE STRUCTURIZR & MODELO C4 (C4-PLANTUML STANDARD) ---
${c4Text}

--- GUÍA DE PLANTUML & LINTER ANTI-ERRORES ---
${plantumlText}

--- ESTÁNDAR DE FORMATO MARKDOWN ---
${markdownText}

=========================================
ASSIGNMENT 5: DOMINIO DE PEDIDOS GUIADO POR EVENTOS
=========================================
${problemText}

${objectivesText}

=========================================
TAREAS ESPECÍFICAS DE GENERACIÓN
=========================================
${promptText}
`;
}

async function generate() {
    try {
        console.log(`[INFO] Compilando prompt de Assignment 5 (Modelo C4 MSA & EDA) en memoria...`);
        const compiledPrompt = getCompiledPrompt();

        console.log(`[INFO] Inicializando Gemini API con el modelo ${modelName}...`);
        const model = genAI.getGenerativeModel({ 
            model: modelName,
            generationConfig: {
                temperature: 0.1,
                maxOutputTokens: 8192
            }
        });

        console.log(`[INFO] Enviando prompt a Gemini API (${compiledPrompt.length} caracteres)...`);
        let result = await model.generateContent(compiledPrompt);
        let response = await result.response;
        let fullText = response.text();

        // Bucle de continuación si la respuesta es truncada por tokens
        let candidate = response.candidates && response.candidates[0];
        let finishReason = candidate ? candidate.finishReason : null;
        let attempts = 0;

        while ((finishReason === 'MAX_TOKENS' || !fullText.includes('Checklist') && !fullText.includes('Resiliencia')) && attempts < 3) {
            attempts++;
            console.log(`[INFO] La respuesta fue truncada por límite de tokens. Solicitando continuación (${attempts}/3)...`);
            
            const lastSnippet = fullText.slice(-500);
            const continuationPrompt = `
Has estado generando la solución arquitectónica para Assignment 5 (Modelo C4 MSA & EDA).
Tu última respuesta finalizó en el siguiente fragmento:

"${lastSnippet}"

CONTINÚA LA GENERACIÓN EXACTAMENTE DESDE EL PUNTO DONDE TE QUEDASTE. Completa las secciones faltantes (Diagrama de Secuencia, Matriz de Eventos, Análisis de Resiliencia/Outbox Pattern y Checklist) hasta finalizar completamente el documento.
`;

            const continuationResult = await model.generateContent(continuationPrompt);
            const continuationResponse = await continuationResult.response;
            const continuationText = continuationResponse.text();

            fullText += '\n' + continuationText;
            
            candidate = continuationResponse.candidates && continuationResponse.candidates[0];
            finishReason = candidate ? candidate.finishReason : null;
        }

        const outputFile = path.join(baseDir, 'assignment5_output.md');
        fs.writeFileSync(outputFile, fullText, 'utf8');

        console.log(`[ÉXITO] Assignment 5 generado e inscrito exitosamente en: ${outputFile} (${fullText.length} caracteres).`);
    } catch (error) {
        console.error('[ERROR CRÍTICO]', error);
        process.exit(1);
    }
}

generate();
