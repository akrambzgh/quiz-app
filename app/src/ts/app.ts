import { Quiz } from "./quiz";
import { QuestionSection } from "./qustionSection";
import { SelectRightAnswer } from "./selectRightAnswer";

const questionInputElements =
  document.querySelectorAll<HTMLInputElement>(".question-input");
const questionTextElements =
  document.querySelectorAll<HTMLElement>(".question-txt");
const suggestedTextElements =
  document.querySelectorAll<HTMLElement>(".suggestions");

const suggestedInputElements = document.querySelectorAll<HTMLInputElement>(
  ".suggested-answer-input"
);
const addQuestionsSection = document.querySelector<HTMLElement>(".all-qs");
const errorText = document.querySelector<HTMLElement>(".error");
const allInputs =
  document.querySelectorAll<HTMLInputElement>('input[type="text"]');
const answerQuestionsSection =
  document.querySelector<HTMLElement>(".all-answers");
const allSuggestedTextSections =
  document.querySelectorAll<HTMLElement>(".answer");
const allQuestionSections =
  document.querySelectorAll<HTMLElement>(".question-answer");

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

const submitButton = document.querySelector<HTMLElement>(".confirm");
submitButton?.addEventListener("click", () => {
  const selectedValues: string[] = [];
  const sections = document.querySelectorAll<HTMLElement>(
    ".question-answer.right-answer"
  );
  if (sections.length < 10) {
    alert("You have to select at least 10 right answers");
  } else {
    quiz.updateQuestions();

    sections.forEach((section) => {
      const selectedInput = section.querySelector<HTMLInputElement>(
        ".suggested-answer-input"
      );

      if (selectedInput) {
        selectedValues.push(selectedInput.value);
      }
    });

    allSuggestedTextSections.forEach((section, index) => {
      section.dataset.rightWrong =
        allQuestionSections[index].dataset.rightWrong!;
    });
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    document.body.style.overflowY = "hidden";
  }
});

const confirmSection = document.querySelector<HTMLElement>(".confirm-answers");

allSuggestedTextSections.forEach((section) => {
  const rightAnswer = new SelectRightAnswer(
    section,
    allSuggestedTextSections,
    confirmSection!
  );
});

const questionSectionsArray: QuestionSection[] = [];

for (let i = 0; i < 10; i++) {
  const questionSectionsElements = document.querySelectorAll<HTMLElement>(
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

const confirmButton = document.querySelector<HTMLElement>(".confirm-btn");
let score: number = 0;
let congratsSection = document.querySelector<HTMLElement>(".congratulation");
let scoreElement = document.querySelector<HTMLElement>(".score");
let scoreGrade = document.querySelector<HTMLElement>(".grade");

confirmButton?.addEventListener("click", () => {
  const rightChoices =
    document.querySelectorAll<HTMLElement>(".selected-right");
  score = rightChoices.length;
  congratsSection?.classList.add("show");
  if (scoreElement) {
    scoreElement.textContent = score.toString();
  }
  if (scoreGrade) {
    if (score < 4) {
      scoreGrade.textContent = "that was bad!!!";
    } else if (score < 7) {
      scoreGrade.textContent = "ok, that's interesting!?";
    } else {
      scoreGrade.textContent = "you are too good!!!";
    }
  }
});
