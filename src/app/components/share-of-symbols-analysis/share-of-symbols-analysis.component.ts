import {Component, computed, input} from '@angular/core';
import {AnalysisWithShareOfSymbolsDto} from '../../dto/AnalysisWithShareOfSymbolsDto';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';

@Component({
  selector: 'app-share-of-symbols-analysis',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './share-of-symbols-analysis.component.html',
  styleUrl: './share-of-symbols-analysis.component.css'
})
export class ShareOfSymbolsAnalysisComponent {
  analysis = input.required<AnalysisWithShareOfSymbolsDto>()

  shares = computed(() => {
    return Array.from(this.analysis().shareOfSymbols.entries())
  })

  displayedColumns: string[] = ['symbol', 'shareOfSymbols'];

  constructor() {
  }
}
