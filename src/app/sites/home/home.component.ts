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

  constructor(private apiService: ApiService, public dialog: MatDialog) {
  }

  clickLoadFromDatabase() {
    this.apiService.getTexts().subscribe(texts => {
      this.texts.set(texts as Text[])
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
          this.title = selectedRow.title;
          this.text = selectedRow.text;
        }
      });
    })

  }

  clickSave() {
    if (this.id) {
      this.apiService.updateText(
        this.id,
        new TextRequestDto(this.title(), this.text())
      )
    }
    this.apiService.addText(new TextRequestDto(this.title(), this.text()))
  }

  clickAnalyse() {
    if (this.withSearchString()) {
      this.apiService.analyse(new AnalysisRequestDto(this.text(), this.searchString(), this.withShareOfSymbols(), this.withSameWordAtSentenceStart()))
    }
    this.apiService.analyse(new AnalysisRequestDto(this.text(), "", this.withShareOfSymbols(), this.withSameWordAtSentenceStart()))
  }
}
