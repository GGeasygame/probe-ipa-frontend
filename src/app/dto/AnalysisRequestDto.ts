export class AnalysisRequestDto {
  text: string;
  searchString: string;
  withShareOfSymbols: boolean;
  withSameWordAtSentenceStart: boolean;

  constructor(
    text: string,
    searchString: string,
    withShareOfSymbols: boolean,
    withSameWordAtSentenceStart: boolean
  ) {
    this.text = text;
    this.searchString = searchString;
    this.withShareOfSymbols = withShareOfSymbols;
    this.withSameWordAtSentenceStart = withSameWordAtSentenceStart;
  }
}
