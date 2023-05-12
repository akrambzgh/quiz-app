class AddQuestions {
  constructor(
    allQuestionsInputs: HTMLInputElement[],
    allSuggesedAnswers: HTMLElement[]
  ) {}
}
let allQuestionsInputs = document.querySelectorAll(".question-input");
let allSuggesedAnswers = document.querySelectorAll(".question-answer");

const addQuestions = new AddQuestions(allQuestionsInputs, allSuggesedAnswers);
