// =================================================================================
// 1. BASE DE DADES CURRICULAR (Molt ampliada)
// =================================================================================
const curriculumData = {
    infantil: {
        decret: "DECRET 21/2023, de 7 de febrer (Segon Cicle)",
        // --> TOTES les 8 Competències Específiques
        competencies: [
            { id: "CE1", area: "Creixement en Harmonia", text: "Progressar en el coneixement i el domini del seu cos, en la imatge que en té, i en les possibilitats d'acció, tot mostrant un nivell de confiança ajustat i una actitud d'acceptació de les pròpies característiques i les de les altres persones." },
            { id: "CE2", area: "Creixement en Harmonia", text: "Assolir progressivament el benestar emocional, tot identificant, gestionant i expressant les seves emocions i necessitats, i desenvolupant l'autoconfiança i l'actitud d'aprenentatge." },
            { id: "CE3", area: "Creixement en Harmonia", text: "Adoptar models, normes i hàbits saludables, sostenibles i respectuosos, que contribueixin al benestar individual i col·lectiu." },
            { id: "CE1", area: "Descobriment i Exploració de l'Entorn", text: "Identificar les característiques d'objectes, materials i col·leccions i establir relacions entre si, mitjançant l'exploració, la manipulació sensorial, la formulació de preguntes i la comprovació d'hipòtesis, per descobrir-ne i apreciar-ne l'ús." },
            { id: "CE2", area: "Descobriment i Exploració de l'Entorn", text: "Desenvolupar, de manera raonada, el pensament científic per explorar, observar, formular-se preguntes, experimentar i interpretar el món que l'envolta." },
            { id: "CE3", area: "Descobriment i Exploració de l'Entorn", text: "Iniciar-se en el pensament computacional, de manera creativa, a través de la modelització i la representació per resoldre tasques i problemes quotidians." },
            { id: "CE1", area: "Comunicació i Representació", text: "Manifestar interès per interactuar en situacions quotidianes, a través de l'exploració i l'ús del seu repertori comunicatiu, per expressar les seves necessitats i intencions i enfortir les relacions socials." },
            { id: "CE2", area: "Comunicació i Representació", text: "Interpretar i comprendre missatges i representacions, tot utilitzant coneixements i experiències propis per respondre a les demandes de l'entorn i construir nous aprenentatges." },
        ],
        criterisAvaluacio: [ /* Sense canvis de moment */ ],
        // --> LLISTA COMPLETA DE SABERS
        sabers: [
            // Existents
            { label: "Relacions i propietats dels objectes", value: "propietats_objectes" },
            { label: "Pensament computacional", value: "pensament_computacional" },
            // Nous
            { label: "Cos, moviment i autonomia", value: "cos_moviment" },
            { label: "Desenvolupament de l'afectivitat", value: "afectivitat" },
            { label: "Orientació espai-temps", value: "espai_temps" },
            { label: "Hàbits de vida saludable", value: "vida_saludable" },
            { label: "Comunicació oral", value: "comunicacio_oral" },
            { label: "Aproximació al llenguatge escrit", value: "llenguatge_escrit" },
            { label: "Literatura infantil", value: "literatura_infantil" },
            { label: "Llenguatge matemàtic", value: "llenguatge_matematic" },
            { label: "Llenguatge i expressió musical", value: "expressio_musical" },
            { label: "Llenguatge i expressió plàstica", value: "expressio_plastica" },
            { label: "Llenguatge i expressió corporal", value: "expressio_corporal" },
            { label: "Exploració d'objectes i materials", value: "exploracio_objectes" },
            { label: "Indagació en el medi natural", value: "medi_natural" },
            { label: "La vida amb els altres", value: "vida_social" }
        ]
    },
    primaria: { /*...*/ },
    secundaria: { /*...*/ }
};

// =================================================================================
// 2. BANC D'IDEES (Ampliat per cobrir nous sabers)
// =================================================================================
const activityBank = {
    infantil: {
        baseTemplate: { /*...*/ },
        challenges: [ /*...*/ ],
        preparationIdeas: {
            "propietats_objectes": { vocabulary: ["Gran", "Petit", "Vermell", "Blau"], visuals: "Targetes amb formes geomètriques." },
            "pensament_computacional": { vocabulary: ["Ordre", "Seqüència", "Codi"], visuals: "Targetes amb icones d'accions." },
            "cos_moviment": { vocabulary: ["Saltar", "Córrer", "Girar", "Equilibri"], visuals: "Dibuixos d'infants fent diferents moviments; circuits psicomotrius." },
            "llenguatge_matematic": { vocabulary: ["Un, dos, tres...", "Més que", "Menys que"], visuals: "Gomets, reglets, daus grans." },
            "expressio_musical": { vocabulary: ["So", "Silenci", "Ritme", "Cançó"], visuals: "Imatges d'instruments musicals." },
            "medi_natural": { vocabulary: ["Fulla", "Pedra", "Aigua", "Animal"], visuals: "Fotos d'elements de la natura, lupes per observar." }
            // Afegeix més idees per a la resta de sabers...
        }
    }
};

// =================================================================================
// 3. EL GENERADOR (Adaptat per processar arrays)
// =================================================================================
const activityGenerator = {
    getCurricularSabers(userInput) { /*...*/ },
    getNivellComplet(userInput) { /*...*/ },

    generate(userInput) {
        // 'subject' ara és un array: ['pensament_computacional', 'llenguatge_matematic']
        const { level, material, duration, subject: sabersSeleccionats, concept } = userInput;

        // ... (validacions inicials sense canvis) ...
        const curriculum = curriculumData[level];
        const nivellComplet = this.getNivellComplet(userInput);

        // --> NOU: Processament de múltiples sabers
        let prepVocabulary = new Set();
        let prepVisuals = new Set();
        (sabersSeleccionats || []).forEach(saberKey => {
            const ideas = activityBank[level]?.preparationIdeas?.[saberKey];
            if (ideas) {
                (ideas.vocabulary || []).forEach(v => prepVocabulary.add(v));
                if (ideas.visuals) prepVisuals.add(ideas.visuals);
            }
        });

        let preparationHTML = '';
        if (prepVocabulary.size > 0 || prepVisuals.size > 0) {
            preparationHTML = `
                <div class="preparation-box">
                    <h4>Idees per a la preparació</h4>
                    <p>Per enriquir l'activitat i facilitar la comprensió, es poden preparar els següents materials:</p>
                    <ul>
                        ${prepVocabulary.size > 0 ? `<li><strong>Vocabulari clau a introduir:</strong> ${Array.from(prepVocabulary).join(', ')}.</li>` : ''}
                        ${prepVisuals.size > 0 ? `<li><strong>Suport visual suggerit:</strong> ${Array.from(prepVisuals).join(' ')}</li>` : ''}
                    </ul>
                </div>`;
        }

        const sabersLabels = (sabersSeleccionats || []).map(saberKey => {
            return curriculum.sabers.find(s => s.value === saberKey)?.label ?? saberKey;
        }).join(', ');
        
        // --> NOU: Llistat complet de competències
        const competenciesHTML = curriculum.competencies.map(c => `<li><strong>${c.area} (${c.id}):</strong> ${c.text}</li>`).join('');

        return `
            <div class="activity-sheet">
                <h2>Proposta d'Activitat: ${concept} amb ${material}</h2>
                <div class="fitxa-tecnica">
                    <p><strong>Nivell:</strong> ${nivellComplet}</p>
                    <p><strong>Durada:</strong> ${duration}</p>
                    <p><strong>Sabers Implicats:</strong> ${sabersLabels}</p>
                </div>

                <h3>1. Marc Curricular de Referència (${curriculum.decret})</h3>
                <p>Aquesta activitat, de caràcter globalitzat, contribueix al desenvolupament de les següents <strong>competències específiques</strong>:</p>
                <ul>${competenciesHTML}</ul>

                <!-- ... (La resta de la fitxa s'ha d'ajustar per reflectir aquesta nova riquesa) ... -->
                <h3>2. Desenvolupament de l'Activitat</h3>
                <p>L'activitat es planteja com un petit projecte d'exploració per treballar el concepte de <strong>'${concept}'</strong> a través dels sabers de <strong>${sabersLabels}</strong>.</p>
                <!-- ... La resta de la plantilla pot seguir una estructura similar, però ara el docent sap que ha d'integrar tots aquests sabers. -->
                ${preparationHTML}
                <!-- ... -->
            </div>
        `;
    }
};

// ... (codi de getCurricularSabers i getNivellComplet sense canvis) ...
