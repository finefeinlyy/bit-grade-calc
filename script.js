const subjectsData = {
    year1semester1: [
        { name: "CAL I", credits: 4 },
        { name: "EXP ENG I", credits: 3 },
        { name: "FOUND STAT INS IT", credits: 3 },
        { name: "FIN ACCTG", credits: 3 },
        { name: "PROG PROB SOLV", credits: 3 },
    ],
    year1semester2: [
        { name: "CAL II", credits: 4 },
        { name: "EXP ENG II", credits: 3 },
        { name: "OOP", credits: 3 },
        { name: "DATA STRUC", credits: 3 },
        { name: "STAT ANALYSIS I", credits: 4 },
        { name: "STAT THEORY I", credits: 3 }
    ],
    year2semester1: [
        { name: "LINEAR ALGEBRA", credits: 3 },
        { name: "MNGL ACCTG", credits: 3 },
        { name: "STAT ANALYSIS II", credits: 4 },
        { name: "STAT THEORY II", credits: 3 },
        { name: "BAS BUS ENG WRIT", credits: 3 }
    ],
    year2semester2: [
        { name: "DATABASE", credits: 3 },
        { name: "IT INFRASTRUC", credits: 3 },
        { name: "WEB PROGRAMMING", credits: 3 },
        { name: "SAMP SURV RES DSGN", credits: 3 },
        { name: "BUS ENG CORRESP", credits: 3 }
    ],
    year3semester1: [
        { name: "MACHINE LEARNING", credits: 3 },
        { name: "INFO VISUAL", credits: 3 },
        { name: "DATA ACQUI PREP", credits: 3 },
        { name: "INFO SYS ANAL", credits: 3 },
        { name: "COMP NET SEC", credits: 3 },
        { name: "BUS ORAL COMM", credits: 3 }
    ],
    year3semester2: [
        { name: "INFO SYS DSGN", credits: 3 },
        { name: "SEM BUSINESS IT", credits: 3 },
        { name: "ADV BUS ORAL COM", credits: 3 }
    ],
    year4semester1: [
        { name: "SEN PROJ IT BUS", credits: 3 },
        { name: "EFF BUS COM", credits: 3 }
    ]
};

const gradeValues = {
    "A": 4.00,
    "B+": 3.50,
    "B": 3.00,
    "C+": 2.50,
    "C": 2.00,
    "D+": 1.50,
    "D": 1.00,
    "F": 0.00
};

function loadSubjects() {
    const semester = document.getElementById('semester').value;
    const subjectsContainer = document.getElementById('subjects');
    subjectsContainer.innerHTML = '';

    if (semester && subjectsData[semester]) {
        subjectsData[semester].forEach((subject, index) => {
            subjectsContainer.innerHTML += `
                <div class="input-group">
                    <label for="grade${index}">${subject.name} (${subject.credits} credits):</label>
                    <select id="grade${index}" class="grade" data-credits="${subject.credits}">
                        <option value="">--Select Grade--</option>
                        <option value="A">A (4.00)</option>
                        <option value="B+">B+ (3.50)</option>
                        <option value="B">B (3.00)</option>
                        <option value="C+">C+ (2.50)</option>
                        <option value="C">C (2.00)</option>
                        <option value="D+">D+ (1.50)</option>
                        <option value="D">D (1.00)</option>
                        <option value="F">F (0.00)</option>
                    </select>
                </div>
            `;
        });
    }
}

let additionalSubjectIndex = 0;

function addSubject() {
    const additionalSubjectsContainer = document.getElementById('additional-subjects');
    additionalSubjectsContainer.innerHTML += `
        <div class="input-group">
            <input type="text" id="subject-name${additionalSubjectIndex}" placeholder="Subject Name">
            <input type="number" id="subject-credits${additionalSubjectIndex}" placeholder="Credits" step="0.5">
            <select id="subject-grade${additionalSubjectIndex}" class="grade">
                <option value="">--Select Grade--</option>
                <option value="A">A (4.00)</option>
                <option value="B+">B+ (3.50)</option>
                <option value="B">B (3.00)</option>
                <option value="C+">C+ (2.50)</option>
                <option value="C">C (2.00)</option>
                <option value="D+">D+ (1.50)</option>
                <option value="D">D (1.00)</option>
                <option value="F">F (0.00)</option>
            </select>
        </div>
    `;
    additionalSubjectIndex++;
}

function calculateGrade() {
    const grades = document.querySelectorAll('.grade');
    let totalWeightedScore = 0;
    let totalCredits = 0;

    grades.forEach(gradeInput => {
        const grade = gradeInput.value;
        const creditsInput = gradeInput.getAttribute('data-credits') || gradeInput.previousElementSibling.value;
        const credits = parseFloat(creditsInput);

        if (grade && !isNaN(credits)) {
            totalWeightedScore += gradeValues[grade] * credits;
            totalCredits += credits;
        }
    });

    if (totalCredits > 0) {
        const gpa = totalWeightedScore / totalCredits;
        document.getElementById('result').innerText = `GPA: ${gpa.toFixed(2)}`;
    } else {
        document.getElementById('result').innerText = 'Please enter valid grades and credits.';
    }
}

