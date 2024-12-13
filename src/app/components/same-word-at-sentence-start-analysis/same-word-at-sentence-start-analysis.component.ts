import {AfterViewInit, Component, input} from '@angular/core';
import {AnalysisWithSameWordAtSentenceDto} from '../../dto/AnalysisWithSameWordAtSentenceStartDto';

@Component({
  selector: 'app-same-word-at-sentence-start-analysis',
  imports: [],
  templateUrl: './same-word-at-sentence-start-analysis.component.html',
  styleUrl: './same-word-at-sentence-start-analysis.component.css'
})
export class SameWordAtSentenceStartAnalysisComponent implements AfterViewInit {
  analysis = input.required<AnalysisWithSameWordAtSentenceDto>()

  ngAfterViewInit() {
    const spans = document.querySelectorAll('.text span') as NodeListOf<HTMLSpanElement>;
    spans.forEach(span => {
      span.style.backgroundColor = 'yellow';
    });
  }
}
