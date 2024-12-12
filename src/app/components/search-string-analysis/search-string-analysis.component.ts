import {AfterViewInit, Component, input} from '@angular/core';
import {AnalysisWithSearchStringDto} from '../../dto/AnalysisWithSearchStringDto';

@Component({
  selector: 'app-search-string-analysis',
  imports: [],
  templateUrl: './search-string-analysis.component.html',
  styleUrl: './search-string-analysis.component.css'
})
export class SearchStringAnalysisComponent implements AfterViewInit {
  analysis = input.required<AnalysisWithSearchStringDto>()

  ngAfterViewInit() {
    const spans = document.querySelectorAll('.text span') as NodeListOf<HTMLSpanElement>;
    spans.forEach(span => {
      span.style.backgroundColor = 'yellow';
    });
  }
}
