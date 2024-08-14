const questions = [
    {
        question: "Which subatomic particle has a positive charge?",
        options: ["A) Electron", "B) Neutron", "C) Proton", "D) Positron"],
        answer: "C) Proton"
    },
    {
        question: "Which of the following subatomic particles has approximately the same mass as a proton?",
        options: ["A) Electron", "B) Neutron", "C) Photon", "D) Neutrino"],
        answer: "B) Neutron"
    },
    {
        question: "The charge of an electron is:",
        options: ["A) Positive and equal in magnitude to the charge of a proton", "B) Negative and equal in magnitude to the charge of a proton", "C) Positive and half the magnitude of the charge of a proton", "D) Negative and half the magnitude of the charge of a proton"],
        answer: "B) Negative and equal in magnitude to the charge of a proton"
    },
    {
        question: "The atomic number of an element is defined as:",
        options: ["A) The total number of protons and neutrons in the nucleus", "B) The number of protons in the nucleus", "C) The total number of neutrons in the nucleus", "D) The average mass of an atom"],
        answer: "B) The number of protons in the nucleus"
    },
    {
        question: "An element has an atomic number of 20 and a mass number of 40. The number of neutrons in this element is:",
        options: ["A) 20", "B) 40", "C) 60", "D) 30"],
        answer: "D) 20"
    },
    {
        question: "If an atom has 12 protons and 12 neutrons, its mass number is:",
        options: ["A) 24", "B) 12", "C) 6", "D) 0"],
        answer: "A) 24"
    },
    {
        question: "According to Bohr’s model, electrons are arranged in:",
        options: ["A) Random orbits around the nucleus", "B) Fixed orbits or energy levels", "C) Electron clouds", "D) A continuous spectrum"],
        answer: "B) Fixed orbits or energy levels"
    },
    {
        question: "In Bohr's model, the energy of an electron in an orbit is:",
        options: ["A) Continuous and variable", "B) Quantized and fixed", "C) Dependent on the velocity of the electron", "D) Indeterminate"],
        answer: "B) Quantized and fixed"
    },
    {
        question: "Bohr's model of the atom explains the:",
        options: ["A) Formation of covalent bonds", "B) Chemical reactivity of elements", "C) Line spectra of elements", "D) Exact positions of electrons in an atom"],
        answer: "C) Line spectra of elements"
    },
    {
        question: "According to the photon theory, electromagnetic radiation:",
        options: ["A) Consists of particles called photons", "B) Is made up of electrons and protons", "C) Has only wave properties", "D) Is a continuous stream of energy"],
        answer: "A) Consists of particles called photons"
    },
    {
        question: "The energy of a photon is directly proportional to its:",
        options: ["A) Wavelength", "B) Speed", "C) Frequency", "D) Mass"],
        answer: "C) Frequency"
    },
    {
        question: "Which phenomenon demonstrates the wave-particle duality of electromagnetic radiation?",
        options: ["A) Photoelectric effect", "B) Rutherford gold foil experiment", "C) Balmer series", "D) Bohr’s model"],
        answer: "A) Photoelectric effect"
    },
    {
        question: "In an atom of carbon-14, which has 6 protons and 8 neutrons, what is the mass number?",
        options: ["A) 6", "B) 14", "C) 8", "D) 20"],
        answer: "B) 14"
    },
    {
        question: "Which of the following particles is not considered a subatomic particle?",
        options: ["A) Proton", "B) Neutron", "C) Electron", "D) Neutrino"],
        answer: "D) Neutrino"
    },
    {
        question: "According to Bohr’s model, an electron in the nth orbit has an energy given by:",
        options: [
            "A) E_n = −13.6 / n² eV",
            "B) E_n = 13.6 / n² eV",
            "C) E_n = −13.6 × n² eV",
            "D) E_n = 13.6 × n² eV"
        ],
        answer: "A) E_n = −13.6 / n² eV"
    }
];

let score = 0;
let timer;

function generateQuestions() {
    const form = document.getElementById('quizForm');
    form.innerHTML = ''; // Clear any existing content
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            ${q.options.map((option, i) => `
                <label>
                    <input type="radio" name="q${index}" value="${option}" required>
                    ${option}
                </label>
            `).join('<br>')}
        `;
        form.appendChild(questionDiv);
    });
}

function startTimer() {
    let time = 30 * 60;
    timer = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        document.getElementById('timer').textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (time <= 0) {
            clearInterval(timer);
            document.getElementById('submitBtn').click(); // Automatically submit when time is up
        }
        time--;
    }, 1000);
}

function calculateScore() {
    score = 0;
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedOption && selectedOption.value === q.answer) {
            score++;
        }
    });
    document.getElementById('totalMarks').textContent = `Total Marks: ${score}`;
}

document.getElementById('submitBtn').addEventListener('click', () => {
    calculateScore();
    document.getElementById('result').classList.remove('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
    generateQuestions();
    startTimer();
});

