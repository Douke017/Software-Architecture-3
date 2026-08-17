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

const modelName = process.argv[2] || 'gemini-2.5-flash';

const genAI = new GoogleGenerativeAI(apiKey);

async function generateReport() {
    try {
        console.log(`[INFO] Compilando prompt para el Reporte Consolidado de la Semana 6 (QuickCart) en memoria...`);
        const compiledPrompt = getCompiledPrompt('report');

        console.log(`[INFO] Inicializando Gemini API con el modelo ${modelName}...`);
        const model = genAI.getGenerativeModel({ 
            model: modelName,
            generationConfig: {
                temperature: 0.1,
                maxOutputTokens: 8192
            }
        });

        console.log(`[INFO] Enviando prompt del reporte a Gemini API (${compiledPrompt.length} caracteres)...`);
        let result = await model.generateContent(compiledPrompt);
        let response = await result.response;
        let fullText = response.text();

        // Bucle de continuación si la respuesta es truncada por tokens
        let candidate = response.candidates && response.candidates[0];
        let finishReason = candidate ? candidate.finishReason : null;
        let attempts = 0;

        while ((finishReason === 'MAX_TOKENS' || !fullText.includes('Conclusiones') && !fullText.includes('Deuda Técnica')) && attempts < 3) {
            attempts++;
            console.log(`[INFO] Continuación del reporte iniciada (intento ${attempts}/3)...`);
            
            const lastSnippet = fullText.slice(-500);
            const continuationPrompt = `
Has estado generando el Reporte Consolidado de Arquitectura para QuickCart (Semana 6).
Tu última respuesta finalizó en el siguiente fragmento:

"${lastSnippet}"

CONTINÚA LA GENERACIÓN EXACTAMENTE DESDE EL PUNTO DONDE TE QUEDASTE. Completa las secciones faltantes (Sección 3: Responsabilidad del Arquitecto ante la Deuda Técnica / Technical Debt Governance, y Sección 4: Conclusiones).
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

        const rootReportPath = path.join(__dirname, 'report.md');
        const outputReportPath = path.join(outputsDir, 'report.md');

        fs.writeFileSync(rootReportPath, fullText, 'utf8');
        fs.writeFileSync(outputReportPath, fullText, 'utf8');

        console.log(`[ÉXITO] Reporte consolidado de la Semana 6 inscrito exitosamente en:`);
        console.log(`  - ${rootReportPath}`);
        console.log(`  - ${outputReportPath}`);
    } catch (error) {
        console.error('[ERROR CRÍTICO]', error);
        process.exit(1);
    }
}

generateReport();
