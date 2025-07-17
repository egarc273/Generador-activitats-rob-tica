// =================================================================================
// 1. BASE DE DADES CURRICULAR (Amb sabers més estructurats)
// =================================================================================
const curriculumData = {
    infantil: {
        decret: "DECRET 21/2023, de 7 de febrer (Segon Cicle)",
        competencies: [ /* ... */ ],
        criterisAvaluacio: [ /* ... */ ],
        // --> MODIFICAT: Els sabers ara són objectes amb label i value
        sabers: [
            { label: "Relacions i propietats dels objectes", value: "propietats_objectes" },
            { label: "Raonament i resolució de problemes", value: "resolucio_problemes" },
            { label: "Pensament computacional", value: "pensament_computacional" },
            { label: "Ús d'eines i suports digitals", value: "eines_digitals" }
        ]
    },
    primaria: { /* Per omplir */ },
    secundaria: { /* Per omplir */ }
};

// =================================================================================
// 2. BANC D'IDEES I RECURSOS (Amb idees per a la preparació)
// =================================================================================
const activityBank = {
    infantil: {
        baseTemplate: {
            metodologia: "...", // (Sense canvis)
            instrumentsAvaluacio: [ /*...*/ ] // (Sense canvis)
        },
        challenges: [ /*...*/ ], // (Sense canvis de moment)

        // --> NOU: Banc de recursos per enriquir les activitats
        preparationIdeas: {
            // Idees associades al 'value' del saber seleccionat
            "propietats_objectes": {
                vocabulary: ["Gran", "Petit", "Vermell", "Blau", "Rodó", "Quadrat", "A prop", "Lluny"],
                visuals: "Crear targetes amb formes geomètriques de diferents colors i mides. També es poden utilitzar blocs de construcció o objectes de l'aula."
            },
            "resolucio_problemes": {
                vocabulary: ["Primer", "Després", "Finalment", "Repetir", "Error", "Solució", "Camí"],
                visuals: "Dibuixar un laberint simple en un paper gran o amb cinta adhesiva a terra. Utilitzar fletxes grans per indicar les direccions."
            },
            "pensament_computacional": {
                vocabulary: ["Ordre", "Instrucció", "Seqüència", "Codi", "Programa", "Robot"],
                visuals: "Crear targetes amb icones simples que representin accions (avançar, girar, agafar). Aquestes targetes es poden ordenar per planificar la seqüència abans de tocar el robot."
            }
        }
    }
};

// =================================================================================
// 3. EL GENERADOR (Actualitzat per utilitzar la nova estructura)
// =================================================================================
const activityGenerator = {
    // --> NOU: Funció que script.js cridarà
    getCurricularSabers(userInput) {
        const { level } = userInput;
        if (curriculumData[level] && curriculumData[level].sabers) {
            return curriculumData[level].sabers;
        }
        return [];
    },

    getNivellComplet(userInput) { /* ... (sense canvis) ... */ },

    generate(userInput) {
        const { level, material, duration, subject, concept } = userInput; // 'subject' ara és el 'value' del saber

        // 1. Validacions
        if (!activityBank[level] || !curriculumData[level]) { /*...*/ }
        const normalizedMaterial = material.toLowerCase().replace(/[- ]/g, '');
        let challengeIdea = activityBank[level].challenges.find(c => c.material === normalizedMaterial);
        if (!challengeIdea) { /*...*/ }
        
        const challengeText = challengeIdea.text.replace('{concept}', `<strong>${concept}</strong>`);
        
        // 2. Obtenir plantilles i dades curriculars
        const template = activityBank[level].baseTemplate;
        const curriculum = curriculumData[level];
        const nivellComplet = this.getNivellComplet(userInput);
        
        // --> NOU: Obtenir les idees de preparació basades en el saber ('subject') seleccionat
        let preparationHTML = '';
        const prepIdeas = activityBank[level].preparationIdeas[subject]; // 'subject' ara és la clau, ex: 'resolucio_problemes'
        if (prepIdeas) {
            preparationHTML = `
                <h4>Idees per a la preparació</h4>
                <p>Per enriquir l'activitat i facilitar la comprensió, es poden preparar els següents materials:</p>
                <ul>
                    <li><strong>Vocabulari clau a introduir:</strong> ${prepIdeas.vocabulary.join(', ')}.</li>
                    <li><strong>Suport visual suggerit:</strong> ${prepIdeas.visuals}</li>
                </ul>
            `;
        }

        // 3. Generar continguts dinàmics
        const saberLabel = (curriculum.sabers.find(s => s.value === subject) || {}).label || subject;
        const objectiusDinamics = [
            `Iniciar-se en la resolució de problemes relacionats amb '${concept}' dins del saber de <strong>'${saberLabel}'</strong>.`,
            // ... (la resta d'objectius dinàmics es mantenen) ...
        ];

        // 4. Muntar la fitxa final
        return `
            <div class="activity-sheet">
                <h2>Proposta d'Activitat: ${concept} amb ${material}</h2>
                <div class="fitxa-tecnica">
                    <!-- ... (fitxa tècnica sense canvis) ... -->
                </div>

                <h3>1. Objectius d'Aprenentatge</h3>
                <!-- ... (objectius sense canvis) ... -->

                <h3>2. Desenvolupament de l'Activitat</h3>
                <!-- ... (desenvolupament principal sense canvis) ... -->

                <!-- --> NOU: Apartat de preparació -->
                <div class="preparation-box">
                    ${preparationHTML}
                </div>

                <h3>3. Metodologia i Organització de l'Aula</h3>
                <p>${template.metodologia}</p>
                
                <h3>4. Sabers i Criteris d'Avaluació</h3>
                <!-- ... (secció d'avaluació sense canvis) ... -->
            </div>
        `;
    }
};

// ... (codi de getNivellComplet es manté) ...
