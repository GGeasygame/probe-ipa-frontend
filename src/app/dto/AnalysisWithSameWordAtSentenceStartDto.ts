import {AnalysisResponseDto} from './AnalysisResponseDto';

export class AnalysisWithSameWordAtSentenceDto implements AnalysisResponseDto {
  highlightedTextHtml: string;

  constructor(highlightedTextHtml: string) {
    this.highlightedTextHtml = highlightedTextHtml;
  }
}
