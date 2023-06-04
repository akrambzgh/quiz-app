export class QuestionSection {
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
