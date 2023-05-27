"use strict";
// Main Class
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
    // Method to update questions
    updateQuestions() {
        let hasError = false;
        // Check for errors in input values
        this.allInputs.forEach((input) => {
            if (input.value.trim() === "" || input.value.length <= 5) {
                hasError = true;
                return;
            }
        });
        // Show or hide error text based on error status
        if (hasError) {
            if (this.errorText) {
                this.errorText.classList.add("show");
            }
        }
        else {
            if (this.errorText) {
                this.errorText.classList.remove("show");
            }
        }
        // Update question and suggested answer texts
        if (!hasError) {
            this.questionTextElements.forEach((textElement, index) => {
                textElement.textContent = this.questionInputElements[index].value;
            });
            this.suggestedTextElements.forEach((textElement, index) => {
                textElement.textContent = this.suggestedInputElements[index].value;
            });
            // Update question and suggested answer texts
            if (this.addQuestionsSection) {
                this.addQuestionsSection.classList.add("hidden");
            }
            if (this.answerQuestionsSection) {
                this.answerQuestionsSection.classList.remove("hidden");
            }
        }
    }
}
class RadioButton {
    constructor(radioElement) {
        this.radioElement = radioElement;
        this.sectionElement = radioElement.closest(".question-answer");
        // Add click event listener to radio button
        this.radioElement.addEventListener("click", this.handleRadioClick.bind(this));
    }
    // Handle radio button click event
    handleRadioClick() {
        if (this.sectionElement) {
            const section = this.sectionElement.getAttribute("data-section");
            // Remove the "selected" class from all selected section elements
            const sectionElements = document.querySelectorAll(".questioning-sec .question-answer");
            sectionElements.forEach((element) => {
                element.classList.remove("selected");
            });
            if (this.radioElement.checked) {
                // Add the "selected" class to the parent section
                this.sectionElement.classList.add("selected");
                // Store the input value in a variable or use it elsewhere
                const selectedInput = this.sectionElement.querySelector(".suggested-answer-input");
                const selectedInputValue = selectedInput === null || selectedInput === void 0 ? void 0 : selectedInput.value;
                console.log(`This Is From ${section}, and This Is The Value: ${selectedInputValue}`);
            }
            else {
                console.log(`Please select one input for ${section}`);
            }
        }
    }
}
// Get radio buttons and initialize RadioButton instances
const radioButtons = document.querySelectorAll(".questioning-sec #radio-button");
radioButtons.forEach((radioButton) => {
    const radio = new RadioButton(radioButton);
});
// Elements
const questionInputElements = document.querySelectorAll(".question-input");
const questionTextElements = document.querySelectorAll(".question-txt");
const suggestedTextElements = document.querySelectorAll(".suggetions");
const suggestedInputElements = document.querySelectorAll(".suggested-answer-input");
const addQuestionsSection = document.querySelector(".all-qs");
const errorText = document.querySelector(".error");
const allInputs = document.querySelectorAll('input[type="text"]');
const answerQuestionsSection = document.querySelector(".all-answers");
// Create Quiz instance
const quiz = new Quiz(questionInputElements, questionTextElements, suggestedInputElements, addQuestionsSection, suggestedTextElements, answerQuestionsSection, errorText, allInputs);
// Handle submit button click event
const submitButton = document.querySelector(".confirm");
submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", () => {
    quiz.updateQuestions();
    // Get selected values
    const selectedValues = [];
    const sections = document.querySelectorAll(".question-answer.selected");
    sections.forEach((section) => {
        const selectedInput = section.querySelector(".suggested-answer-input");
        if (selectedInput) {
            selectedValues.push(selectedInput.value);
        }
    });
});
