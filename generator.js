// =================================================================================
// 1. BASE DE DADES CURRICULAR (Infantil - Validat)
// =================================================================================
const curriculumData = {
    infantil: {
        decret: "DECRET 21/2023, de 7 de febrer",
        competencies: [
            { id: "CE2", text: "Desenvolupar, de manera raonada, el pensament científic per explorar, observar, formular-se preguntes, experimentar i interpretar el món que l'envolta." },
            { id: "CE3", text: "Iniciar-se en el pensament computacional, de manera creativa, a través de la modelització i la representació per resoldre tasques i problemes quotidians." }
        ],
        criterisAvaluacio: [
            "Provar diferents solucions per fer front a un repte, observant els resultats obtinguts i explicant què ha passat (CA 2.2).",
            "Proposar seqüències ordenades d'accions i instruccions per resoldre tasques senzilles (CA 3.1).",
            "Utilitzar jocs i materials digitals i manipulables per a la creació, la comunicació i l'aprenentatge (CA 3.2)."
        ]
    },
    primaria: { /* Per omplir */ },
    secundaria: { /* Per omplir */ }
};

// =================================================================================
// 2. BANC D'IDEES I ACTIVITATS (AMB LA NOVA ESTRUCTURA DETALLADA)
// =================================================================================
const activityBank = {
    infantil: {
        challenges: [
            {
                // --> IMPORTANT: Utilitzarem valors nets (minúscules, sense guions) per fer la cerca més fàcil
                material: 'talebot', 
                title: "El camí secret del bosc",
                objectius: [
                    "Planificar una seqüència de passos lògics per arribar a un objectiu.",
                    "Identificar i corregir errors en una seqüència (iniciació a la depuració).",
                    "Utilitzar el llenguatge verbal per descriure accions i moviments.",
                    "Col·laborar en petit grup per assolir un repte comú."
                ],
                desenvolupament: {
                    fase1: "<strong>Conversa inicial (5 min):</strong> Asseguts en rotllana, preguntem als infants: Què és un mapa? Com podem dir-li a algú com anar d'un lloc a un altre? Recollim les seves idees sobre 'endavant', 'enrere', 'girar'.",
                    fase2: "<strong>Presentació del repte (5 min):</strong> Presentem el Tale-Bot: 'Aquest és el nostre amic, el robot Tal. S'ha perdut al bosc i vol arribar al niu de l'esquirol per portar-li una gla. Aquest és el mapa del bosc (un tapís o paper gran a terra). Hem d'ajudar-lo a trobar el camí correcte donant-li les instruccions amb els botons'.",
                    fase3: "<strong>Exploració i construcció (15-20 min):</strong> En petits grups, els infants tenen un Tale-Bot i un petit mapa. proven diferents seqüències. El docent els anima a provar i equivocar-se ('assaig-error'), fent preguntes com: 'Què ha passat? On volíem anar? Què podem canviar?'.",
                    fase4: "<strong>Posada en comú (10 min):</strong> Cada grup mostra la seva solució a la resta. Han trobat tots el mateix camí? Hi ha camins més curts? Es verbalitza el procés: 'Primer hem anat endavant dues vegades, després hem girat a la dreta...'"
                },
                metodologia: "Aprenentatge basat en el joc i l'experimentació. El treball es realitza en <strong>petits grups cooperatius</strong> per fomentar la comunicació i la resolució conjunta de problemes. El docent actua com a <strong>facilitador</strong>, fent preguntes obertes que guiïn el descobriment, però sense donar la solució directa.",
                instrumentsAvaluacio: [
                    "<strong>Observació directa:</strong> Mitjançant una graella o rúbrica senzilla, el docent anota la participació, la col·laboració i si l'infant proposa seqüències o ajuda a corregir-les.",
                    "<strong>Portafolis fotogràfic/vídeo:</strong> Documentar el procés dels grups amb fotos o vídeos curts que mostrin com proven, fallen i reajusten les seves seqüències.",
                    "<strong>Conversa final:</strong> Recollir les verbalitzacions dels infants durant la posada en comú per avaluar la seva comprensió del procés."
                ]
            },
            {
                material: 'codeyrocky', // Valor net
                title: "L'explorador de colors",
                objectius: ["Identificar colors bàsics.", "Associar un color a una reacció (llum o so)."],
                desenvolupament: { fase1: "...", fase2: "...", fase3: "...", fase4: "..." },
                metodologia: "...",
                instrumentsAvaluacio: ["..."]
            }
        ]
    }
};

// =================================================================================
// 3. EL GENERADOR (Amb la lògica de cerca corregida)
// =================================================================================
const activityGenerator = {
    getNivellComplet(userInput) { /* ... (codi sense canvis) ... */ },

    generate(userInput) {
        const { level, material, duration } = userInput;
        
        // --> INICI DE LA CORRECCIÓ
        // 1. Netejem el valor del material rebut de l'usuari per fer-lo coincidir amb el de la base de dades
        const normalizedMaterial = material.toLowerCase().replace(/[- ]/g, '');

        // 2. Seleccionar una activitat del banc d'idees amb el valor netejat
        let activity;
        if (activityBank[level] && activityBank[level].challenges) {
            activity = activityBank[level].challenges.find(c => c.material === normalizedMaterial);
        }
        // --> FI DE LA CORRECCIÓ

        // Si no es troba una activitat específica, es mostra un missatge
        if (!activity) {
            return `<div class="activity-sheet"><h2>Ho sentim</h2><p>De moment no tenim una activitat detallada per a <strong>${material}</strong> en el nivell d'<strong>Educació Infantil</strong>. Estem treballant per afegir-ne més!</p><p>Valors de cerca: ${normalizedMaterial}</p></div>`;
        }

        // 3. Obtenir les dades curriculars
        const curriculum = curriculumData[level];
        const nivellComplet = this.getNivellComplet(userInput);

        // 4. Construir l'HTML final amb la nova estructura detallada
        return `
            <div class="activity-sheet">
                <!-- TÍTOL I FITXA TÈCNICA -->
                <h2>${activity.title}</h2>
                <div class="fitxa-tecnica">
                    <p><strong>Nivell:</strong> ${nivellComplet}</p>
                    <p><strong>Durada estimada:</strong> ${duration}</p>
                    <p><strong>Material Principal:</strong> ${material}</p>
                    <p><strong>Agrupament:</strong> Petits grups cooperatius</p>
                </div>

                <!-- 1. OBJECTIUS D'APRENENTATGE -->
                <h3>1. Objectius d'Aprenentatge</h3>
                <p>Amb aquesta activitat, es pretén que els infants siguin capaços de:</p>
                <ul>
                    ${activity.objectius.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
                <p class="curricular-note">Aquests objectius contribueixen al desenvolupament de les <strong>competències específiques ${curriculum.competencies.map(c => c.id).join(' i ')}</strong> del ${curriculum.decret}.</p>

                <!-- 2. DESENVOLUPAMENT DE L'ACTIVITAT (PAS A PAS) -->
                <h3>2. Desenvolupament de l'Activitat</h3>
                <div class="fase">
                    <h4>Fase 1: Conversa Inicial i Activació</h4>
                    <p>${activity.desenvolupament.fase1}</p>
                </div>
                <div class="fase">
                    <h4>Fase 2: Presentació del Repte</h4>
                    <p>${activity.desenvolupament.fase2}</p>
                </div>
                <div class="fase">
                    <h4>Fase 3: Exploració i Construcció</h4>
                    <p>${activity.desenvolupament.fase3}</p>
                </div>
                <div class="fase">
                    <h4>Fase 4: Posada en Comú i Reflexió</h4>
                    <p>${activity.desenvolupament.fase4}</p>
                </div>

                <!-- 3. METODOLOGIA -->
                <h3>3. Metodologia</h3>
                <p>${activity.metodologia}</p>

                <!-- 4. AVALUACIÓ -->
                <h3>4. Avaluació</h3>
                <p>L'avaluació serà formativa i contínua, centrada en el procés. Es tindran en compte els següents <strong>criteris d'avaluació</strong> de referència:</p>
                <ul>
                    ${curriculum.criterisAvaluacio.map(c => `<li>${c}</li>`).join('')}
                </ul>
                <p>Es proposen els següents <strong>instruments d'avaluació</strong>:</p>
                <ul>
                    ${activity.instrumentsAvaluacio.map(inst => `<li>${inst}</li>`).join('')}
                </ul>
            </div>
        `;
    }
};

// Manté aquesta funció auxiliar aquí
activityGenerator.getNivellComplet = function(userInput) {
    const { level, cycle_primary, cycle_secondary } = userInput;
    let nivellText;
    switch (level) { case 'infantil': nivellText = 'Educació Infantil'; break; case 'primaria': nivellText = 'Educació Primària'; break; case 'secundaria': nivellText = 'Educació Secundària'; break; default: nivellText = 'Nivell no especificat'; }
    if (cycle_primary) { switch (cycle_primary) { case 'primaria_inicial': nivellText += ', Cicle Inicial'; break; case 'primaria_mitja': nivellText += ', Cicle Mitjà'; break; case 'primaria_superior': nivellText += ', Cicle Superior'; break; } }
    if (cycle_secondary) { switch (cycle_secondary) { case 'eso_1_2': nivellText += ', 1r i 2n d\'ESO'; break; case 'eso_3_4': nivellText += ', 3r i 4t d\'ESO'; break; } }
    return nivellText;
};
