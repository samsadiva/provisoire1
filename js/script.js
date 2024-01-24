document.addEventListener("DOMContentLoaded", function() {
    fetchQuestions();
    startTimer(20 * 60); // 20 minutes timer
});

let currentQuestion = 0;
let questions = [];

function fetchQuestions() {
    // Use AJAX to fetch questions from the server
    // Replace 'YOUR_SERVER_URL' with the actual URL of your server
    fetch('YOUR_SERVER_URL/process.php')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestion();
        })
        .catch(error => console.error('Error:', error));
}

function displayQuestion() {
    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];

        document.getElementById('question-number').innerText = `Question ${currentQuestion + 1}`;
        document.getElementById('question-container').innerText = question.question_text;

        // Display options
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        for (let option of ['A', 'B', 'C', 'D']) {
            const optionButton = document.createElement('button');
            optionButton.className = 'btn btn-secondary';
            optionButton.innerText = `${option}: ${question['option_' + option.toLowerCase()]}`;

            optionButton.addEventListener('click', function() {
                // Handle option selection
                // Add your logic here
            });

            optionsContainer.appendChild(optionButton);
        }
    } else {
        // Display exam completion message
        document.getElementById('question-number').innerText = 'Exam Completed';
        document.getElementById('question-container').innerText = 'You have completed the exam.';
        document.getElementById('options-container').innerHTML = '';
        document.getElementById('next-btn').style.display = 'none';
    }
}

function startTimer(durationInSeconds) {
    let timerElement = document.getElementById('timer');
    let timer = durationInSeconds, minutes, seconds;

    const countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timerElement.innerHTML = minutes + ':' + seconds;

        if (--timer < 0) {
            clearInterval(countdown);
            // Handle time expiration
            // Add your logic here
        }
    }, 1000);
}

document.getElementById('next-btn').addEventListener('click', function() {
    currentQuestion++;
    displayQuestion();
});
