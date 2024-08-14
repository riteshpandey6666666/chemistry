const questions = [
    {
        question: "In a nucleus where the number of protons is twice the number of neutrons, if the mass number is 84, what is the number of protons in the nucleus?",
        options: ["28", "24", "42", "14"],
        answer: "28"
    },
    {
        question: "Which of the following statements correctly describes the relationship between the mass of a proton and a neutron?",
        options: ["The neutron is heavier than the proton by approximately 0.1 amu.", "The proton is heavier than the neutron by approximately 0.1 amu.", "The neutron and proton have the same mass.", "The neutron is lighter than the proton by approximately 1.0 amu."],
        answer: "The neutron is heavier than the proton by approximately 0.1 amu."
    },
    {
        question: "An isotope of an element has an atomic number of 17 and a mass number of 35. How many neutrons does this isotope have?",
        options: ["18", "17", "35", "52"],
        answer: "18"
    },
    {
        question: "If an element has an atomic number of 11 and has 12 neutrons in its nucleus, what is its mass number?",
        options: ["11", "23", "12", "22"],
        answer: "23"
    },
    {
        question: "In Bohr’s model, which of the following equations correctly represents the energy of an electron in the nth orbit?",
        options: ["En = -13.6 × Z² / n² eV", "En = 13.6 × Z² / n² eV", "En = -13.6 × n² / Z² eV", "En = 13.6 × Z² / n² eV"],
        answer: "En = -13.6 × Z² / n² eV"
    },
    {
        question: "According to Bohr’s model, the radius of the nth orbit is given by which of the following equations?",
        options: ["rn = n² × h² / (4π²me e² Z)", "rn = (4π² me e² Z) / (n² h²)", "rn = (4π² me e² Z) / (n² h²)", "rn = n² Z / h²"],
        answer: "rn = n² × h² / (4π²me e² Z)"
    },
    {
        question: "In the photoelectric effect, the stopping potential (V_s) is directly proportional to which of the following?",
        options: ["The intensity of the incident light", "The frequency of the incident light", "The wavelength of the incident light", "The number of incident photons"],
        answer: "The frequency of the incident light"
    },
    {
        question: "According to de Broglie's hypothesis, the wavelength (λ) of a particle is related to its momentum (p) by which of the following equations?",
        options: ["λ = h / p", "λ = h × p", "λ = p / h", "λ = h × p²"],
        answer: "λ = h / p"
    },
    {
        question: "For a hydrogen atom in the n = 3 energy level, what is the wavelength of the emitted photon when it transitions to the n = 2 level?",
        options: ["656 nm", "486 nm", "434 nm", "410 nm"],
        answer: "486 nm"
    },
    {
        question: "An element emits light with a wavelength of 500 nm when an electron transitions from a higher to a lower energy level. What is the energy of the photon in eV? (Use h = 6.626 × 10⁻³⁴ J·s, c = 3 × 10⁸ m/s, and 1 eV = 1.602 × 10⁻¹⁹ J)",
        options: ["2.48 eV", "3.97 eV", "1.24 eV", "4.96 eV"],
        answer: "2.48 eV"
    },
    {
        question: "Which of the following phenomena cannot be explained by the Bohr model?",
        options: ["The discrete lines in the emission spectra of hydrogen", "The stability of electron orbits", "The fine structure of spectral lines", "The Rydberg formula for spectral lines"],
        answer: "The fine structure of spectral lines"
    },
    {
        question: "What is the principal quantum number (n) of the orbit where the electron has the lowest energy according to the Bohr model?",
        options: ["1", "2", "3", "0"],
        answer: "1"
    },
    {
        question: "Which quantum number describes the shape of the orbital in the Bohr model?",
        options: ["Principal quantum number (n)", "Azimuthal quantum number (l)", "Magnetic quantum number (m_l)", "Spin quantum number (m_s)"],
        answer: "Azimuthal quantum number (l)"
    },
    {
        question: "What is the minimum energy required to ionize a hydrogen atom from its n = 1 state?",
        options: ["13.6 eV", "1.5 eV", "0.85 eV", "3.4 eV"],
        answer: "13.6 eV"
    },
    {
        question: "In the context of the photoelectric effect, what happens if the frequency of incident light is below the threshold frequency?",
        options: ["Electrons are emitted with higher energy", "Electrons are emitted with lower energy", "No electrons are emitted regardless of light intensity", "Electrons are emitted with the same energy as the light frequency"],
        answer: "No electrons are emitted regardless of light intensity"
    }
];

let score = 0;
let timer;
let timeLeft = 30 * 60; // 30 minutes in seconds

function generateQuestions() {
    const form = document.getElementById('quizForm');
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        
        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${q.question}`;
        questionDiv.appendChild(questionText);
        
        q.options.forEach(option => {
            const optionLabel = document.createElement('label');
            optionLabel.innerHTML = `
                <input type="radio" name="q${index}" value="${option}">
                ${option}
            `;
            questionDiv.appendChild(optionLabel);
            questionDiv.appendChild(document.createElement('br'));
        });
        
        form.appendChild(questionDiv);
    });
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
            return;
        }
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timer').textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;
    }, 1000);
}

function submitQuiz() {
    clearInterval(timer);
    const form = document.getElementById('quizForm');
    const formData = new FormData(form);
    const entries = Array.from(formData.entries());

    entries.forEach(([name, value]) => {
        const questionIndex = parseInt(name.slice(1)) - 1;
        const correctAnswer = questions[questionIndex].answer;
        if (value === correctAnswer) {
            score += 4;
        } else {
            score -= 1;
        }
    });

    document.getElementById('result').classList.remove('hidden');
    document.getElementById('totalMarks').textContent = `Total Marks: ${score}`;
}

document.getElementById('submitBtn').addEventListener('click', submitQuiz);

generateQuestions();
startTimer();
