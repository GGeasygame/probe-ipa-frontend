export class TextRequestDto {
  title: string;
  text: string;

  constructor(
    title: string,
    text: string) {
    this.title = title;
    this.text = text;
  }
}
