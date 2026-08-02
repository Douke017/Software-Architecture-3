/**
 * Runner oficial para Assignment 2 usando Gemini API
 * Compila el contexto de Assignment 2 en memoria e incluye el marco de microservicios.
 * 
 * Uso:
 *   $env:GEMINI_API_KEY="tu_api_key"
 *   node Week3/Assignment2/run_assignment2.js [modelo]
 */

const fs = require('fs');
const path = require('path');

const modelName = process.argv[2] || 'gemini-2.5-flash';
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

const baseDir = __dirname;
const week3Dir = path.join(baseDir, '..');

const roleFile = path.join(week3Dir, 'context', 'role.md');
const frameworkFile = path.join(week3Dir, 'context', 'architecture_framework.md');
const markdownGuideFile = path.join(week3Dir, 'context', 'markdown_guide.md');
const plantumlGuideFile = path.join(week3Dir, 'context', 'plantuml_guide.md');

const problemFile = path.join(baseDir, 'problem_description.md');
const objectivesFile = path.join(baseDir, 'specifics_objectives.md');
const promptFile = path.join(baseDir, 'prompt_assignment2.md');
const outputFile = path.join(baseDir, 'assignment2_output.md');

if (!apiKey) {
  console.error(`\n[ERROR] No se encontró la variable de entorno GEMINI_API_KEY.`);
  console.error(`Por favor establece tu API Key en la consola:`);
  console.error(`  PowerShell:  $env:GEMINI_API_KEY="TU_API_KEY"\n`);
  process.exit(1);
}

function getCompiledPrompt() {
  const roleText = fs.readFileSync(roleFile, 'utf8');
  const frameworkText = fs.readFileSync(frameworkFile, 'utf8');
  const markdownGuideText = fs.readFileSync(markdownGuideFile, 'utf8');
  const plantumlGuideText = fs.readFileSync(plantumlGuideFile, 'utf8');

  const problemText = fs.readFileSync(problemFile, 'utf8');
  const objectivesText = fs.readFileSync(objectivesFile, 'utf8');
  const promptText = fs.readFileSync(promptFile, 'utf8');

  return `
SYSTEM ROLE DIRECTIVES:
${roleText}

GENERAL MICROSERVICES & DDD ARCHITECTURAL FRAMEWORK:
${frameworkText}

MARKDOWN FORMATTING STANDARDS:
${markdownGuideText}

PLANTUML SYNTAX & BEST PRACTICES STANDARDS:
${plantumlGuideText}

ASSIGNMENT 2 BUSINESS CONTEXT:
${problemText}

ASSIGNMENT 2 SPECIFIC OBJECTIVES:
${objectivesText}

ASSIGNMENT 2 GUIDED INSTRUCTIONS:
${promptText}
`.trim();
}

async function generate() {
  console.log(`[INFO] Compilando prompt de Assignment 2 en memoria con el marco de Microservicios...`);
  const fullPrompt = getCompiledPrompt();

  console.log(`[INFO] Enviando prompt de Assignment 2 a Gemini API (Modelo: ${modelName})...`);
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          { text: fullPrompt }
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

    fs.writeFileSync(outputFile, resultText, 'utf8');
    console.log(`[ÉXITO] Respuesta de Assignment 2 guardada correctamente en: ${outputFile}\n`);

  } catch (err) {
    console.error(`[ERROR API] ${err.message}`);
    process.exit(1);
  }
}

generate();
