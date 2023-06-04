export class Quiz {
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
