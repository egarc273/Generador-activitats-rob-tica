document.addEventListener('DOMContentLoaded', () => {
    // Referències als elements del DOM
    const questionnaireSection = document.getElementById('questionnaire-section');
    const questionContainer = document.getElementById('question-container');
    const activitySection = document.getElementById('activity-section');
    const activityOutput = document.getElementById('activity-output');
    const progressBar = document.getElementById('progress-bar');
    
    const btnAccept = document.getElementById('btn-accept');
    const btnAdjust = document.getElementById('btn-adjust');
    const btnDownload = document.getElementById('btn-download');
    const downloadControls = document.getElementById('download-controls');
    const feedbackControls = document.getElementById('feedback-controls');

    // Dades de l'aplicació
    let currentQuestionIndex = 0;
    let userAnswers = {};
    let visibleStep = 1;

    // AQUESTA ESTRUCTURA ÉS LA PART MÉS IMPORTANT
    // Fixa't que ara les 'options' són objectes amb 'label' (el que veu l'usuari)
    // i 'value' (el valor intern que fem servir per a la lògica).
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
            condition: (answers) => answers.level === 'primaria', // <-- Aquesta condició busca el 'value', no el 'label'
            options: [
                { label: 'Cicle Inicial', value: 'primaria_inicial' },
                { label: 'Cicle Mitjà', value: 'primaria_mitja' },
                { label: 'Cicle Superior', value: 'primaria_superior' }
            ]
        },
        {
            key: 'cycle_secondary',
            text: 'Quin cicle de Secundària?',
            condition: (answers) => answers.level === 'secundaria', // <-- Aquesta condició busca el 'value', no el 'label'
            options: [
                { label: '1r i 2n d\'ESO', value: 'eso_1_2' },
                { label: '3r i 4t d\'ESO', value: 'eso_3_4' }
            ]
        },
        {
            key: 'subject',
            text: 'En quina àrea o matèria vols contextualitzar l\'activitat?',
            type: 'text',
            placeholder: 'Ex: Matemàtiques, Coneixement del Medi...'
        },
        {
            key: 'concept',
            text: 'Hi ha algun concepte específic que vulguis treballar?',
            type: 'text',
            placeholder: 'Ex: Cicle de l\'aigua, Figures geomètriques...'
        },
        {
            key: 'material',
            text: 'Amb quin material de robòtica vols treballar?',
            options: [
                { label: 'LEGO Spike Prime', value: 'lego_spike_prime' }, 
                { label: 'LEGO Spike Essential', value: 'lego_spike_essential' },
                { label: 'micro:bit', value: 'microbit' },
                { label: 'Scratch', value: 'scratch' },
                { label: 'Tale-bot', value: 'tale-bot' },
                { label: 'Codey Rocky', value: 'codey_rocky' },
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
    
    // Calculem el nombre total de passos "base" que sempre es mostraran
    const totalBaseSteps = questions.filter(q => !q.condition).length;

    function showQuestion() {
        if (currentQuestionIndex >= questions.length) {
            generateActivity();
            return;
        }

        const question = questions[currentQuestionIndex];
        
        // Comprovem si la pregunta actual s'ha de saltar
        if (question.condition && !question.condition(userAnswers)) {
            currentQuestionIndex++;
            showQuestion();
            return;
        }

        let optionsHTML = '';

        if (question.type === 'text') {
            optionsHTML = `
                <input type="text" id="text-input" placeholder="${question.placeholder}">
                <button id="submit-text-btn">Següent</button>
            `;
        } else {
            // AQUÍ ÉS ON ES CREA EL BOTÓ. Assegura que el 'data-value' agafa 'option.value'
            optionsHTML = question.options.map(option => 
                `<button class="option-button" data-value="${option.value}">${option.label}</button>`
            ).join('');
        }
        
        // Calculem el nombre total de passos per a la barra de progrés actual
        const totalVisibleSteps = totalBaseSteps + (userAnswers.level === 'primaria' || userAnswers.level === 'secundaria' ? 1 : 0);

        questionContainer.innerHTML = `
            <h2>Pas ${visibleStep}/${totalVisibleSteps}</h2>
            <p>${question.text}</p>
            <div class="question-options">${optionsHTML}</div>
        `;

        updateProgressBar(totalVisibleSteps);
        addEventListenersToOptions();
    }

    function addEventListenersToOptions() {
        if (questions[currentQuestionIndex].type === 'text') {
            const input = document.getElementById('text-input');
            document.getElementById('submit-text-btn').addEventListener('click', () => {
                if (input.value.trim()) {
                    handleAnswer(input.value.trim());
                }
            });
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && input.value.trim()) {
                    handleAnswer(input.value.trim());
                }
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
        visibleStep++; 
        showQuestion();
    }
    
    function updateProgressBar(totalSteps) {
        // La barra de progrés es basa en els passos visibles.
        const progress = ((visibleStep - 1) / totalSteps) * 100;
        progressBar.style.width = `${progress}%`;
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
        progressBar.style.width = '0%';
        showQuestion();
    }

    btnAccept.addEventListener('click', () => {
        feedbackControls.classList.add('hidden');
        downloadControls.classList.remove('hidden');
        activityOutput.style.border = '2px solid green';
    });

    btnAdjust.addEventListener('click', () => {
        alert("Aquesta funció permetria ajustar la proposta. Per exemple, fent-la més simple o complexa. En aquesta demo, tornarem a començar el procés.");
        resetAndRestart();
    });

    btnDownload.addEventListener('click', () => {
        window.print();
    });

    // Iniciar l'aplicació
    showQuestion();
});
