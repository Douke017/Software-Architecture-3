/**
 * Runner oficial usando la API de Gemini (Google AI Studio / Gemini API) - Week 4
 * Procesa la compilación del prompt 100% en memoria y guarda la respuesta directa.
 * 
 * Uso:
 *   $env:GEMINI_API_KEY="tu_api_key_aqui"
 *   node Week4/run_with_api.js 1 [modelo]
 */

const fs = require('fs');
const path = require('path');
const { getCompiledPrompt } = require('./prompt_builder');

const hitoNum = process.argv[2] || '1';
const modelName = process.argv[3] || 'gemini-2.5-flash';

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

const baseDir = __dirname;
const outputsDir = path.join(baseDir, 'outputs');
const outputFile = path.join(outputsDir, `output${hitoNum}.md`);

if (!apiKey) {
  console.error(`\n[ERROR] No se encontró la variable de entorno GEMINI_API_KEY.`);
  console.error(`Por favor establece tu API Key en la consola:`);
  console.error(`  PowerShell:  $env:GEMINI_API_KEY="TU_API_KEY"\n`);
  process.exit(1);
}

let promptText;
try {
  promptText = getCompiledPrompt(hitoNum);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}

async function generate() {
  console.log(`[INFO] Enviando prompt del Hito ${hitoNum} de la Semana 4 a Gemini API (Modelo: ${modelName})...`);
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          { text: promptText }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.2,
      topP: 0.95,
      maxOutputTokens: 16384
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resultText) {
      throw new Error('La respuesta de Gemini API no contiene texto válido.');
    }

    if (!fs.existsSync(outputsDir)) {
      fs.mkdirSync(outputsDir, { recursive: true });
    }

    fs.writeFileSync(outputFile, resultText, 'utf8');
    console.log(`[ÉXITO] Respuesta guardada correctamente en: ${outputFile}\n`);

  } catch (err) {
    console.error(`[ERROR API] ${err.message}`);
    process.exit(1);
  }
}

generate();
