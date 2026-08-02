/**
 * Runner oficial para el informe final de síntesis (report.md) - Week 4
 * Compila el contexto global y genera report.md en la raíz de Week4 y en outputs/report.md.
 * 
 * Uso:
 *   $env:GEMINI_API_KEY="tu_api_key"
 *   node Week4/run_report.js [modelo]
 */

const fs = require('fs');
const path = require('path');

const modelName = process.argv[2] || 'gemini-2.5-flash';
const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

const baseDir = __dirname;

const roleFile = path.join(baseDir, 'context', 'role.md');
const frameworkFile = path.join(baseDir, 'context', 'architecture_framework.md');
const markdownGuideFile = path.join(baseDir, 'context', 'markdown_guide.md');
const plantumlGuideFile = path.join(baseDir, 'context', 'plantuml_guide.md');
const problemFile = path.join(baseDir, 'context', 'problem_description.md');
const promptFile = path.join(baseDir, 'hitos_prompted', 'report_prompt.md');

const outputFileRoot = path.join(baseDir, 'report.md');
const outputFileOutputs = path.join(baseDir, 'outputs', 'report.md');

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
  const promptText = fs.existsSync(promptFile) 
    ? fs.readFileSync(promptFile, 'utf8') 
    : `# Context Engineering Prompt - Informe Final Sintético (Week 4)\nAnaliza la solución integral de la Semana 4 y genera report.md (máx. 2 páginas) con diagrama PlantUML unificado y decisiones de diseño.`;

  return `
SYSTEM ROLE DIRECTIVES:
${roleText}

GENERAL MICROSERVICES & DDD ARCHITECTURAL FRAMEWORK:
${frameworkText}

MARKDOWN FORMATTING STANDARDS:
${markdownGuideText}

PLANTUML SYNTAX & BEST PRACTICES STANDARDS:
${plantumlGuideText}

BUSINESS & TECHNICAL CONTEXT:
${problemText}

FINAL REPORT GUIDED INSTRUCTIONS:
${promptText}
`.trim();
}

async function generate() {
  console.log(`[INFO] Compilando prompt de report.md de la Semana 4 en memoria...`);
  const fullPrompt = getCompiledPrompt();

  console.log(`[INFO] Enviando prompt de report.md a Gemini API (Modelo: ${modelName})...`);
  
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

    const outputsDir = path.join(baseDir, 'outputs');
    if (!fs.existsSync(outputsDir)) {
      fs.mkdirSync(outputsDir, { recursive: true });
    }

    fs.writeFileSync(outputFileRoot, resultText, 'utf8');
    fs.writeFileSync(outputFileOutputs, resultText, 'utf8');
    
    console.log(`[ÉXITO] Informe final guardado en:`);
    console.log(`  - ${outputFileRoot}`);
    console.log(`  - ${outputFileOutputs}\n`);

  } catch (err) {
    console.error(`[ERROR API] ${err.message}`);
    process.exit(1);
  }
}

generate();
