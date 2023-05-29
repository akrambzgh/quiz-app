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

class GetAnswerValue {
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
      if (this.sectionElement) {
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
const answerSections = document.querySelectorAll(
  ".questioning-sec .question-answer"
);
answerSections.forEach((section) => {
  const answer = new GetAnswerValue(section);
});

class SelectRightAnswer {
  constructor(answerSections, score) {
    this.answerSections = answerSections;
    this.score = score;
    this.answerSections.addEventListener("click", () => {
      this.checkRightAnswer();
    });
  }

  checkRightAnswer() {
    if (this.answerSections.getAttribute("data-right-wrong") === "right") {
    } else {
      console.log("Worng Answer");
    }
  }
}

// Define a class for each section
class QuestionSection {
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
class AnswerSection {
  constructor(sections) {
    this.sections = sections;
  }

  handleClick(index) {
    this.sections.forEach((section) => {
      section.classList.remove("selected");
    });

    this.sections[index].classList.add("selected");
  }
}

// Create section objects
const questionSectionsArray = [];

// Add text elements to each section
for (let i = 0; i < 10; i++) {
  const questionSectionsElements = document.querySelectorAll(
    `.questioning-sec${i} .question-answer`
  );

  const questionSection = new QuestionSection(questionSectionsElements);

  questionSectionsElements.forEach((questionAnswer, index) => {
    questionAnswer.addEventListener("click", () => {
      questionSection.handleClick(index);
    });
  });

  questionSectionsArray.push(questionSection);
}
// Create section objects
const answersectionsArray = [];

// Add text elements to each section
for (let i = 0; i < 10; i++) {
  const answerSectionsElements = document.querySelectorAll(
    `.answering${i} .answer`
  );

  const answerSection = new AnswerSection(answerSectionsElements);

  answerSectionsElements.forEach((answerSec, index) => {
    answerSec.addEventListener("click", () => {
      answerSection.handleClick(index);
    });
  });

  answersectionsArray.push(answerSection);
}

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
let allSuggestedTextSections = document.querySelectorAll(".answer");
let allQuestionSections = document.querySelectorAll(".question-answer");

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
      // Get selected values
      const selectedValues = [];
      const sections = document.querySelectorAll(
        ".question-answer.right-answer"
      );
      // if (sections.length < 10) {
      // alert("You Have To Select At Least 10 Right Answers");
      // } else {
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
      // }
    });

let score = 0;

allSuggestedTextSections.forEach((section) => {
  const rigthAnswer = new SelectRightAnswer(section);
});
