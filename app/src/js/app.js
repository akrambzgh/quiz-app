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

  updateQuestions() {
    let hasError = false;

    this.allInputs.forEach((input) => {
      if (input.value.trim() === "" || input.value.length <= 5) {
        hasError = true;
        return;
      }
    });

    if (hasError) {
      this.errorText.classList.add("animation");
    } else {
      this.errorText.classList.remove("animation");
    }

    if (!hasError) {
      this.questionTextElements.forEach((textElement, index) => {
        textElement.textContent = questionInputElements[index].value;
      });
      this.suggestedTextElements.forEach((textElement, index) => {
        textElement.textContent = suggestedInputElements[index].value;
      });
      this.addQuestionsSection.classList.add("hidden");
      this.answerQuestionsSection.classList.remove("hidden");
    }
  }
}

/* class CorrectAnswer {
  constructor(
    choosedAnswerOne
    // allRadiosQTwo,
    // allRadiosQThree,
    // allRadiosQFour,
    // allRadiosQFive,
    // allRadiosQSix,
    // allRadiosQSeven,
    // allRadiosQEight,
    // allRadiosQNine,
    // allRadiosQTen
  ) {
    this.choosedAnswerOne = choosedAnswerOne;
    this.choosedAnswerOne.addEventListener(
      "click",
      this.choseTheRightAnswer.bind(this)
    );
    // this.allRadiosQTwo = allRadiosQTwo;
    // this.allRadiosQThree = allRadiosQThree;
    // this.allRadiosQFour = allRadiosQFour;
    // this.allRadiosQFive = allRadiosQFive;
    // this.allRadiosQSix = allRadiosQSix;
    // this.allRadiosQSeven = allRadiosQSeven;
    // this.allRadiosQEight = allRadiosQEight;
    // this.allRadiosQNine = allRadiosQNine;
    // this.allRadiosQTen = allRadiosQTen;
  }
  choseTheRightAnswer() {
    this.choosedAnswerOne.forEach((radio) => {
      this.choosedAnswerOne.forEach((button) => {
        button.classList.remove("choosed");
      });
      this.choosedAnswerOne.classList.add("choosed");
      let choosedInput = radio.parentElement.children.item(0);
    });
  }
} */

class RadioButton {
  constructor(inputElement, section) {
    this.inputElement = inputElement;
    this.section = section;
    this.inputElement.addEventListener(
      "click",
      this.handleRadioClick.bind(this)
    );
  }

  handleRadioClick() {
    const sectionRadios = this.section.querySelectorAll(".radio-input");
    sectionRadios.forEach((radio) => {
      if (radio !== this.inputElement) {
        radio.checked = false;
      }
    });

    this.section.classList.add("selected");
    this.section.dataset.variable = "your-variable-value";
  }
}

const radioButtonsArray = [];
const sections = document.querySelectorAll(".section");
sections.forEach((section) => {
  const options = section.querySelectorAll(".radio-input");
  options.forEach((option) => {
    const radioButton = new RadioButton(option, section);
    radioButtonsArray.push(radioButton);
  });
});

// Elements
const questionInputElements = document.querySelectorAll(".question-input");
const questionTextElements = document.querySelectorAll(".question-txt");
const confirmButton = document.querySelector(".confirm");
const suggestedInputElements = document.querySelectorAll(
  ".suggested-answer-input"
);

let addQuestionsSection = document.querySelector(".all-qs");
let errorText = document.querySelector(".error");
let allInputs = document.querySelectorAll("input");

let suggestedTextElements = document.querySelectorAll(".suggetions");
let answerQuestionsSection = document.querySelector(".all-answers");
let radioButtons = document.querySelectorAll(".radio-button");

const quiz = new Quiz(
  questionInputElements,
  questionTextElements,
  suggestedTextElements,
  addQuestionsSection,
  suggestedInputElements,
  answerQuestionsSection,
  radioButtons,
  errorText,
  allInputs
);

confirmButton.addEventListener("click", () => {
  quiz.updateQuestions();
  quiz.choseTheRightAnswer();
});
