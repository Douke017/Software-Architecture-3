/**
 * Helper para Context Engineering - Week 4
 * Une los archivos de contexto en memoria y auto-crea hitos_prompted/ si falta.
 */

const fs = require('fs');
const path = require('path');

function getCompiledPrompt(hitoNum = '1') {
  const baseDir = __dirname;
  const roleFile = path.join(baseDir, 'context', 'role.md');
  const frameworkFile = path.join(baseDir, 'context', 'architecture_framework.md');
  const problemFile = path.join(baseDir, 'context', 'problem_description.md');
  const plantumlGuideFile = path.join(baseDir, 'context', 'plantuml_guide.md');
  const markdownGuideFile = path.join(baseDir, 'context', 'markdown_guide.md');
  const reqStandardsFile = path.join(baseDir, 'context', 'requirements_standards.md');
  
  const promptedDir = path.join(baseDir, 'hitos_prompted');
  const promptedFile = path.join(promptedDir, `hito${hitoNum}_prompt.md`);
  const rawHitoFile = path.join(baseDir, 'hitos', `hito${hitoNum}.md`);

  const roleText = fs.readFileSync(roleFile, 'utf8');
  const frameworkText = fs.readFileSync(frameworkFile, 'utf8');
  const problemText = fs.readFileSync(problemFile, 'utf8');
  const plantumlGuideText = fs.existsSync(plantumlGuideFile) ? fs.readFileSync(plantumlGuideFile, 'utf8') : '';
  const markdownGuideText = fs.existsSync(markdownGuideFile) ? fs.readFileSync(markdownGuideFile, 'utf8') : '';
  
  // Incluir requerimientos NASA/IBM cuando sea relevante
  const reqStandardsText = fs.existsSync(reqStandardsFile) 
    ? `\nREQUIREMENTS ENGINEERING STANDARDS (NASA & IBM DOORS):\n${fs.readFileSync(reqStandardsFile, 'utf8')}\n` 
    : '';

  // Auto-creación de hitos_prompted/hitoX_prompt.md si solo existe hitos/hitoX.md
  if (!fs.existsSync(promptedFile) && fs.existsSync(rawHitoFile)) {
    const rawText = fs.readFileSync(rawHitoFile, 'utf8');
    const autoPromptContent = `# Context Engineering Prompt - Hito ${hitoNum} (Week 4)

## Contexto de Referencia
Asimila las directrices del rol en \`../context/role.md\`, el marco metodológico en \`../context/architecture_framework.md\`, la descripción en \`../context/problem_description.md\` y los estándares en \`../context/plantuml_guide.md\` y \`../context/markdown_guide.md\`.
La especificación de origen proviene de \`../hitos/hito${hitoNum}.md\`.

---

## Directivas Arquitectónicas para el Modelo

Analiza y desarrolla la solución técnica de arquitectura a alto nivel para el **Hito ${hitoNum}** según la especificación:

${rawText}

---

## Entregable
Guarda la respuesta en \`../outputs/output${hitoNum}.md\`.
`;
    if (!fs.existsSync(promptedDir)) {
      fs.mkdirSync(promptedDir, { recursive: true });
    }
    fs.writeFileSync(promptedFile, autoPromptContent, 'utf8');
    console.log(`[AUTO-GENERADO] Se creó automáticamente el prompt guiado en: ${promptedFile}`);
  }

  // Cargar el prompt guiado (existente o recién auto-generado)
  if (fs.existsSync(promptedFile)) {
    const hitoText = fs.readFileSync(promptedFile, 'utf8');
    return `
SYSTEM ROLE DIRECTIVES:
${roleText}

GENERAL MICROSERVICES & DDD ARCHITECTURAL FRAMEWORK:
${frameworkText}

MARKDOWN FORMATTING STANDARDS:
${markdownGuideText}

PLANTUML SYNTAX & BEST PRACTICES STANDARDS:
${plantumlGuideText}
${reqStandardsText}
BUSINESS & TECHNICAL CONTEXT:
${problemText}

MILESTONE ${hitoNum} GUIDED INSTRUCTIONS:
${hitoText}
`.trim();
  }

  throw new Error(`[ERROR] No se encontró especificación para el hito ${hitoNum} en hitos/hito${hitoNum}.md`);
}

if (require.main === module) {
  const hitoNum = process.argv[2] || '1';
  try {
    const prompt = getCompiledPrompt(hitoNum);
    console.log(`[OK] Prompt para Hito ${hitoNum} listo en memoria (${prompt.length} caracteres).`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = { getCompiledPrompt };
