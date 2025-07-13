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

    const questions = [
        {
            key: 'level',
            text: 'Quin és el nivell educatiu dels estudiants?',
            options: ['Infantil', 'Primària', 'Secundària']
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
            options: ['LEGO Spike Prime', 'LEGO Spike Essential', 'micro:bit', 'Scratch', 'Tale-bot', 'Codey Rocky', 'Mbot2', 'Material desendollat']
        },
        {
            key: 'duration',
            text: 'Quant de temps vols dedicar a l\'activitat?',
            options: ['1 hora', '2 hores', '3 hores', '4 hores o més']
        }
    ];

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            let optionsHTML = '';

            if (question.type === 'text') {
                optionsHTML = `
                    <input type="text" id="text-input" placeholder="${question.placeholder}">
                    <button id="submit-text-btn">Següent</button>
                `;
            } else {
                optionsHTML = question.options.map(option => 
                    `<button class="option-button" data-value="${option}">${option}</button>`
                ).join('');
            }
            
            questionContainer.innerHTML = `
                <h2>Pas ${currentQuestionIndex + 1}/${questions.length}</h2>
                <p>${question.text}</p>
                <div class="question-options">${optionsHTML}</div>
            `;

            updateProgressBar();
            addEventListenersToOptions();
        } else {
            generateActivity();
        }
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
        showQuestion();
    }
    
    function updateProgressBar() {
        const progress = (currentQuestionIndex / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function generateActivity() {
        // Ocultar qüestionari i mostrar secció d'activitat
        questionnaireSection.classList.add('hidden');
        activitySection.classList.remove('hidden');

        // Cridar el generador de contingut
        const activityHTML = activityGenerator.generate(userAnswers);
        activityOutput.innerHTML = activityHTML;
    }

    // Lògica dels botons de feedback i descàrrega
    btnAccept.addEventListener('click', () => {
        feedbackControls.classList.add('hidden');
        downloadControls.classList.remove('hidden');
        activityOutput.style.border = '2px solid green';
    });

    btnAdjust.addEventListener('click', () => {
        alert("Aquesta funció permetria ajustar la proposta. Per exemple, fent-la més simple o complexa. En aquesta demo, tornarem a començar el procés.");
        // Resetejar i tornar a començar
        currentQuestionIndex = 0;
        Object.keys(userAnswers).forEach(key => delete userAnswers[key]);
        activitySection.classList.add('hidden');
        questionnaireSection.classList.remove('hidden');
        feedbackControls.classList.remove('hidden');
        downloadControls.classList.add('hidden');
        showQuestion();
    });

    btnDownload.addEventListener('click', () => {
        window.print();
    });

    // Iniciar l'aplicació
    showQuestion();
});
