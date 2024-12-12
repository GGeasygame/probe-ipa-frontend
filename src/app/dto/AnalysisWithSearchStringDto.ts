import {AnalysisResponseDto} from './AnalysisResponseDto';

export class AnalysisWithSearchStringDto implements AnalysisResponseDto {

  timesFound: number;
  highlightedTextHtml: string;

  constructor(timesFound: number, highlightedTextHtml: string) {
    this.timesFound = timesFound;
    this.highlightedTextHtml = highlightedTextHtml;
  }
}
