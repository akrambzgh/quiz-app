("use strict");

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

class RadioButton {
  constructor(radioElement) {
    this.radioElement = radioElement;
    this.sectionElement = radioElement.closest(".question-answer");
    this.radioElement.addEventListener(
      "click",
      this.handleRadioClick.bind(this)
    );
  }
  handleRadioClick() {
    if (this.sectionElement) {
      const section = this.sectionElement.getAttribute("data-section");

      // Remove the "selected" class from all selected section elements
      const sectionElements = document.querySelectorAll(
        ".questioning-sec .question-answer"
      );

      sectionElements.forEach((element) => {
        element.classList.remove("selected");
      });

      if (this.radioElement) {
        // Add the "selected" class to the parent section
        this.sectionElement.classList.add("selected");

        // Store the input value in a variable or use it elsewhere
        const selectedInput = this.sectionElement.querySelector(
          ".suggested-answer-input"
        );
        const selectedInputValue = selectedInput?.value;

        console.log(
          `This Is From ${section}, and This Is The Value: ${selectedInputValue}`
        );
      } else {
        console.log(`Please select one input for ${section}`);
      }
    }
  }
}
const radioButtons = document.querySelectorAll(".questioning-sec .choose-btn");
radioButtons.forEach((radioButton) => {
  const radio = new RadioButton(radioButton);
});

class QuestionSection {
  constructor(section) {
    this.section = section;
  }

  handleClick(index) {
    this.section.forEach((section) => {
      section.dataset.rightWrong = "wrong";
      section.classList.remove("right-answer");
    });

    this.section[index].classList.add("right-answer");
    this.section[index].dataset.rightWrong = "right";
  }
}

class SelectRightAnswer {
  constructor(answerSection, allSections, confirmSection) {
    this.answerSection = answerSection;
    this.allSections = allSections;
    this.confirmSection = confirmSection;
    this.answerSection.addEventListener("click", () => {
      this.checkRightAnswer();
    });
    this.allSections.forEach((section, index) => {
      section.addEventListener("click", () => {
        this.allSections[index].parentElement.parentElement.classList.add(
          "to-left"
        );
        if (index == 36 || index == 37 || index == 38 || index == 39) {
          this.confirmSection.classList.add("show");
        }
      });
    });
  }

  checkRightAnswer() {
    if (this.answerSection.getAttribute("data-right-wrong") === "right") {
      // Correct answer
      this.answerSection.classList.add("selected-right");
    } else {
      // Wrong answer
      this.answerSection.classList.add("selected-wrong");
    }
  }
}

class ConfirmeAnswerWithScore {
  constructor(score, rightAnswers) {
    this.score = score;
    this.rightAnswers = rightAnswers;
  }
  clacTheScore() {
    this.score = this.rightAnswers;
    console.log(this.score);
  }
}

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
  window.scrollTo({
    top: 0,
    behavior: "auto",
  });
  // }
});

const confirmSection = document.querySelector(".confirm-answers");

allSuggestedTextSections.forEach((section) => {
  const rightAnswer = new SelectRightAnswer(
    section,
    allSuggestedTextSections,
    confirmSection
  );
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

// Get answer sections and initialize GetAnswerValue for each section
const answerSections = document.querySelectorAll(
  ".questioning-sec .question-answer"
);

const confirmButtons = document.querySelector(".confirm-btn");
let score = 0;
const rightChoises = document.querySelectorAll(".selected-right");

confirmButtons.addEventListener("click", () => {
  const getScore = new ConfirmeAnswerWithScore(score, rightChoises);
  console.log(rightChoises);
  getScore.clacTheScore();
});
