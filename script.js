document.addEventListener('DOMContentLoaded', () => {
    // ... (referències al DOM sense canvis) ...
    let currentQuestionIndex = 0;
    let userAnswers = {};
    let visibleStep = 1;

    // --> L'estructura de preguntes canvia per adaptar-se a la selecció múltiple
    const questions = [
        { key: 'level', /* ... */ },
        { key: 'cycle_primary', /* ... */ },
        { key: 'cycle_secondary', /* ... */ },
        {
            key: 'subject',
            text: 'Selecciona tots els sabers que vulguis treballar a l\'activitat:',
            type: 'checkbox', // NOU TIPUS: Selecció múltiple
        },
        { key: 'concept', /* ... */ },
        { key: 'material', /* ... */ },
        { key: 'duration', /* ... */ }
    ];

    // ... (càlcul de 'totalBaseSteps' sense canvis) ...

    function showQuestion() {
        // ... (lògica inicial sense canvis) ...
        const question = questions[currentQuestionIndex];
        // ... (lògica de condició sense canvis) ...
        let optionsHTML = '';

        if (question.type === 'checkbox') {
            const dynamicOptions = activityGenerator.getCurricularSabers(userAnswers);
            optionsHTML = `<div class="checkbox-container">`;
            optionsHTML += dynamicOptions.map(option => `
                <div class="checkbox-item">
                    <input type="checkbox" id="${option.value}" name="subject" value="${option.value}">
                    <label for="${option.value}">${option.label}</label>
                </div>
            `).join('');
            optionsHTML += `</div><button id="submit-checkbox-btn" class="option-button">Següent</button>`;
        } else if (question.type === 'text') {
            // ... (sense canvis)
        } else {
            // ... (sense canvis)
        }
        
        // ... (la resta de 'showQuestion' sense canvis) ...
    }

    function addEventListenersToOptions() {
        // --> NOU: Event listener per al botó de la selecció múltiple
        if (questions[currentQuestionIndex].type === 'checkbox') {
            document.getElementById('submit-checkbox-btn').addEventListener('click', () => {
                const selectedCheckboxes = document.querySelectorAll('input[name="subject"]:checked');
                const selectedValues = Array.from(selectedCheckboxes).map(cb => cb.value);
                
                if (selectedValues.length > 0) {
                    handleAnswer(selectedValues); // Passem un array de valors
                } else {
                    // Opcional: Mostrar un avís si no se selecciona res
                    alert("Has de seleccionar almenys un saber.");
                }
            });
        } else if (questions[currentQuestionIndex].type === 'text') {
            // ... (sense canvis)
        } else {
            // ... (sense canvis)
        }
    }
    
    // ... (la resta de funcions es mantenen iguals) ...
});
