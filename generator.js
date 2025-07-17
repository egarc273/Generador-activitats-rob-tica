// =================================================================================
// 1. BASE DE DADES CURRICULAR
// =================================================================================
const curriculumData = {
    infantil: {
        decret: "DECRET 21/2023, de 7 de febrer (Segon Cicle)",
        competencies: [ /* ... (les 8 competències es mantenen) ... */ ],
        criterisAvaluacio: [ /* ... (els criteris es mantenen) ... */ ],
        sabers: [ /* ... (la llista de sabers es manté) ... */ ]
    },
    // ...
};

// =================================================================================
// 2. NOU BANC D'IDEES BASAT EN COMPONENTS
// =================================================================================
const activityBank = {
    infantil: {
        // Estructura base d'una sessió. El repte s'inserirà aquí.
        base_structure: [
            "<strong>Sessió 1: Conversa inicial (Activació).</strong> En rotllana, activem els coneixements previs sobre el concepte de <strong>'{concept}'</strong>. Què en sabem? Què ens imaginem? Utilitzem imatges o objectes reals per estimular el diàleg.",
            "<strong>Sessió 2: Exploració del material.</strong> En petits grups, els infants exploren lliurement el robot <strong>{material}</strong> per familiaritzar-se amb les seves funcions bàsiques (moviment, llums, sons).",
            "<strong>Sessió 3: El Repte (Aplicació).</strong> Presentem el repte central de l'activitat. En grups, planifiquen una solució, la programen al robot i la proven. L'assaig-error és una part clau del procés.",
            "<strong>Sessió 4: Què hem après? (Posada en comú).</strong> Cada grup mostra la seva creació a la resta. Expliquen què fa el robot, les dificultats que han trobat i com les han solucionat."
        ],
        // --> AQUESTA ÉS LA PART CLAU: un banc de reptes etiquetats
        challenge_ideas: [
            // Repte ESPECÍFIC per a Hàbits Saludables amb Tale-bot
            {
                saber_key: "vida_saludable",
                material: "talebot",
                title: "La Cistella Saludable",
                description: "Una activitat on els infants programen el Tale-Bot per 'recollir' només els aliments saludables d'un mapa i portar-los a la cistella.",
                challenge_text: "En un mapa del supermercat dibuixat a terra, hi ha imatges d'aliments saludables (poma, pastanaga) i no saludables (pastís, llaminadures). Hem de programar el Tale-Bot perquè faci un recorregut que passi NOMÉS per sobre dels aliments saludables i els porti fins a la 'cistella de la compra'."
            },
            // Repte ESPECÍFIC per a Matemàtiques amb Tale-bot
            {
                saber_key: "llenguatge_matematic",
                material: "talebot",
                title: "El Robot Comptador",
                description: "Una activitat per practicar el recompte i l'associació número-quantitat.",
                challenge_text: "En un tapís hi ha diferents grups de gomets (un grup amb 2, un amb 3, un amb 4). Al costat, hi ha targetes amb els números 2, 3 i 4. El repte és programar el Tale-Bot per anar des de la targeta del número fins al grup de gomets corresponent."
            },
            // Repte GENÈRIC per a Tale-bot si no es troba un de més específic
            {
                saber_key: "generic",
                material: "talebot",
                title: "El Viatge del Robot Explorador",
                description: "Una activitat d'iniciació a la programació seqüencial on els infants han de guiar un robot a través d'un mapa per assolir un objectiu.",
                challenge_text: "En un mapa d'un bosc, un poble o una illa del tresor, hem de programar el Tale-Bot perquè vagi des del punt de sortida fins a l'arribada, evitant els obstacles."
            }
        ],
        // Idees de preparació vinculades als sabers
        preparation_ideas: {
            "vida_saludable": {
                vocabulary: ["Fruita", "Verdura", "Sa", "Sucre", "Vitamines", "Aigua"],
                visuals: "Preparar targetes o imatges reals d'aliments variats. Es pot dibuixar un plat saludable o una piràmide alimentària simple per a l'aula."
            },
            "llenguatge_matematic": {
                vocabulary: ["Número", "Comptar", "Quantitat", "Grup", "Més", "Menys"],
                visuals: "Crear targetes grans amb els números (grafia). Utilitzar gomets de colors, taps d'ampolla o altres elements petits per fer els conjunts."
            },
            // ... altres sabers ...
        },
        pedagogical_orientations: "El rol del docent és fonamentalment el de <strong>facilitador...</strong> (text sense canvis)"
    }
};

// =================================================================================
// 3. EL GENERADOR (Amb el nou cervell per construir activitats)
// =================================================================================
const activityGenerator = {
    // ... (getCurricularSabers i getNivellComplet sense canvis) ...

    generate(userInput) {
        const { level, material, duration, subject: sabersSeleccionats, concept } = userInput;
        const curriculum = curriculumData[level];
        if (!curriculum) return "<div>Error: Dades curriculars no trobades.</div>";

        // 1. SELECCIÓ INTEL·LIGENT DEL REPTE
        const normalizedMaterial = material.toLowerCase().replace(/[- ]/g, '');
        let bestChallenge = null;

        // Busquem la millor coincidència: material + un dels sabers seleccionats
        for (const saber of sabersSeleccionats) {
            bestChallenge = activityBank[level]?.challenge_ideas?.find(c => c.material === normalizedMaterial && c.saber_key === saber);
            if (bestChallenge) break; // Hem trobat la millor opció, parem de buscar
        }
        
        // Si no trobem cap repte específic, busquem un de genèric per a aquest material
        if (!bestChallenge) {
            bestChallenge = activityBank[level]?.challenge_ideas?.find(c => c.material === normalizedMaterial && c.saber_key === "generic");
        }
        
        if (!bestChallenge) {
            return `<div class="activity-sheet"><h2>Ho sentim</h2><p>De moment no tenim un pla de lliçó detallat per a <strong>${material}</strong> amb els sabers seleccionats.</p></div>`;
        }

        // 2. Preparar el contingut dinàmic de la fitxa
        const sabersLabels = sabersSeleccionats.map(s => curriculum.sabers.find(cs => cs.value === s)?.label ?? s).join(', ');
        
        // Combinar idees de preparació de tots els sabers seleccionats
        let prepVocabulary = new Set();
        let prepVisuals = new Set();
        sabersSeleccionats.forEach(saberKey => {
            const ideas = activityBank[level]?.preparation_ideas?.[saberKey];
            if (ideas) {
                ideas.vocabulary?.forEach(v => prepVocabulary.add(v));
                if (ideas.visuals) prepVisuals.add(ideas.visuals);
            }
        });

        // Construir el desenvolupament de l'activitat inserint el repte escollit
        const developmentHTML = activityBank[level].base_structure.map((step, index) => {
            let stepText = step.replace(/{material}/g, material).replace(/{concept}/g, `<strong>${concept}</strong>`);
            // Inserim el text del repte específic en el pas 3
            if (index === 2) { 
                stepText = stepText.replace("Presentem el repte central de l'activitat.", `Presentem el repte <strong>'${bestChallenge.title}'</strong>: ${bestChallenge.challenge_text}`);
            }
            return `<div class="fase"><p><strong>Pas ${index + 1}:</strong> ${stepText}</p></div>`;
        }).join('');

        // Construir la rúbrica (codi anterior, sense canvis)
        let rubricHTML = `...`; // (El codi de la rúbrica es manté)

        // 3. Muntar l'HTML final de la fitxa
        return `
            <div class="activity-sheet">
                <h2>${bestChallenge.title}</h2>
                <p><em>${bestChallenge.description.replace(/{concept}/g, concept)}</em></p>

                <div class="fitxa-tecnica">
                    <p><strong>Nivell:</strong> ${this.getNivellComplet(userInput)}</p>
                    <p><strong>Durada Aprox.:</strong> ${duration}</p>
                    <p><strong>Sabers Principals:</strong> ${sabersLabels}</p>
                </div>

                <h3>1. Objectius d'Aprenentatge</h3>
                <!-- ... -->
                
                <h3>2. Desenvolupament Detallat de l'Activitat</h3>
                ${developmentHTML}

                <h3>3. Orientacions Pedagògiques</h3>
                <p>${activityBank[level].pedagogical_orientations}</p>

                <h3>4. Creació de Material de Suport</h3>
                <div class="preparation-box">
                    <p><strong>Vocabulari clau a treballar:</strong> ${Array.from(prepVocabulary).join(', ')}.</p>
                    <p><strong>Idees per a material visual:</strong> ${Array.from(prepVisuals).join(' ')}</p>
                </div>

                <h3>5. Proposta de Rúbrica d'Avaluació</h3>
                ${rubricHTML}
            </div>
        `;
    }
};

// ... (El codi de la resta de funcions (getNivellComplet, la rúbrica, etc.) ha d'estar aquí complet) ...
