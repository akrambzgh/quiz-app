"use strict";
// Main Class
class Quiz {
  constructor(
    questionInputElements,
    questionTextElements,
    suggestedInputElements,
    addQuestionsSection,
    suggestedTextElements,
    answerQuestionsSection,
    errorText,
    allInputs
  ) {
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
    } else {
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

class RightAnswerChosing {
  constructor(sectionElement) {
    this.sectionElement = sectionElement;
    this.sectionElement.addEventListener("click", () => {
      this.handleRadioClickOne();
    });
  }
  // Handle radio button click event
  handleRadioClickOne() {
    if (this.sectionElement) {
      const section = this.sectionElement.getAttribute("data-section");
      // Remove the "selected" class from all selected section elements
      const sectionElements = document.querySelectorAll(
        ".questioning-sec .question-answer"
      );
      //   sectionElements.forEach((element) => {
      //     element.classList.remove("right-answer");
      //   });
      if (this.sectionElement) {
        // this.sectionElement.classList.add("right-answer");
        // this.sectionElement.dataset.rightWrong = "right";
        // Store the input value in a variable or use it elsewhere
        const selectedInput = this.sectionElement.querySelector(
          ".suggested-answer-input"
        );
        const selectedInputVlaue = selectedInput.value;
        console.log(selectedInputVlaue);
      } else {
        console.log(`Please select one input for ${section}`);
      }
    }
  }
}

// Define a class for each section
class Section {
  constructor(sections) {
    this.sections = sections; // Array to store text elements
  }

  handleClick(index) {
    // Reset color of all text elements in the section to default
    this.sections.forEach((section) => {
      section.dataset.rightWrong = "wrong";
      section.classList.remove("right-answer");
    });

    // Set color of the clicked text element to red
    this.sections[index].classList.add("right-answer");
    this.sections[index].dataset.rightWrong = "right";
  }
}

// Create section objects
const sections = [];

// Add text elements to each section
for (let i = 0; i < 10; i++) {
  const sectionsElements = document.querySelectorAll(
    `.questioning-sec${i} .question-answer`
  );

  const section = new Section(sectionsElements);

  sectionsElements.forEach((questionAnswer, index) => {
    questionAnswer.addEventListener("click", () => {
      console.log("hello");
      section.handleClick(index);
    });
  });

  sections.push(section);
}

// Get radio buttons and initialize RightAnswerChosing instances
const answerSections = document.querySelectorAll(
  ".questioning-sec .question-answer"
);
answerSections.forEach((section) => {
  const answer = new RightAnswerChosing(section);
});
// Elements
const questionInputElements = document.querySelectorAll(".question-input");
const questionTextElements = document.querySelectorAll(".question-txt");
const suggestedTextElements = document.querySelectorAll(".suggetions");
const suggestedInputElements = document.querySelectorAll(
  ".suggested-answer-input"
);
const addQuestionsSection = document.querySelector(".all-qs");
const errorText = document.querySelector(".error");
const allInputs = document.querySelectorAll('input[type="text"]');
const answerQuestionsSection = document.querySelector(".all-answers");
// Create Quiz instance
const quiz = new Quiz(
  questionInputElements,
  questionTextElements,
  suggestedInputElements,
  addQuestionsSection,
  suggestedTextElements,
  answerQuestionsSection,
  errorText,
  allInputs
);
// Handle submit button click event
const submitButton = document.querySelector(".confirm");
submitButton === null || submitButton === void 0
  ? void 0
  : submitButton.addEventListener("click", () => {
      quiz.updateQuestions();
      // Get selected values
      const selectedValues = [];
      const sections = document.querySelectorAll(
        ".question-answer.right-answer"
      );
      sections.forEach((section) => {
        const selectedInput = section.querySelector(".suggested-answer-input");
        if (selectedInput) {
          selectedValues.push(selectedInput.value);
        }
      });
      let allSuggestedTextSections = document.querySelectorAll(".answer");
      let allQuestionSections = document.querySelectorAll(".question-answer");
      allSuggestedTextSections.forEach((section, index) => {
        section.dataset.rightWrong =
          allQuestionSections[index].dataset.rightWrong;
        console.log(allQuestionSections[index].dataset.rightWrong);
      });
    });
