document.addEventListener('DOMContentLoaded', () => {
    // Referències als elements del DOM
    const questionnaireSection = document.getElementById('questionnaire-section');
    const questionContainer = document.getElementById('question-container');
    const activitySection = document.getElementById('activity-section');
    const activityOutput = document.getElementById('activity-output');
    const progressBar = document.getElementById('progress-bar'); // Encara que no l'usem, el deixem per si de cas
    
    const btnAccept = document.getElementById('btn-accept');
    const btnAdjust = document.getElementById('btn-adjust');
    const btnDownload = document.getElementById('btn-download');
    const downloadControls = document.getElementById('download-controls');
    const feedbackControls = document.getElementById('feedback-controls');

    // Dades de l'aplicació
    let currentQuestionIndex = 0;
    let userAnswers = {};
    let visibleStep = 1;

    // L'array de preguntes complet
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
        {
            key: 'cycle_primary',
            text: 'Quin cicle de Primària?',
            condition: (answers) => answers.level === 'primaria',
            options: [
                { label: 'Cicle Inicial', value: 'primaria_inicial' },
                { label: 'Cicle Mitjà', value: 'primaria_mitja' },
                { label: 'Cicle Superior', value: 'primaria_superior' }
            ]
        },
        {
            key: 'cycle_secondary',
            text: 'Quin cicle de Secundària?',
            condition: (answers) => answers.level === 'secundaria',
            options: [
                { label: '1r i 2n d\'ESO', value: 'eso_1_2' },
                { label: '3r i 4t d\'ESO', value: 'eso_3_4' }
            ]
        },
        {
            key: 'subject',
            text: 'Selecciona tots els sabers que vulguis treballar a l\'activitat:',
            type: 'checkbox',
        },
        {
            key: 'concept',
            text: 'Dins d\'aquests sabers, quin concepte específic vols treballar?',
            type: 'text',
            placeholder: 'Ex: Les estacions de l\'any, Els animals...'
        },
        {
            key: 'material',
            text: 'Amb quin material de robòtica vols treballar?',
            options: [
                { label: 'LEGO Spike Prime', value: 'legospikeprime' }, 
                { label: 'LEGO Spike Essential', value: 'legospikeessential' },
                { label: 'micro:bit', value: 'microbit' },
                { label: 'Scratch', value: 'scratch' },
                { label: 'Tale-bot', value: 'talebot' },
                { label: 'Codey Rocky', value: 'codeyrocky' },
                { label: 'Mbot2', value: 'mbot2' },
                { label: 'Material desendollat', value: 'unplugged' }
            ]
        },
        {
            key: 'duration',
            text: 'Quant de temps vols dedicar a l\'activitat?',
            options: [
                { label: '1 hora', value: '1h' },
                { label: '2 hores', value: '2h' },
                { label: '3 hores', value: '3h' },
                { label: '4 hores o més', value: '4h_plus' }
            ]
        }
    ];
    
    // --> CORRECCIÓ: Simplifiquem la lògica de mostrar la pregunta
    function showQuestion() {
        if (currentQuestionIndex >= questions.length) {
            generateActivity();
            return;
        }
        
        const question = questions[currentQuestionIndex];
        
        // Comprovem si la pregunta s'ha de saltar
        if (question.condition && !question.condition(userAnswers)) {
            currentQuestionIndex++;
            // No incrementem visibleStep aquí, perquè la pregunta no s'ha mostrat
            showQuestion();
            return;
        }

        let optionsHTML = '';

        if (question.type === 'checkbox') {
            const dynamicOptions = activityGenerator.getCurricularSabers(userAnswers);
            optionsHTML = `<div class="checkbox-container">`;
            if (dynamicOptions && dynamicOptions.length > 0) {
                optionsHTML += dynamicOptions.map(option => `
                    <div class="checkbox-item">
                        <input type="checkbox" id="${option.value}" name="subject" value="${option.value}">
                        <label for="${option.value}">${option.label}</label>
                    </div>
                `).join('');
            } else {
                 optionsHTML += `<p>No hi ha sabers definits per a aquest nivell.</p>`;
            }
            optionsHTML += `</div><button id="submit-checkbox-btn" class="option-button">Següent</button>`;
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
        
        questionContainer.innerHTML = `
            <h2>Pas ${visibleStep}</h2>
            <p>${question.text}</p>
            <div class="question-options">${optionsHTML}</div>
        `;
        addEventListenersToOptions();
    }

    function addEventListenersToOptions() {
        if (questions[currentQuestionIndex].type === 'checkbox') {
            document.getElementById('submit-checkbox-btn').addEventListener('click', () => {
                const selectedCheckboxes = document.querySelectorAll('input[name="subject"]:checked');
                const selectedValues = Array.from(selectedCheckboxes).map(cb => cb.value);
                
                if (selectedValues.length > 0) {
                    handleAnswer(selectedValues);
                } else {
                    alert("Has de seleccionar almenys un saber.");
                }
            });
        } else if (questions[currentQuestionIndex].type === 'text') {
            const input = document.getElementById('text-input');
            const submitBtn = document.getElementById('submit-text-btn');
            submitBtn.addEventListener('click', () => {
                if (input.value.trim()) handleAnswer(input.value.trim());
            });
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && input.value.trim()) handleAnswer(input.value.trim());
            });
        } else {
            document.querySelectorAll('.option-button').forEach(button => {
                button.addEventListener('click', () => {
                    handleAnswer(button.dataset.value);
                });
            });
        }
    }
    
    function handleAnswer(answer) {
        const questionKey = questions[currentQuestionIndex].key;
        userAnswers[questionKey] = answer;
        currentQuestionIndex++;
        visibleStep++; // Només incrementem el pas visible quan s'ha respost una pregunta
        showQuestion();
    }
    
    function generateActivity() {
        questionnaireSection.classList.add('hidden');
        activitySection.classList.remove('hidden');
        const activityHTML = activityGenerator.generate(userAnswers);
        activityOutput.innerHTML = activityHTML;
    }
    
    function resetAndRestart() {
        currentQuestionIndex = 0;
        userAnswers = {};
        visibleStep = 1;
        activitySection.classList.add('hidden');
        questionnaireSection.classList.remove('hidden');
        feedbackControls.classList.remove('hidden');
        downloadControls.classList.add('hidden');
        showQuestion();
    }

    btnAccept.addEventListener('click', () => {
        feedbackControls.classList.add('hidden');
        downloadControls.classList.remove('hidden');
        activityOutput.style.border = '2px solid green';
    });

    btnAdjust.addEventListener('click', () => {
        alert("Aquesta funció et permetria ajustar la proposta. De moment, reiniciarem el procés.");
        resetAndRestart();
    });

    btnDownload.addEventListener('click', () => {
        window.print();
    });

    // Iniciar l'aplicació
    showQuestion();
});
