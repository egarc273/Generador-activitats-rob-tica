// =================================================================================
// 1. BASE DE DADES CURRICULAR
// =================================================================================
const curriculumData = {
    // --> AFEGIT AMB LA TEVA VALIDACIÓ
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
        ],
        sabers: [
            "Relacions i propietats dels objectes (forma, color, mida).",
            "Seqüenciació d'accions per a la realització d'una tasca.",
            "Iniciació a la robòtica i llenguatges de programació.",
            "Ús d'eines i suports digitals en contexts de joc i aprenentatge."
        ]
    },
    primaria: {
        // Aquesta secció l'omplirem en el següent pas
        decret: "DECRET 175/2022, de 27 de setembre",
        competencies: [],
        criterisAvaluacio: {},
        sabers: []
    },
    secundaria: {
        // ...
    }
};

// =================================================================================
// 2. BANC D'IDEES I ACTIVITATS
// =================================================================================
const activityBank = {
    // --> NOU: Activitats específiques per a Infantil
    infantil: {
        challenges: [
            { 
                material: 'Tale-bot', 
                text: "En un mapa dibuixat a terra (el barri, el bosc...), programar el Tale-Bot perquè vagi des de 'casa' fins a l''escola' seguint un camí i evitant els obstacles. Es treballa la seqüenciació i la lateralitat."
            },
            {
                material: 'Codey Rocky',
                text: "Classificació de colors. Col·loquem targetes de diferents colors (vermell, verd, blau) i programem el Codey Rocky perquè, quan el seu sensor detecti un color, digui el nom del color o mostri una cara contenta a la pantalla LED."
            },
            {
                material: 'Material desendollat',
                text: "La recepta del sandvitx. En gran grup, crear les instruccions pas a pas per fer un sandvitx. Un docent o alumne fa de 'robot' i només pot executar les ordres exactes que li donen. Això evidencia la importància de donar instruccions precises i ordenades."
            },
            {
                material: 'Scratch', // Adaptat per a Scratch JR o iniciació a Scratch
                text: "Crear una petita animació. Programar un personatge (el gat) perquè es mogui d'una banda a l'altra de la pantalla i digui 'Hola!' quan arriba al final. Es treballa la seqüenciació bàsica d'ordres."
            }
        ]
    },
    // Reptes genèrics si no es troba res específic
    default: {
        introductions: [
            "Aquesta activitat connecta l'àrea de {subject} amb el pensament computacional. Es treballaran habilitats clau com la descomposició, el reconeixement de patrons, l'abstracció i el disseny d'algorismes.",
            "Explorarem com la robòtica ens pot ajudar a entendre millor el concepte de {concept}. Ens centrarem en resoldre un petit repte de manera creativa i col·laborativa."
        ],
        challenges: [
            { material: 'default', text: "Dissenyar i programar un sistema amb {material} que representi el concepte de {concept}. Els estudiants hauran de pensar en les entrades (sensors), els processos (lògica) i les sortides (actuadors, pantalla) del seu projecte." }
        ],
        evaluation: [
            "Un cop finalitzat el repte, plantegeu aquestes preguntes en grup: Quin ha estat el pas més difícil? Per què? Si haguéssiu de tornar a començar, què faríeu diferent? Com heu utilitzat la descomposició per resoldre el problema?",
        ]
    }
};

// =================================================================================
// 3. EL GENERADOR (El cervell que connecta tot)
// =================================================================================
const activityGenerator = {
    getNivellComplet(userInput) { /* ... (el mateix codi d'abans) ... */ },

    selectCurriculumElements(userInput) {
        const { level } = userInput;
        const data = curriculumData[level];
        if (!data) return { competencies: "", criteria: "", sabers: "", decret: "" };

        const competencies = data.competencies.map(c => `<li><strong>${c.id}:</strong> ${c.text}</li>`).join('');
        const criteria = data.criterisAvaluacio.map(c => `<li>${c}</li>`).join('');
        const sabers = data.sabers.map(s => `<li>${s}</li>`).join('');

        return {
            competencies: `<ul>${competencies}</ul>`,
            criteria: `<ul>${criteria}</ul>`,
            sabers: `<ul>${sabers}</ul>`,
            decret: data.decret
        };
    },
    
    selectChallenge(userInput) {
        const { level, material, concept } = userInput;
        let challenge;

        // 1. Busquem reptes específics per al nivell i material
        if (activityBank[level] && activityBank[level].challenges) {
            challenge = activityBank[level].challenges.find(c => c.material === material);
        }
        
        // 2. Si no en trobem, busquem un repte per defecte
        if (!challenge) {
            challenge = activityBank.default.challenges.find(c => c.material === 'default');
        }

        let challengeText = challenge.text.replace('{material}', material).replace('{concept}', concept);
        return `<h4>Repte Proposat amb ${material}</h4><p>${challengeText}</p>`;
    },

    generate(userInput) {
        const { subject, concept, duration } = userInput;
        
        const nivellComplet = this.getNivellComplet(userInput);
        const curriculum = this.selectCurriculumElements(userInput);
        const challengeHTML = this.selectChallenge(userInput);

        // Agafem una introducció i avaluació genèriques (es pot millorar més endavant)
        const intro = activityBank.default.introductions[Math.floor(Math.random() * activityBank.default.introductions.length)]
                        .replace('{subject}', subject).replace('{concept}', concept);
        const evalText = activityBank.default.evaluation[0];

        // Construïm l'HTML final
        return `
            <h2>Proposta d'Activitat: ${concept} a ${subject}</h2>
            <p><strong>Nivell:</strong> ${nivellComplet} | <strong>Durada estimada:</strong> ${duration}</p>
            
            <h3>a) Marc Curricular (${curriculum.decret})</h3>
            <p>Aquesta activitat està dissenyada per treballar les següents <strong>competències específiques</strong>:</p>
            ${curriculum.competencies}
            <p>Per fer-ho, es mobilitzaran els següents <strong>sabers</strong>:</p>
            ${curriculum.sabers}
            
            <h3>b) Introducció</h3>
            <p>${intro}</p>

            <h3>c) Descripció del Desafiament</h3>
            ${challengeHTML}
            
            <h3>d) Reflexió i Avaluació</h3>
            <p>Per avaluar l'assoliment, podem utilitzar els següents <strong>criteris d'avaluació</strong> com a guia:</p>
            ${curriculum.criteria}
            <p>A més, podem plantejar preguntes per a la reflexió en grup:</p>
            <p><em>${evalText}</em></p>
        `;
    }
};

// No oblidis mantenir aquesta funció
activityGenerator.getNivellComplet = function(userInput) {
    const { level, cycle_primary, cycle_secondary } = userInput;
    let nivellText;
    switch (level) { case 'infantil': nivellText = 'Educació Infantil'; break; case 'primaria': nivellText = 'Educació Primària'; break; case 'secundaria': nivellText = 'Educació Secundària'; break; default: nivellText = 'Nivell no especificat'; }
    if (cycle_primary) { switch (cycle_primary) { case 'primaria_inicial': nivellText += ', Cicle Inicial'; break; case 'primaria_mitja': nivellText += ', Cicle Mitjà'; break; case 'primaria_superior': nivellText += ', Cicle Superior'; break; } }
    if (cycle_secondary) { switch (cycle_secondary) { case 'eso_1_2': nivellText += ', 1r i 2n d\'ESO'; break; case 'eso_3_4': nivellText += ', 3r i 4t d\'ESO'; break; } }
    return nivellText;
};
