export class SelectRightAnswer {
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
