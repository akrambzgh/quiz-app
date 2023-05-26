// Main Class
// class Quiz {
//   constructor(
//     questionInputElements,
//     questionTextElements,
//     suggestedInputElements,
//     addQuestionsSection,
//     suggestedTextElements,
//     answerQuestionsSection,
//     errorText,
//     allInputs
//   ) {
//     this.questionInputElements = questionInputElements;
//     this.questionTextElements = questionTextElements;
//     this.suggestedInputElements = suggestedInputElements;
//     this.suggestedTextElements = suggestedTextElements;
//     this.addQuestionsSection = addQuestionsSection;
//     this.answerQuestionsSection = answerQuestionsSection;
//     this.errorText = errorText;
//     this.allInputs = allInputs;
//   }

//   updateQuestions() {
//     let hasError = false;

//     this.allInputs.forEach((input) => {
//       if (input.value.trim() === "" || input.value.length <= 5) {
//         hasError = true;
//         return;
//       }
//     });

//     if (hasError) {
//       this.errorText.classList.add("animation");
//     } else {
//       this.errorText.classList.remove("animation");
//     }

//     if (!hasError) {
//       this.questionTextElements.forEach((textElement, index) => {
//         textElement.textContent = questionInputElements[index].value;
//       });
//       this.suggestedTextElements.forEach((textElement, index) => {
//         textElement.textContent = suggestedInputElements[index].value;
//       });
//       this.addQuestionsSection.classList.add("hidden");
//       this.answerQuestionsSection.classList.remove("hidden");
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
    const section = this.sectionElement.getAttribute("data-section");

    // Remove the "selected" class from all selected section elements
    const sectionElements = document.querySelectorAll(
      ".question-answer.selected"
    );
    sectionElements.forEach((element) => {
      element.classList.remove("selected");
    });

    if (this.radioElement.checked) {
      // Add the "selected" class to the parent section
      this.sectionElement.classList.add("selected");

      // Store the input value in a variable or use it elsewhere
      const selectedInput = this.sectionElement.querySelector(
        ".suggested-answer-input"
      );
      const selectedInputValue = selectedInput.value;
      console.log(`Selected input value for ${section}: ${selectedInputValue}`);
    } else {
      console.log(`Please select one input for ${section}`);
    }
  }
}

const radioButtons = document.querySelectorAll(".radio-button");
radioButtons.forEach((radioButton) => {
  const radio = new RadioButton(radioButton);
});

const submitButton = document.querySelector(".confirm");
submitButton.addEventListener("click", () => {
  const selectedValues = [];
  const sections = document.querySelectorAll(".question-answer.selected");
  sections.forEach((section) => {
    const selectedInput = section.querySelector(
      "input[type='radio']:checked + .suggested-answer-input"
    );
    if (selectedInput) {
      selectedValues.push(selectedInput.value);
    }
  });
  console.log("Selected Input Values:", selectedValues);
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

// const quiz = new Quiz(
//   questionInputElements,
//   questionTextElements,
//   suggestedTextElements,
//   addQuestionsSection,
//   suggestedInputElements,
//   answerQuestionsSection,
//   radioButtons,
//   errorText,
//   allInputs
// );

confirmButton.addEventListener("click", () => {
  // quiz.updateQuestions();
  // quiz.choseTheRightAnswer();
});
