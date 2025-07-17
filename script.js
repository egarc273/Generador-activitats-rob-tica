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
    const userAnswers = {};
    let visibleStep = 1; // --> NOU: Un comptador per als passos que l'usuari realment veu.

    // --> MODIFICAT: L'estructura de preguntes s'ha actualitzat.
    // Ara les opcions són objectes amb 'label' (el que veu l'usuari) i 'value' (el valor intern).
    // S'han afegit preguntes amb una propietat 'condition' per mostrar-les només si es compleix la condició.
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
            condition: (answers) => answers.level === 'primaria', // Només si l'anterior resposta va ser 'primaria'
            options: [
                { label: 'Cicle Inicial', value: 'primaria_inicial' },
                { label: 'Cicle Mitjà', value: 'primaria_mitja' },
                { label: 'Cicle Superior', value: 'primaria_superior' }
            ]
        },
        {
            key: 'cycle_secondary',
            text: 'Quin cicle de Secundària?',
            condition: (answers) => answers.level === 'secundaria', // Només si l'anterior resposta va ser 'secundaria'
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
    
    // --> NOU: Calculem el nombre total de passos que seran visibles per a una millor experiència d'usuari
    const totalVisibleSteps = questions.filter(q => !q.condition).length;


    // --> MODIFICAT: La funció ara gestiona les preguntes condicionals.
    function showQuestion() {
        if (currentQuestionIndex >= questions.length) {
            generateActivity();
            return;
        }

        const question = questions[currentQuestionIndex];
        
        // --> NOU: Comprovem si la pregunta té una condició i si no es compleix.
        // Si no es compleix, ens la saltem i passem a la següent.
        if (question.condition && !question.condition(userAnswers)) {
            currentQuestionIndex++;
            showQuestion(); // Torna a cridar la funció per a la següent pregunta
            return;
        }

        let optionsHTML = '';

        if (question.type === 'text') {
            optionsHTML = `
                <input type="text" id="text-input" placeholder="${question.placeholder}">
                <button id="submit-text-btn">Següent</button>
            `;
        } else {
            // --> MODIFICAT: Ara llegeix 'option.value' i 'option.label' de l'objecte.
            optionsHTML = question.options.map(option => 
                `<button class="option-button" data-value="${option.value}">${option.label}</button>`
            ).join('');
        }
        
        // --> MODIFICAT: Utilitzem el nou comptador de passos visibles.
        questionContainer.innerHTML = `
            <h2>Pas ${visibleStep}/${totalVisibleSteps + (userAnswers.level === 'primaria' || userAnswers.level === 'secundaria' ? 1 : 0) }</h2>
            <p>${question.text}</p>
            <div class="question-options">${optionsHTML}</div>
        `;

        updateProgressBar();
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
        
        // --> NOU: Només incrementem el pas visible si la pregunta s'ha mostrat.
        visibleStep++; 
        
        showQuestion();
    }
    
    function updateProgressBar() {
        // La barra de progrés es basa en l'índex real per ser més precisa.
        const progress = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function generateActivity() {
        questionnaireSection.classList.add('hidden');
        activitySection.classList.remove('hidden');

        // Mostrem les respostes per comprovar que tot s'ha guardat bé
        console.log("Respostes de l'usuari:", userAnswers); 
        
        const activityHTML = activityGenerator.generate(userAnswers);
        activityOutput.innerHTML = activityHTML;
    }

    // --> MODIFICAT: Reseteja també el comptador de pas visible.
    function resetAndRestart() {
        currentQuestionIndex = 0;
        visibleStep = 1; // Reseteja el comptador
        Object.keys(userAnswers).forEach(key => delete userAnswers[key]);
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
        alert("Aquesta funció permetria ajustar la proposta. Per exemple, fent-la més simple o complexa. En aquesta demo, tornarem a començar el procés.");
        resetAndRestart();
    });

    btnDownload.addEventListener('click', () => {
        window.print();
    });

    // Iniciar l'aplicació
    showQuestion();
});
