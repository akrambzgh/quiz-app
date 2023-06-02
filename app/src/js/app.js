"use strict";
class Quiz {
    constructor(questionInputElements, questionTextElements, suggestedInputElements, addQuestionsSection, suggestedTextElements, answerQuestionsSection, errorText, allInputs) {
        this.questionInputElements = questionInputElements;
        this.questionTextElements = questionTextElements;
        this.suggestedInputElements = suggestedInputElements;
        this.suggestedTextElements = suggestedTextElements;
        this.addQuestionsSection = addQuestionsSection;
        this.answerQuestionsSection = answerQuestionsSection;
        this.errorText = errorText;
        this.allInputs = allInputs;
    }
    updateQuestions() {
        var _a, _b, _c, _d;
        let hasError = false;
        this.allInputs.forEach((input) => {
            if (input.value.trim() === "" || input.value.length <= 5) {
                hasError = true;
                return;
            }
        });
        if (hasError) {
            (_a = this.errorText) === null || _a === void 0 ? void 0 : _a.classList.add("show");
        }
        else {
            (_b = this.errorText) === null || _b === void 0 ? void 0 : _b.classList.remove("show");
        }
        if (!hasError) {
            this.suggestedTextElements.forEach((textElement, index) => {
                textElement.textContent = this.suggestedInputElements[index].value;
            });
            this.questionTextElements.forEach((textElement, index) => {
                textElement.textContent = this.questionInputElements[index].value;
            });
            (_c = this.addQuestionsSection) === null || _c === void 0 ? void 0 : _c.classList.add("hidden");
            (_d = this.answerQuestionsSection) === null || _d === void 0 ? void 0 : _d.classList.remove("hidden");
        }
    }
}
class RadioButton {
    constructor(radioElement) {
        this.radioElement = radioElement;
        this.sectionElement = radioElement.closest(".question-answer");
        this.radioElement.addEventListener("click", this.handleRadioClick.bind(this));
    }
    handleRadioClick() {
        var _a, _b, _c;
        const section = (_a = this.sectionElement) === null || _a === void 0 ? void 0 : _a.getAttribute("data-section");
        const sectionElements = document.querySelectorAll(".questioning-sec .question-answer");
        sectionElements.forEach((element) => element.classList.remove("selected"));
        if (this.radioElement) {
            (_b = this.sectionElement) === null || _b === void 0 ? void 0 : _b.classList.add("selected");
            const selectedInput = (_c = this.sectionElement) === null || _c === void 0 ? void 0 : _c.querySelector(".suggested-answer-input");
            const selectedInputValue = selectedInput === null || selectedInput === void 0 ? void 0 : selectedInput.value;
            console.log(`This Is From ${section}, and This Is The Value: ${selectedInputValue}`);
        }
        else {
            console.log(`Please select one input for ${section}`);
        }
    }
}
class QuestionSection {
    constructor(section) {
        this.section = section;
    }
    handleClick(index) {
        this.section.forEach((section, i) => {
            section.dataset.rightWrong = i === index ? "right" : "wrong";
            section.classList.toggle("right-answer", i === index);
        });
    }
}
class SelectRightAnswer {
    constructor(answerSection, allSections, confirmSection) {
        this.answerSection = answerSection;
        this.allSections = allSections;
        this.confirmSection = confirmSection;
        this.answerSection.addEventListener("click", this.checkRightAnswer.bind(this));
        this.allSections.forEach((section, index) => {
            section.addEventListener("click", () => {
                this.allSections[index].parentElement.parentElement.classList.add("to-left");
                if ([36, 37, 38, 39].includes(index)) {
                    this.confirmSection.classList.add("show");
                }
            });
        });
    }
    checkRightAnswer() {
        const isRightAnswer = this.answerSection.getAttribute("data-right-wrong") === "right";
        this.answerSection.classList.toggle("selected-right", isRightAnswer);
        this.answerSection.classList.toggle("selected-wrong", !isRightAnswer);
    }
}
const questionInputElements = document.querySelectorAll(".question-input");
const questionTextElements = document.querySelectorAll(".question-txt");
const suggestedTextElements = document.querySelectorAll(".suggestions");
const suggestedInputElements = document.querySelectorAll(".suggested-answer-input");
const addQuestionsSection = document.querySelector(".all-qs");
const errorText = document.querySelector(".error");
const allInputs = document.querySelectorAll('input[type="text"]');
const answerQuestionsSection = document.querySelector(".all-answers");
const allSuggestedTextSections = document.querySelectorAll(".answer");
const allQuestionSections = document.querySelectorAll(".question-answer");
const quiz = new Quiz(questionInputElements, questionTextElements, suggestedInputElements, addQuestionsSection, suggestedTextElements, answerQuestionsSection, errorText, allInputs);
const submitButton = document.querySelector(".confirm");
submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", () => {
    const selectedValues = [];
    const sections = document.querySelectorAll(".question-answer.right-answer");
    window.scrollTo({
        top: 0,
        behavior: "auto",
    });
    document.body.style.overflowY = "hidden";
    if (sections.length < 10) {
        alert("You have to select at least 10 right answers");
    }
    else {
        quiz.updateQuestions();
        sections.forEach((section) => {
            const selectedInput = section.querySelector(".suggested-answer-input");
            if (selectedInput) {
                selectedValues.push(selectedInput.value);
            }
        });
        allSuggestedTextSections.forEach((section, index) => {
            section.dataset.rightWrong =
                allQuestionSections[index].dataset.rightWrong;
        });
    }
});
const confirmSection = document.querySelector(".confirm-answers");
allSuggestedTextSections.forEach((section) => {
    const rightAnswer = new SelectRightAnswer(section, allSuggestedTextSections, confirmSection);
});
const questionSectionsArray = [];
for (let i = 0; i < 10; i++) {
    const questionSectionsElements = document.querySelectorAll(`.questioning-sec${i} .question-answer`);
    const questionSection = new QuestionSection(questionSectionsElements);
    questionSectionsElements.forEach((questionAnswer, index) => {
        questionAnswer.addEventListener("click", () => {
            questionSection.handleClick(index);
        });
    });
    questionSectionsArray.push(questionSection);
}
const answerSections = document.querySelectorAll(".questioning-sec .question-answer");
const confirmButton = document.querySelector(".confirm-btn");
let score = 0;
let congratsSection = document.querySelector(".congratulation");
let scoreElement = document.querySelector(".score");
let scoreGrade = document.querySelector(".grade");
confirmButton === null || confirmButton === void 0 ? void 0 : confirmButton.addEventListener("click", () => {
    const rightChoices = document.querySelectorAll(".selected-right");
    score = rightChoices.length;
    congratsSection === null || congratsSection === void 0 ? void 0 : congratsSection.classList.add("show");
    if (scoreElement) {
        scoreElement.textContent = score.toString();
    }
    if (scoreGrade) {
        if (score < 4) {
            scoreGrade.textContent = "that was bad!!!";
        }
        else if (score < 7) {
            scoreGrade.textContent = "ok, that's interesting!?";
        }
        else {
            scoreGrade.textContent = "you are too good!!!";
        }
    }
});
