const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { getCompiledPrompt } = require('./prompt_builder');

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error('[ERROR] No se encontró la variable de entorno GEMINI_API_KEY.');
    console.error('Por favor establece tu API Key en la consola:');
    console.error('  PowerShell:  $env:GEMINI_API_KEY="TU_API_KEY"');
    process.exit(1);
}

const hitoNumber = process.argv[2] || '1';
const modelName = process.argv[3] || 'gemini-2.5-flash';

const genAI = new GoogleGenerativeAI(apiKey);

async function generate() {
    try {
        console.log(`[INFO] Compilando prompt de Hito ${hitoNumber} (QuickCart Week 6) en memoria...`);
        const compiledPrompt = getCompiledPrompt(hitoNumber);

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

        // Verificar si la generación fue truncada por límite de tokens y continuar automáticamente
        let candidate = response.candidates && response.candidates[0];
        let finishReason = candidate ? candidate.finishReason : null;
        let attempts = 0;

        while ((finishReason === 'MAX_TOKENS' || !fullText.trim().endsWith('```') && !fullText.includes('Checklist')) && attempts < 3) {
            attempts++;
            console.log(`[INFO] La respuesta fue truncada por límite de tokens (finishReason: ${finishReason}). Solicitando continuación (${attempts}/3)...`);
            
            const lastSnippet = fullText.slice(-500);
            const continuationPrompt = `
Has estado generando el informe técnico de arquitectura para QuickCart Hito ${hitoNumber}.
Tu última respuesta se interrumpió en el siguiente fragmento final:

"${lastSnippet}"

CONTINÚA LA GENERACIÓN EXACTAMENTE DESDE EL PUNTO DONDE TE QUEDASTE. NO repitas el título ni el texto ya generado. Completa las secciones faltantes (especialmente Caso B, Explicación de Límites, Anti-Patrones, Tabla Comparativa y Checklist) hasta finalizar completamente el documento.
`;

            const continuationResult = await model.generateContent(continuationPrompt);
            const continuationResponse = await continuationResult.response;
            const continuationText = continuationResponse.text();

            fullText += '\n' + continuationText;
            
            candidate = continuationResponse.candidates && continuationResponse.candidates[0];
            finishReason = candidate ? candidate.finishReason : null;
        }

        const outputsDir = path.join(__dirname, 'outputs');
        if (!fs.existsSync(outputsDir)) {
            fs.mkdirSync(outputsDir, { recursive: true });
        }

        const outputPath = path.join(outputsDir, `output${hitoNumber}.md`);
        fs.writeFileSync(outputPath, fullText, 'utf8');

        console.log(`[ÉXITO] Respuesta generada e inscrita exitosamente en: ${outputPath} (${fullText.length} caracteres).`);
    } catch (error) {
        console.error('[ERROR CRÍTICO]', error);
        process.exit(1);
    }
}

generate();
