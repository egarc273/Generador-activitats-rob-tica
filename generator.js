// =================================================================================
// 1. BASE DE DADES CURRICULAR (Dades completes)
// =================================================================================
const curriculumData = {
    infantil: {
        decret: "DECRET 21/2023, de 7 de febrer (Segon Cicle)",
        competencies: [
            { id: "CE2", text: "Desenvolupar, de manera raonada, el pensament científic per explorar, observar, formular-se preguntes, experimentar i interpretar el món que l'envolta." },
            { id: "CE3", text: "Iniciar-se en el pensament computacional, de manera creativa, a través de la modelització i la representació per resoldre tasques i problemes quotidians." }
        ],
        criterisAvaluacio: [
            "Provar diferents solucions per fer front a un repte, observant els resultats obtinguts i explicant què ha passat (CA 2.2).",
            "Proposar seqüències ordenades d'accions i instruccions per resoldre tasques senzilles (CA 3.1).",
            "Utilitzar jocs i materials digitals i manipulables per a la creació, la comunicació i l'aprenentatge (CA 3.2)."
        ],
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
// 2. BANC D'IDEES I RECURSOS (Dades completes)
// =================================================================================
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
            { material: 'talebot', text: "Programar el Tale-Bot per a que segueixi un camí dibuixat en un mapa que representi el concepte de <strong>'{concept}'</strong>. Per exemple, si el concepte és 'el cicle de l'aigua', el camí pot passar per un riu, un núvol i una muntanya." },
            { material: 'codeyrocky', text: "Programar el Codey Rocky per a que reaccioni de manera diferent a targetes de colors relacionades amb <strong>'{concept}'</strong>. Per exemple, si el concepte és 'les emocions', pot mostrar una cara contenta amb el color groc i una cara trista amb el blau." },
            { material: 'unplugged', text: "Crear una 'coreografia' o un circuit humà on els infants representin amb el seu cos els passos per explicar <strong>'{concept}'</strong>. Un infant fa de 'programador' i dona les instruccions (un pas endavant, mitja volta...) a la resta, que són els 'robots'."}
        ],
        // --> DADES COMPLETES I CORREGIDES
        preparationIdeas: {
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
            },
            // --> AQUESTA ERA L'ENTRADA QUE FALTAVA
            "eines_digitals": {
                vocabulary: ["Botó", "Pantalla", "Ordinador", "Programa", "Clic", "Joc"],
                visuals: "Fer servir pictogrames grans per identificar les parts del dispositiu (pantalla, botons, ratolí). Projectar a la pissarra digital l'entorn de programació per a que tots el vegin."
            }
        }
    }
};

// =================================================================================
// 3. EL GENERADOR (Codi defensiu i corregit)
// =================================================================================
const activityGenerator = {
    getCurricularSabers(userInput) {
        const { level } = userInput;
        return curriculumData[level]?.sabers ?? []; // Codi més segur
    },

    getNivellComplet(userInput) {
        if (userInput.level === 'infantil') {
            return "Segon Cicle d'Educació Infantil";
        }
        // ... (la resta del codi per a primària i secundària es manté) ...
    },

    generate(userInput) {
        const { level, material, duration, subject, concept } = userInput;

        if (!activityBank[level] || !curriculumData[level]) {
            return `<div class="activity-sheet"><h2>Contingut no disponible</h2><p>Encara no tenim activitats definides per al nivell seleccionat.</p></div>`;
        }

        const normalizedMaterial = material.toLowerCase().replace(/[- ]/g, '');
        const challengeIdea = activityBank[level].challenges.find(c => c.material === normalizedMaterial);
        
        if (!challengeIdea) {
            return `<div class="activity-sheet"><h2>Ho sentim</h2><p>De moment no tenim una activitat detallada per a <strong>${material}</strong> en el nivell d'<strong>Educació Infantil</strong>.</p></div>`;
        }
        
        const challengeText = challengeIdea.text.replace(/{concept}/g, `<strong>${concept}</strong>`);
        
        const template = activityBank[level].baseTemplate;
        const curriculum = curriculumData[level];
        const nivellComplet = this.getNivellComplet(userInput);
        
        // --> CODI MÉS ROBUST I CORREGIT
        let preparationHTML = '';
        const prepIdeas = activityBank[level].preparationIdeas?.[subject];
        if (prepIdeas) {
            const vocabularyList = prepIdeas.vocabulary?.join(', ') ?? 'No especificat.';
            const visualsText = prepIdeas.visuals ?? 'No especificat.';
            preparationHTML = `
                <div class="preparation-box">
                    <h4>Idees per a la preparació</h4>
                    <p>Per enriquir l'activitat i facilitar la comprensió, es poden preparar els següents materials:</p>
                    <ul>
                        <li><strong>Vocabulari clau a introduir:</strong> ${vocabularyList}</li>
                        <li><strong>Suport visual suggerit:</strong> ${visualsText}</li>
                    </ul>
                </div>
            `;
        }

        const saberLabel = curriculum.sabers?.find(s => s.value === subject)?.label ?? subject;
        
        const objectiusDinamics = [
            `Iniciar-se en la resolució de problemes relacionats amb '${concept}' dins del saber de <strong>'${saberLabel}'</strong>.`,
            `Utilitzar el robot <strong>${material}</strong> com a eina per expressar i representar idees.`,
            `Verbalitzar les accions i decisions preses durant el procés de programació.`,
            `Explorar, a través del joc i l'assaig-error, les possibilitats del material.`
        ];
        
        let sabersHTML = (curriculum.sabers ?? []).map(s => `<li>${s.label}</li>`).join('');

        return `
            <div class="activity-sheet">
                <h2>Proposta d'Activitat: ${concept} amb ${material}</h2>
                <div class="fitxa-tecnica">
                    <p><strong>Nivell:</strong> ${nivellComplet}</p>
                    <p><strong>Durada estimada:</strong> ${duration}</p>
                    <p><strong>Material Principal:</strong> ${material}</p>
                    <p><strong>Saber principal implicat:</strong> ${saberLabel}</p>
                </div>

                <h3>1. Objectius d'Aprenentatge</h3>
                <ul>${objectiusDinamics.map(obj => `<li>${obj}</li>`).join('')}</ul>
                <p class="curricular-note">Aquests objectius contribueixen al desenvolupament de les <strong>competències específiques ${curriculum.competencies.map(c => c.id).join(' i ')}</strong> del ${curriculum.decret}.</p>

                <h3>2. Desenvolupament de l'Activitat</h3>
                <p>L'activitat es planteja com un petit projecte d'exploració. La tasca central és:</p>
                <div class="challenge-box"><p>${challengeText}</p></div>
                ${preparationHTML}
                <p><strong>Seqüència de treball a l'aula:</strong></p>
                <ol>
                    <li><strong>Conversa inicial:</strong> Partir del concepte <strong>'${concept}'</strong>. Què en sabem? Què ens imaginem?</li>
                    <li><strong>Presentació del material:</strong> Exploració lliure del robot ${material} i el seu funcionament bàsic.</li>
                    <li><strong>Realització del repte:</strong> En petits grups, els infants aborden el repte plantejat amb l'acompanyament del docent.</li>
                    <li><strong>Posada en comú:</strong> Cada grup mostra als altres la seva creació i explica com ho ha aconseguit.</li>
                </ol>

                <h3>3. Metodologia i Organització de l'Aula</h3>
                <p>${template.metodologia}</p>
                
                <h3>4. Sabers i Criteris d'Avaluació</h3>
                <p>Aquesta activitat permet mobilitzar els següents <strong>sabers clau</strong>:</p>
                <ul>${sabersHTML}</ul>
                <p>L'avaluació es basarà en els següents <strong>criteris d'avaluació</strong> de referència:</p>
                <ul>${(curriculum.criterisAvaluacio ?? []).map(c => `<li>${c}</li>`).join('')}</ul>
                <p>Es proposen els següents <strong>instruments</strong>:</p>
                <ul>${(template.instrumentsAvaluacio ?? []).map(inst => `<li>${inst}</li>`).join('')}</ul>
            </div>
        `;
    }
};

// No oblidis la funció auxiliar al final
activityGenerator.getNivellComplet = function(userInput) {
    if (userInput.level === 'infantil') return "Segon Cicle d'Educació Infantil";
    const { level, cycle_primary, cycle_secondary } = userInput;
    let nivellText;
    switch (level) { case 'primaria': nivellText = 'Educació Primària'; break; case 'secundaria': nivellText = 'Educació Secundària'; break; default: nivellText = 'Nivell no especificat'; }
    if (cycle_primary) { switch (cycle_primary) { case 'primaria_inicial': nivellText += ', Cicle Inicial'; break; case 'primaria_mitja': nivellText += ', Cicle Mitjà'; break; case 'primaria_superior': nivellText += ', Cicle Superior'; break; } }
    if (cycle_secondary) { switch (cycle_secondary) { case 'eso_1_2': nivellText += ', 1r i 2n d\'ESO'; break; case 'eso_3_4': nivellText += ', 3r i 4t d\'ESO'; break; } }
    return nivellText;
};
