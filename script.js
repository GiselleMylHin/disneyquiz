const questions = [
    {
        question: "1. How do you approach a group project?",
        options: [
            { text: "I naturally step into a leadership role, organizing tasks and setting deadlines to keep the team on track.", value: "a" },
            { text: "I love to unleash my creativity, brainstorming innovative ideas and encouraging others to think outside the box.", value: "b" },
            { text: "I focus on team morale, ensuring everyone is having fun and feels included in the process.", value: "c" },
            { text: "I meticulously analyze every detail, making sure our work is accurate and up to standard.", value: "d" },
            { text: "I thrive on exploration, suggesting new approaches and unconventional strategies to tackle challenges.", value: "e" },
            { text: "I prefer to support others, taking cues from the group's direction and helping wherever I can.", value: "f" },
        ]
    },
    {
        question: "2. What is your ideal way to spend a Saturday?",
        options: [
            { text: "Volunteering at a local shelter, making a positive impact in my community.", value: "a" },
            { text: "Diving into a new artistic endeavor, whether it’s painting, crafting, or playing music.", value: "b" },
            { text: "Embarking on an exciting adventure with friends, like hiking a new trail or visiting an amusement park.", value: "c" },
            { text: "Perfecting a personal project, whether it’s building something or diving into a technical task.", value: "d" },
            { text: "Discovering a hidden gem in the city, exploring new shops, parks, or cultural sites.", value: "e" },
            { text: "Unwinding with a cozy book or movie marathon, enjoying a laid-back day at home.", value: "f" },
        ]
    },
    {
        question: "3. When faced with a challenge, how do you respond?",
        options: [
            { text: "I dive right in, tackling the problem head-on with determination and confidence.", value: "a" },
            { text: "I think creatively, envisioning multiple solutions and considering all possibilities.", value: "b" },
            { text: "I rally my friends, bringing them together to brainstorm ideas and tackle the issue as a team.", value: "c" },
            { text: "I break down the situation into manageable parts, analyzing each aspect carefully.", value: "d" },
            { text: "I see challenges as opportunities for growth and innovation, embracing the chance to learn.", value: "e" },
            { text: "I remain calm and composed, weighing my options and making a well-thought-out decision.", value: "f" },
        ]
    },
    {
        question: "4. How do you handle stress?",
        options: [
            { text: "I make a detailed to-do list, prioritizing tasks to regain control and clarity.", value: "a" },
            { text: "I channel my feelings into creative outlets like writing or art, expressing myself through various mediums.", value: "b" },
            { text: "I go for a refreshing walk or engage in physical activity to clear my mind and boost my mood.", value: "c" },
            { text: "I analyze what’s stressing me out, breaking it down into smaller, manageable pieces.", value: "d" },
            { text: "I use stress as a motivator, pushing myself to work harder and achieve my goals.", value: "e" },
            { text: "I reach out to friends or family for support, discussing my feelings and seeking advice.", value: "f" },
        ]
    },
    {
        question: "5. What does your perfect day look like?",
        options: [
            { text: "A fulfilling day spent helping others, making a difference in my community.", value: "a" },
            { text: "A whirlwind of creativity, filled with painting, crafting, or any artistic endeavor.", value: "b" },
            { text: "An exhilarating day of adventure with friends, filled with laughter and new experiences.", value: "c" },
            { text: "A focused day working on personal projects, diving deep into my interests and hobbies.", value: "d" },
            { text: "A spontaneous day filled with surprises, exploring new places and trying new things.", value: "e" },
            { text: "A cozy, relaxing day at home, complete with my favorite books, movies, and snacks.", value: "f" },
        ]
    },
];

const characters = {
    a: {
        name: "Mickey Mouse",
        description: "You are a natural leader who brings people together and ensures everyone is working toward a common goal! You thrive in environments where you can organize and motivate others.",
        recommendations: ["Minnie Mouse", "Goofy"]
    },
    b: {
        name: "Minnie Mouse",
        description: "You are creative and have a knack for encouraging others to express themselves. You thrive on collaboration and innovative ideas, making you a beloved team member.",
        recommendations: ["Mickey Mouse", "Daisy Duck"]
    },
    c: {
        name: "Goofy",
        description: "You love to have fun and keep the energy high! You enjoy teamwork and believe that laughter is the best ingredient for success, bringing joy to those around you.",
        recommendations: ["Minnie Mouse", "Donald Duck"]
    },
    d: {
        name: "Donald Duck",
        description: "You have a strong work ethic and pay attention to every detail. You like to ensure everything is done right and hold your team to high standards, often pushing for excellence.",
        recommendations: ["Daisy Duck", "Pluto"]
    },
    e: {
        name: "Pluto",
        description: "You are adventurous and loyal, always ready to explore new ideas and support your friends along the way! Your playful spirit makes you a joy to be around.",
        recommendations: ["Goofy", "Mickey Mouse"]
    },
    f: {
        name: "Daisy Duck",
        description: "You are calm and collected, providing steady support to your team. You value collaboration and appreciate a thoughtful approach to problem-solving, ensuring harmony in the group.",
        recommendations: ["Donald Duck", "Minnie Mouse"]
    },
};

let currentQuestionIndex = 0;
const answers = {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
};

const introSection = document.getElementById('intro');
const quizSection = document.getElementById('quiz');
const questionContainer = document.getElementById('question-container');
const nextButton = document.getElementById('next-button');
const backButton = document.getElementById('back-button');
const progressBar = document.getElementById('progress');
const resultContainer = document.getElementById('result');
const characterInfoContainer = document.getElementById('character-info');
const recommendationsContainer = document.getElementById('recommendations');
const charactersLinkContainer = document.getElementById('characters-link');
const restartButton = document.getElementById('restart-button');
const charactersProfilesContainer = document.getElementById('character-profiles-container');
const backToQuizButton = document.getElementById('back-to-quiz');

// Start Quiz
document.getElementById('start-button').addEventListener('click', () => {
    introSection.style.display = 'none';
    quizSection.style.display = 'block';
    loadQuestion();
});

// Load Question
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        ${question.options.map(option => `
            <input type="radio" name="answer" value="${option.value}" id="${option.value}" required>
            <label for="${option.value}">${option.text}</label><br>
        `).join('')}
    `;

    updateProgressBar();
    updateNavigationButtons();
}

// Update Progress Bar
function updateProgressBar() {
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// Update Navigation Buttons
function updateNavigationButtons() {
    backButton.disabled = currentQuestionIndex === 0;
    nextButton.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline';
    document.getElementById('submit-button').style.display = currentQuestionIndex === questions.length - 1 ? 'inline' : 'none';
}

// Navigate Questions
nextButton.addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        answers[selectedOption.value]++;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        }
    }
});

// Show Result
function showResult() {
    const maxAnswer = Object.keys(answers).reduce((a, b) => answers[a] > answers[b] ? a : b);
    const character = characters[maxAnswer];
    resultContainer.innerText = `You are most like: ${character.name}!`;
    characterInfoContainer.innerText = character.description;

    recommendationsContainer.innerHTML = `
        <strong>You could work well with:</strong>
        <ul>
            ${character.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
    `;

    // Show result and character info
    resultContainer.style.display = 'block';
    characterInfoContainer.style.display = 'block';
    recommendationsContainer.style.display = 'block';
    charactersLinkContainer.style.display = 'block';
    restartButton.style.display = 'block';
    quizSection.style.display = 'none';
}

// Submit Button Event Listener
document.getElementById('submit-button').addEventListener('click', () => {
    showResult();
});

// Show Character Profiles
function showCharacterProfiles() {
    const profiles = Object.values(characters).map(character => `
        <div class="profile">
            <h3>${character.name}</h3>
            <p>${character.description}</p>
        </div>
    `).join('');

    charactersProfilesContainer.innerHTML = profiles;
    charactersProfilesContainer.style.display = 'block';
    document.getElementById('characters-profiles').style.display = 'block';
}

// View Other Character Profiles
document.getElementById('view-characters-button').addEventListener('click', () => {
    charactersLinkContainer.style.display = 'none';
    quizSection.style.display = 'none';
    showCharacterProfiles();
});

// Back to Quiz
backToQuizButton.addEventListener('click', () => {
    charactersProfilesContainer.style.display = 'none';
    document.getElementById('characters-profiles').style.display = 'none';
    quizSection.style.display = 'block';
});

// Restart Quiz
restartButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    Object.keys(answers).forEach(key => answers[key] = 0);
    resultContainer.innerText = '';
    characterInfoContainer.innerText = '';
    recommendationsContainer.innerText = '';
    restartButton.style.display = 'none';
    charactersLinkContainer.style.display = 'none';
    quizSection.style.display = 'none';
    introSection.style.display = 'block';
});

loadQuestion();
