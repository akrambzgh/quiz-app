"use strict";

class Quiz {
  public questionInputElements: NodeListOf<HTMLInputElement>;
  public questionTextElements: NodeListOf<HTMLElement>;
  public suggestedInputElements: NodeListOf<HTMLInputElement>;
  public suggestedTextElements: NodeListOf<HTMLElement>;
  public addQuestionsSection: HTMLElement | null;
  public answerQuestionsSection: HTMLElement | null;
  public errorText: HTMLElement | null;
  public allInputs: NodeListOf<HTMLInputElement>;

  constructor(
    questionInputElements: NodeListOf<HTMLInputElement>,
    questionTextElements: NodeListOf<HTMLElement>,
    suggestedInputElements: NodeListOf<HTMLInputElement>,
    addQuestionsSection: HTMLElement | null,
    suggestedTextElements: NodeListOf<HTMLElement>,
    answerQuestionsSection: HTMLElement | null,
    errorText: HTMLElement | null,
    allInputs: NodeListOf<HTMLInputElement>
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

  updateQuestions(): void {
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
      this.suggestedTextElements.forEach((textElement, index) => {
        textElement.textContent = this.suggestedInputElements[index].value;
      });
      this.questionTextElements.forEach((textElement, index) => {
        textElement.textContent = this.questionInputElements[index].value;
      });

      this.addQuestionsSection?.classList.add("hidden");
      this.answerQuestionsSection?.classList.remove("hidden");
    }
  }
}

class RadioButton {
  public radioElement: HTMLInputElement;
  public sectionElement: HTMLElement | null;

  constructor(radioElement: HTMLInputElement) {
    this.radioElement = radioElement;
    this.sectionElement = radioElement.closest(".question-answer");
    this.radioElement.addEventListener(
      "click",
      this.handleRadioClick.bind(this)
    );
  }

  handleRadioClick(): void {
    const section = this.sectionElement?.getAttribute("data-section");

    const sectionElements = document.querySelectorAll<HTMLElement>(
      ".questioning-sec .question-answer"
    );
    sectionElements.forEach((element) => element.classList.remove("selected"));

    if (this.radioElement) {
      this.sectionElement?.classList.add("selected");

      const selectedInput =
        this.sectionElement?.querySelector<HTMLInputElement>(
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

class QuestionSection {
  public section: NodeListOf<HTMLElement>;

  constructor(section: NodeListOf<HTMLElement>) {
    this.section = section;
  }

  handleClick(index: number): void {
    this.section.forEach((section, i) => {
      section.dataset.rightWrong = i === index ? "right" : "wrong";
      section.classList.toggle("right-answer", i === index);
    });
  }
}

class SelectRightAnswer {
  public answerSection: HTMLElement;
  public allSections: NodeListOf<HTMLElement>;
  public confirmSection: HTMLElement;

  constructor(
    answerSection: HTMLElement,
    allSections: NodeListOf<HTMLElement>,
    confirmSection: HTMLElement
  ) {
    this.answerSection = answerSection;
    this.allSections = allSections;
    this.confirmSection = confirmSection;

    this.answerSection.addEventListener(
      "click",
      this.checkRightAnswer.bind(this)
    );
    this.allSections.forEach((section, index) => {
      section.addEventListener("click", () => {
        this.allSections[index].parentElement!.parentElement!.classList.add(
          "to-left"
        );

        if ([36, 37, 38, 39].includes(index)) {
          this.confirmSection.classList.add("show");
        }
      });
    });
  }

  checkRightAnswer(): void {
    const isRightAnswer =
      this.answerSection.getAttribute("data-right-wrong") === "right";

    this.answerSection.classList.toggle("selected-right", isRightAnswer);
    this.answerSection.classList.toggle("selected-wrong", !isRightAnswer);
  }
}

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
  window.scrollTo({
    top: 0,
    behavior: "auto",
  });
  document.body.style.overflowY = "hidden";
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

const answerSections = document.querySelectorAll<HTMLElement>(
  ".questioning-sec .question-answer"
);

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
