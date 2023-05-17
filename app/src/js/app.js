// Main Class
class Quiz {
  constructor(
    questionInputElements,
    questionTextElements,
    suggestedInputElements,
    suggestedTextElements,
    addQuestionsSection,
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

    allInputs.forEach((input) => {
      if (input.value.trim() === "" || input.value.length <= 5) {
        hasError = true;
        return;
      }
    });

    if (hasError) {
      errorText.classList.add("animation");
    } else {
      errorText.classList.remove("animation");
    }

    if (!hasError) {
      questionTextElements.forEach((textElement, index) => {
        textElement.textContent = questionInputElements[index].value;
      });
      suggestedTextElements.forEach((textElement, index) => {
        textElement.textContent = suggestedInputElements[index].value;
      });
      addQuestionsSection.classList.add("hidden");
      answerQuestionsSection.classList.remove("hidden");
    }
  }
}

// Elements
const questionInputElements = document.querySelectorAll(".question-input");
const questionTextElements = document.querySelectorAll(".question-txt");
const suggestedInputElements = document.querySelectorAll(
  ".suggested-answer-input"
);
const suggestedTextElements = document.querySelectorAll(".answer");
const confirmButton = document.querySelector(".confirm");
let addQuestionsSection = document.querySelector(".all-qs");
let answerQuestionsSection = document.querySelector(".all-anwers");
let errorText = document.querySelector(".error");

let allInputs = document.querySelectorAll("input");

const quiz = new Quiz(
  questionInputElements,
  questionTextElements,
  suggestedTextElements,
  addQuestionsSection,
  answerQuestionsSection,
  allInputs
);

confirmButton.addEventListener("click", () => {
  quiz.updateQuestions();
});
