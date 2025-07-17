// ... (codi inicial sense canvis) ...

    // --> MODIFICAT: L'array de preguntes s'ha actualitzat
    const questions = [
        {
            key: 'level',
            text: 'Quin és el nivell educatiu dels estudiants?',
            options: [
                { label: 'Infantil', value: 'infantil' },
                { label: 'Primària', value: 'primaria' },
                { label: 'Secundària', value: 'secundaria' }
            ]
        },
        // ... (preguntes de cicles sense canvis) ...
        {
            key: 'cycle_primary', /* ... */
        },
        {
            key: 'cycle_secondary', /* ... */
        },
        // --> MODIFICAT: La pregunta 'subject' ara és de tipus 'select_dynamic'
        {
            key: 'subject',
            text: 'Sobre quin saber clau del currículum vols centrar l\'activitat?',
            type: 'select_dynamic', // Un nou tipus per a la nostra lògica
            // Les opcions es carregaran des d'una altra font (generator.js)
        },
        {
            key: 'concept',
            text: 'Dins d\'aquest saber, quin concepte específic vols treballar?',
            type: 'text',
            placeholder: 'Ex: El cicle de l\'aigua, Les emocions...'
        },
        // ... (la resta de preguntes sense canvis) ...
        {
            key: 'material', /* ... */
        },
        {
            key: 'duration', /* ... */
        }
    ];

// ... (codi intermig sense canvis) ...

    function showQuestion() {
        // ... (codi inicial de la funció sense canvis) ...

        const question = questions[currentQuestionIndex];
        
        // ... (lògica de condició sense canvis) ...

        let optionsHTML = '';

        // --> NOU: Lògica per a la nostra pregunta dinàmica
        if (question.type === 'select_dynamic') {
            // Obtenim les opcions del currículum que estan a generator.js
            const dynamicOptions = activityGenerator.getCurricularSabers(userAnswers);
            if (dynamicOptions && dynamicOptions.length > 0) {
                optionsHTML = dynamicOptions.map(option => 
                    `<button class="option-button" data-value="${option.value}">${option.label}</button>`
                ).join('');
            } else {
                optionsHTML = `<p>No s'han trobat sabers per a aquest nivell. Si us plau, torna enrere.</p>`;
            }
        } else if (question.type === 'text') {
            optionsHTML = `
                <input type="text" id="text-input" placeholder="${question.placeholder}">
                <button id="submit-text-btn">Següent</button>
            `;
        } else {
            optionsHTML = question.options.map(option => 
                `<button class="option-button" data-value="${option.value}">${option.label}</button>`
            ).join('');
        }
        
        // ... (la resta de la funció 'showQuestion' i altres funcions es mantenen igual) ...
    }

// ... (la resta del fitxer script.js es manté sense canvis) ...
