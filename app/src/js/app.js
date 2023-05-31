"use strict";

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

  updateQuestions() {
    let hasError = false;

    this.allInputs.forEach((input) => {
      if (input.value.trim() === "" || input.value.length <= 5) {
        hasError = true;
        return;
      }
    });

    if (hasError) {
      this.errorText?.classList.add("show");
    } else {
      this.errorText?.classList.remove("show");
    }

    if (!hasError) {
      this.questionTextElements.forEach((textElement, index) => {
        textElement.textContent = this.questionInputElements[index].value;
      });

      this.suggestedTextElements.forEach((textElement, index) => {
        textElement.textContent = this.suggestedInputElements[index].value;
      });

      this.addQuestionsSection?.classList.add("hidden");
      this.answerQuestionsSection?.classList.remove("hidden");
    }
  }
}

// class GetAnswerValue {
//   constructor(sectionElement) {
//     this.sectionElement = sectionElement;
//     this.sectionElement.addEventListener("click", () => {
//       this.handleRadioClickOne();
//     });
//   }

//   handleRadioClickOne() {
//     const section = this.sectionElement.getAttribute("data-section");

//     if (this.sectionElement) {
//       const selectedInput = this.sectionElement.querySelector(
//         ".suggested-answer-input"
//       );

//       if (selectedInput) {
//         const selectedInputValue = selectedInput.value;
//         console.log(selectedInputValue);
//       } else {
//         console.log(`Please select one input for ${section}`);
//       }
//     }
//   }
// }

class SelectRightAnswer {
  constructor(answerSections) {
    this.answerSections = answerSections;
    this.answerSections.addEventListener("click", () => {
      this.checkRightAnswer();
    });
  }

  checkRightAnswer() {
    if (this.answerSections.getAttribute("data-right-wrong") === "right") {
      // Correct answer
      this.answerSections.classList.add("selected-right");
    } else {
      // Wrong answer
      this.answerSections.classList.add("selected-wrong");
    }
  }
}

class QuestionSection {
  constructor(sections) {
    this.sections = sections;
  }

  handleClick(index) {
    this.sections.forEach((section) => {
      section.dataset.rightWrong = "wrong";
      section.classList.remove("right-answer");
    });

    this.sections[index].classList.add("right-answer");
    this.sections[index].dataset.rightWrong = "right";
  }
}

// class AnswerSection {
//   constructor(sections) {
//     this.sections = sections;
//   }

//   handleClick(index) {
//     this.sections.forEach((section) => {
//       section.classList.remove("selected-right");
//       section.classList.remove("selected-wrong");
//     });

//     section.classList.add("selected-right");
//     section.classList.add("selected-wrong");
//   }
// }

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
const allSuggestedTextSections = document.querySelectorAll(".answer");
const allQuestionSections = document.querySelectorAll(".question-answer");

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

const submitButton = document.querySelector(".confirm");
submitButton?.addEventListener("click", () => {
  const selectedValues = [];
  const sections = document.querySelectorAll(".question-answer.right-answer");

  // if (sections.length < 10) {
  //   alert("You have to select at least 10 right answers");
  // } else {
  quiz.updateQuestions();

  sections.forEach((section) => {
    const selectedInput = section.querySelector(".suggested-answer-input");

    if (selectedInput) {
      selectedValues.push(selectedInput.value);
    }
  });

  allSuggestedTextSections.forEach((section, index) => {
    section.dataset.rightWrong = allQuestionSections[index].dataset.rightWrong;
  });
  // }
});

allSuggestedTextSections.forEach((section) => {
  const rightAnswer = new SelectRightAnswer(section);
});

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

// // Create section objects
// const answersectionsArray = [];

// // Add text elements to each section
// for (let i = 0; i < 10; i++) {
//   const answerSectionsElements = document.querySelectorAll(
//     `.answering${i} .answer`
//   );

//   const answerSection = new AnswerSection(answerSectionsElements);

//   answerSectionsElements.forEach((answerSec, index) => {
//     answerSec.addEventListener("click", () => {
//       answerSection.handleClick(index);
//     });
//   });

//   answersectionsArray.push(answerSection);
// }

// Get answer sections and initialize GetAnswerValue for each section
const answerSections = document.querySelectorAll(
  ".questioning-sec .question-answer"
);

// answerSections.forEach((section) => {
//   const answer = new GetAnswerValue(section);
// });
