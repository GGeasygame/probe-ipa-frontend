import {Component, signal, WritableSignal} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../../api.service';
import {MatDialog} from '@angular/material/dialog';
import {SelectTextDialogComponent} from '../../components/select-text-dialog/select-text-dialog.component';
import {TextRequestDto} from '../../dto/TextRequestDto';
import {AnalysisRequestDto} from '../../dto/AnalysisRequestDto';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SearchStringAnalysisComponent} from '../../components/search-string-analysis/search-string-analysis.component';
import {AnalysisWithSearchStringDto} from '../../dto/AnalysisWithSearchStringDto';
import {AnalysisResponseDto} from '../../dto/AnalysisResponseDto';
import {AnalysisWithSameWordAtSentenceDto} from '../../dto/AnalysisWithSameWordAtSentenceStartDto';
import {
  SameWordAtSentenceStartAnalysisComponent
} from '../../components/same-word-at-sentence-start-analysis/same-word-at-sentence-start-analysis.component';
import {AnalysisWithShareOfSymbolsDto} from '../../dto/AnalysisWithShareOfSymbolsDto';
import {
  ShareOfSymbolsAnalysisComponent
} from '../../components/share-of-symbols-analysis/share-of-symbols-analysis.component';

@Component({
  selector: 'app-home',
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    SearchStringAnalysisComponent,
    SameWordAtSentenceStartAnalysisComponent,
    ShareOfSymbolsAnalysisComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = signal("")
  text = signal("")
  withSearchString = signal(false)
  searchString = signal("")
  withShareOfSymbols = signal(false)
  withSameWordAtSentenceStart = signal(false)
  id: number | undefined;

  texts: WritableSignal<Text[]> = signal([])

  analysisWithSearchString = signal<AnalysisWithSearchStringDto | undefined>(undefined)
  analysisSameWordAtSentenceStart = signal<AnalysisWithSameWordAtSentenceDto | undefined>(undefined)
  analysisShareOfSymbols = signal<AnalysisWithShareOfSymbolsDto | undefined>(undefined)

  constructor(private apiService: ApiService, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  clickLoadFromDatabase() {
    this.apiService.getTexts().subscribe({
      next: texts => {
        this.texts.set(texts as Text[]);
        let dialog = this.dialog.open(SelectTextDialogComponent, {
          width: '500px',
          height: '500px',
          data: {
            texts: this.texts(),
          }
        });

        dialog.afterClosed().subscribe(selectedRow => {
          if (selectedRow) {
            this.id = selectedRow.id;
            this.title.set(selectedRow.title);
            this.text.set(selectedRow.text);
          }
        });
      },
      error: err => this.showError(err)
    });

  }

  clickSave() {
    if (this.id) {
      this.apiService.updateText(
        this.id,
        new TextRequestDto(this.title(), this.text())
      ).subscribe({
        next: () => {
          this.snackBar.open('Text updated successfully!', 'Close', {duration: 3000});
        },
        error: err => this.showError(err)
      });
    }
    this.apiService.addText(new TextRequestDto(this.title(), this.text())).subscribe({
      next: () => {
        this.snackBar.open('Text added successfully!', 'Close', {duration: 3000});
      },
      error: err => this.showError(err)
    });
  }

  clickAnalyse() {
    if (this.withSearchString()) {
      this.apiService.analyse(
        new AnalysisRequestDto(
          this.text(),
          this.searchString(),
          this.withShareOfSymbols(),
          this.withSameWordAtSentenceStart()))
        .subscribe({
          next: response => this.showAnalysis(response),
          error: err => this.showError(err)
        })
    }
    this.apiService.analyse(
      new AnalysisRequestDto(
        this.text(),
        "",
        this.withShareOfSymbols(),
        this.withSameWordAtSentenceStart()))
      .subscribe({
        next: response => this.showAnalysis(response),
        error: err => this.showError(err)
      })
  }

  private showError(err: any) {
    if (err.name === 'TimeoutError') {
      this.snackBar.open('Es gab ein Timeout.', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
    } else {
      this.snackBar.open('Ein unbekannter Fehler trat auf.', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar'],
      });
    }
  }

  private showAnalysis(response: any) {
    let analysisArray = response as AnalysisResponseDto[];
    if (analysisArray.length === 0) {
      return
    }
    analysisArray.forEach(analysis => {
      if (analysis.hasOwnProperty('timesFound') && analysis.hasOwnProperty('highlightedTextHtml')) {
        let analysisWithSearchString = analysis as any;
        this.analysisWithSearchString.set(new AnalysisWithSearchStringDto(analysisWithSearchString['timesFound'], analysisWithSearchString['highlightedTextHtml']));
      } else if (analysis.hasOwnProperty('highlightedTextHtml')) {
        let analysisSameWordAtSentenceStart = analysis as any;
        this.analysisSameWordAtSentenceStart.set(new AnalysisWithSameWordAtSentenceDto(analysisSameWordAtSentenceStart['highlightedTextHtml']));
      } else if (analysis.hasOwnProperty('shareOfSymbols')) {
        let analysisShareOfSymbols = analysis as any;
        this.analysisShareOfSymbols.set(new AnalysisWithShareOfSymbolsDto(new Map(Object.entries(analysisShareOfSymbols['shareOfSymbols']))));
      }
    })
  }
}
