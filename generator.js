// =================================================================================
// 1. BASE DE DADES CURRICULAR (Molt ampliada)
// =================================================================================
const curriculumData = {
    infantil: {
        decret: "DECRET 21/2023, de 7 de febrer (Segon Cicle)",
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
        criterisAvaluacio: [
            "Provar diferents solucions per fer front a un repte, observant els resultats obtinguts i explicant què ha passat (CA 2.2).",
            "Proposar seqüències ordenades d'accions i instruccions per resoldre tasques senzilles (CA 3.1).",
            "Utilitzar jocs i materials digitals i manipulables per a la creació, la comunicació i l'aprenentatge (CA 3.2)."
        ],
        sabers: [
            { label: "Relacions i propietats dels objectes", value: "propietats_objectes" },
            { label: "Pensament computacional", value: "pensament_computacional" },
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
    primaria: { sabers: [] }, // Important per evitar errors si es tria primària
    secundaria: { sabers: [] } // Important per evitar errors si es tria secundària
};

const activityBank = {
    infantil: {
        baseTemplate: {
             metodologia: "L'activitat es planteja des d'una perspectiva lúdica i manipulativa. S'organitzarà l'aula en <strong>racons o estacions de treball</strong> on els infants, en <strong>petits grups</strong>, podran explorar el material de manera autònoma. El docent adoptarà un rol de <strong>facilitador</strong>, acompanyant els grups, fent preguntes obertes per estimular el raonament ('Què passa si...? Per què creus que...?') i documentant el procés, però sense donar solucions directes.",
            instrumentsAvaluacio: [
                "<strong>Observació directa i sistemàtica:</strong> Amb una graella d'observació per registrar la interacció amb el material, les estratègies de resolució de problemes i la comunicació d'idees.",
                "<strong>Recull de produccions:</strong> Fotografies o vídeos curts del procés i del resultat final aconseguit pels grups.",
                "<strong>Converses individuals i de grup:</strong> Per recollir les explicacions dels infants sobre el que han fet i com ho han aconseguit."
            ]
        },
        challenges: [
            { material: 'talebot', text: "Programar el Tale-Bot per a que segueixi un camí dibuixat en un mapa que representi el concepte de <strong>'{concept}'</strong>." },
            { material: 'codeyrocky', text: "Programar el Codey Rocky per a que reaccioni de manera diferent a targetes de colors relacionades amb <strong>'{concept}'</strong>." },
            { material: 'unplugged', text: "Crear una 'coreografia' o un circuit humà on els infants representin amb el seu cos els passos per explicar <strong>'{concept}'</strong>."}
        ],
        preparationIdeas: {
            "propietats_objectes": { vocabulary: ["Gran", "Petit", "Vermell", "Blau"], visuals: "Targetes amb formes geomètriques." },
            "pensament_computacional": { vocabulary: ["Ordre", "Seqüència", "Codi"], visuals: "Targetes amb icones d'accions." },
            "cos_moviment": { vocabulary: ["Saltar", "Córrer", "Girar", "Equilibri"], visuals: "Dibuixos d'infants fent diferents moviments; circuits psicomotrius." },
            "llenguatge_matematic": { vocabulary: ["Un, dos, tres...", "Més que", "Menys que"], visuals: "Gomets, reglets, daus grans." },
            "expressio_musical": { vocabulary: ["So", "Silenci", "Ritme", "Cançó"], visuals: "Imatges d'instruments musicals." },
            "medi_natural": { vocabulary: ["Fulla", "Pedra", "Aigua", "Animal"], visuals: "Fotos d'elements de la natura, lupes per observar." }
        }
    }
};

const activityGenerator = {
    getCurricularSabers(userInput) {
        const { level } = userInput;
        return curriculumData[level]?.sabers ?? [];
    },

    getNivellComplet(userInput) {
        if (userInput.level === 'infantil') {
            return "Segon Cicle d'Educació Infantil";
        }
        // ... (resta del codi) ...
        return "Nivell per definir";
    },

    generate(userInput) {
        const { level, material, duration, subject: sabersSeleccionats, concept } = userInput;
        const curriculum = curriculumData[level];
        if (!curriculum) return "<div class='activity-sheet'><h2>Error</h2><p>No s'han trobat dades curriculars per a aquest nivell.</p></div>";
        
        const normalizedMaterial = material.toLowerCase().replace(/[- ]/g, '');

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
                    <ul>
                        ${prepVocabulary.size > 0 ? `<li><strong>Vocabulari clau:</strong> ${Array.from(prepVocabulary).join(', ')}.</li>` : ''}
                        ${prepVisuals.size > 0 ? `<li><strong>Suport visual:</strong> ${Array.from(prepVisuals).join(' ')}</li>` : ''}
                    </ul>
                </div>`;
        }
        
        const sabersLabels = (sabersSeleccionats || []).map(saberKey => {
            return curriculum.sabers.find(s => s.value === saberKey)?.label ?? saberKey;
        }).join(', ');
        
        const competenciesHTML = curriculum.competencies.map(c => `<li><strong>${c.area} (${c.id}):</strong> ${c.text}</li>`).join('');
        const challengeText = activityBank[level]?.challenges.find(c => c.material === normalizedMaterial)?.text.replace(/{concept}/g, `<strong>${concept}</strong>`) ?? "Repte no definit per a aquest material.";

        return `
            <div class="activity-sheet">
                <h2>Proposta d'Activitat: ${concept} amb ${material}</h2>
                <div class="fitxa-tecnica">
                    <p><strong>Nivell:</strong> ${this.getNivellComplet(userInput)}</p>
                    <p><strong>Durada:</strong> ${duration}</p>
                    <p><strong>Sabers Implicats:</strong> ${sabersLabels}</p>
                </div>
                <h3>1. Marc Curricular (${curriculum.decret})</h3>
                <p>Aquesta activitat, de caràcter globalitzat, contribueix al desenvolupament de les següents <strong>competències específiques</strong>:</p>
                <ul>${competenciesHTML}</ul>
                <h3>2. Desenvolupament de l'Activitat</h3>
                <p>Repte principal: ${challengeText}</p>
                ${preparationHTML}
                <h3>3. Metodologia</h3>
                <p>${activityBank[level].baseTemplate.metodologia}</p>
            </div>`;
    }
};
