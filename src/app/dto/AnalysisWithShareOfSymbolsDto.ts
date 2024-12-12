import {AnalysisResponseDto} from './AnalysisResponseDto';

export class AnalysisWithShareOfSymbolsDto implements AnalysisResponseDto {
  shareOfSymbols: Map<string, number> = new Map<string, number>();

  constructor(shareOfSymbols: Map<string, number>) {
    this.shareOfSymbols = shareOfSymbols;
  }
}
