// =================================================================================
// 1. BASE DE DADES CURRICULAR (Amb criteris vinculats a competències)
// =================================================================================
const curriculumData = {
    infantil: {
        decret: "DECRET 21/2023, de 7 de febrer (Segon Cicle)",
        competencies: [
            { id: "CH_CE1", area: "Creixement en Harmonia", text: "Progressar en el coneixement i domini del seu cos..." },
            { id: "CH_CE2", area: "Creixement en Harmonia", text: "Assolir progressivament el benestar emocional..." },
            { id: "CH_CE3", area: "Creixement en Harmonia", text: "Adoptar models, normes i hàbits saludables..." },
            { id: "DE_CE1", area: "Descobriment i Exploració de l'Entorn", text: "Identificar les característiques d'objectes i materials..." },
            { id: "DE_CE2", area: "Descobriment i Exploració de l'Entorn", text: "Desenvolupar el pensament científic..." },
            { id: "DE_CE3", area: "Descobriment i Exploració de l'Entorn", text: "Iniciar-se en el pensament computacional..." },
            { id: "CR_CE1", area: "Comunicació i Representació", text: "Manifestar interès per interactuar..." },
            { id: "CR_CE2", area: "Comunicació i Representació", text: "Interpretar i comprendre missatges i representacions..." },
        ],
        // --> MODIFICAT: Els criteris ara estan vinculats a una competència
        criterisAvaluacio: [
            { linked_competency: "DE_CE2", text: "Provar diferents solucions per fer front a un repte, observant els resultats obtinguts i explicant què ha passat." },
            { linked_competency: "DE_CE3", text: "Proposar seqüències ordenades d'accions i instruccions per resoldre tasques senzilles." },
            { linked_competency: "DE_CE1", text: "Utilitzar jocs i materials digitals i manipulables per a la creació, la comunicació i l'aprenentatge." },
            { linked_competency: "CR_CE1", text: "Expressar oralment idees i sentiments per construir un discurs emergent." }
        ],
        sabers: [
            // ... (llista completa de sabers sense canvis) ...
        ]
    },
    primaria: { /* ... */ },
    secundaria: { /* ... */ }
};

// =================================================================================
// 2. BANC DE PLANS DE LLIÇÓ (La nova estructura detallada)
// =================================================================================
const activityBank = {
    infantil: {
        // --> NOU: Cada activitat és un objecte ric amb tots els detalls pedagògics
        "plans_de_llico": [
            {
                material: "talebot",
                title: "El Viatge del Robot Explorador",
                description: "Una activitat d'iniciació a la programació seqüencial on els infants han de guiar un robot a través d'un mapa per assolir diferents objectius relacionats amb un concepte treballat a l'aula.",
                development_steps: [
                    "<strong>Sessió 1: El Mapa del Tresor (Activació).</strong> En rotllana, presentem un mapa gran a terra. Preguntem: 'Com podem anar de la muntanya al riu?'. Els infants donen instruccions oralment ('endavant', 'gira'). Un infant fa de 'robot humà' i segueix les ordres. Això ens permet introduir el concepte de donar ordres precises.",
                    "<strong>Sessió 2: Coneixem el Tale-Bot (Exploració).</strong> En petits grups, els infants exploren lliurement el robot. Descobreixen els botons de direcció, so, etc. El docent els anima a fer-lo moure, preguntant 'Què passa si prems aquest botó?'. L'objectiu és que es familiaritzin amb la màquina.",
                    "<strong>Sessió 3: El Repte del {concept} (Aplicació).</strong> Presentem el repte: 'El nostre robot ha de visitar tots els llocs del mapa relacionats amb {concept}. Hem de programar-lo per fer-ho!'. En grups, planifiquen la ruta amb targetes d'ordres i després la introdueixen al Tale-Bot. S'utilitza l'assaig-error per corregir el codi.",
                    "<strong>Sessió 4: Mostrem el nostre viatge (Posada en comú).</strong> Cada grup mostra a la resta el camí que ha programat. Expliquen les dificultats que han trobat i com les han solucionat. Es poden fer fotos o vídeos per al portafolis digital del grup."
                ],
                material_ideas: {
                    vocabulary: ["Seqüència", "Ordre", "Instrucció", "Endavant", "Enrere", "Girar", "Error", "Solució", "Programa"],
                    visuals: "Crear un tapís gran per a terra amb dibuixos clars (un bosc, una ciutat, el mar). Preparar targetes grans amb fletxes (↑ → ← ↓) que els infants puguin utilitzar per planificar la ruta abans de programar."
                },
                pedagogical_orientations: "El rol del docent és fonamentalment el de <strong>facilitador de l'aprenentatge</strong>. Cal crear un ambient de confiança on l'error es vegi com una oportunitat per aprendre. En lloc de donar solucions, el docent ha de fer <strong>preguntes estratègiques</strong> ('Què creieu que passarà ara?', 'Per què el robot no ha fet el que esperàveu?', 'Quina altra manera podríem provar?'). L'agrupació en petits grups fomenta la comunicació i l'intercanvi d'idees entre iguals."
            },
            // --> AQUÍ AFEGIRIES MÉS PLANS DE LLIÇÓ PER A ALTRES MATERIALS
        ]
    }
};

// =================================================================================
// 3. EL GENERADOR (construeix la fitxa pedagògica completa)
// =================================================================================
const activityGenerator = {
    getCurricularSabers(userInput) { /* ... (sense canvis) ... */ },
    getNivellComplet(userInput) { /* ... (sense canvis) ... */ },

    generate(userInput) {
        const { level, material, duration, subject: sabersSeleccionats, concept } = userInput;
        const curriculum = curriculumData[level];
        if (!curriculum) return "<div>Error: Dades curriculars no trobades.</div>";

        // 1. Trobar el pla de lliçó adequat per al material
        const normalizedMaterial = material.toLowerCase().replace(/[- ]/g, '');
        const plan = activityBank[level]?.plans_de_llico?.find(p => p.material === normalizedMaterial);

        if (!plan) {
            return `<div class="activity-sheet"><h2>Ho sentim</h2><p>De moment no tenim un pla de lliçó detallat per a <strong>${material}</strong>. Estem treballant per afegir-ne més!</p></div>`;
        }
        
        // 2. Preparar el contingut dinàmic de la fitxa
        const sabersLabels = (sabersSeleccionats || []).map(saberKey => {
            return curriculum.sabers.find(s => s.value === saberKey)?.label ?? saberKey;
        }).join(', ');
        
        const dynamicObjectives = [
            `Planificar i executar seqüències d'accions per resoldre un repte senzill.`,
            `Aplicar el pensament lògic per dissenyar una solució a un problema donat.`,
            `Comunicar idees i estratègies en petit grup.`,
            `Desenvolupar la resiliència davant l'error, entenent-lo com a part del procés d'aprenentatge.`
        ];
        
        // 3. Construir la Rúbrica d'Avaluació Dinàmica
        let rubricHTML = `
            <table class="rubric-table">
                <thead>
                    <tr>
                        <th>Criteri d'Avaluació</th>
                        <th>Nivell d'Assoliment</th>
                    </tr>
                </thead>
                <tbody>`;
        
        curriculum.criterisAvaluacio.forEach(criteri => {
            const competenciaRelacionada = curriculum.competencies.find(comp => comp.id === criteri.linked_competency);
            rubricHTML += `
                <tr>
                    <td>
                        <p><strong>${criteri.text}</strong></p>
                        <p class="curricular-note"><em>(Relacionat amb la competència: ${competenciaRelacionada?.text.substring(0, 40)}...)</em></p>
                    </td>
                    <td>
                        <div class="rubric-levels">
                            <span>Iniciat</span>
                            <span>En procés</span>
                            <span>Assolit</span>
                        </div>
                    </td>
                </tr>`;
        });
        rubricHTML += `</tbody></table>`;
        
        // 4. Muntar l'HTML final de la fitxa completa
        return `
            <div class="activity-sheet">
                <h2>${plan.title.replace('{concept}', concept)}</h2>
                <p><em>${plan.description.replace('{concept}', concept)}</em></p>

                <div class="fitxa-tecnica">
                    <p><strong>Nivell:</strong> ${this.getNivellComplet(userInput)}</p>
                    <p><strong>Durada Aprox.:</strong> ${duration}</p>
                    <p><strong>Sabers Principals:</strong> ${sabersLabels}</p>
                </div>

                <h3>1. Objectius d'Aprenentatge</h3>
                <ul>${dynamicObjectives.map(obj => `<li>${obj}</li>`).join('')}</ul>

                <h3>2. Desenvolupament Detallat de l'Activitat</h3>
                ${plan.development_steps.map((step, index) => `<div class="fase"><p><strong>Pas ${index + 1}:</strong> ${step.replace(/{concept}/g, `<strong>${concept}</strong>`)}</p></div>`).join('')}

                <h3>3. Orientacions Pedagògiques</h3>
                <p>${plan.pedagogical_orientations}</p>

                <h3>4. Creació de Material de Suport</h3>
                <div class="preparation-box">
                    <p><strong>Vocabulari clau a treballar:</strong> ${plan.material_ideas.vocabulary.join(', ')}.</p>
                    <p><strong>Idees per a material visual:</strong> ${plan.material_ideas.visuals}</p>
                </div>

                <h3>5. Proposta de Rúbrica d'Avaluació</h3>
                <p>Aquesta rúbrica serveix com a guia per a l'observació directa durant l'activitat. Està basada en els criteris d'avaluació del <strong>${curriculum.decret}</strong>.</p>
                ${rubricHTML}
            </div>
        `;
    }
};
