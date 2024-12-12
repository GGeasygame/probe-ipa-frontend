import {AnalysisResponseDto} from './AnalysisResponseDto';

export class AnalysisWithSameWordAtSentence implements AnalysisResponseDto {
  highlightedTextHtml: string;

  constructor(highlightedTextHtml: string) {
    this.highlightedTextHtml = highlightedTextHtml;
  }
}
