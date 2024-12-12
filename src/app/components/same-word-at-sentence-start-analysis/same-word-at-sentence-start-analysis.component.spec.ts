import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SameWordAtSentenceStartAnalysisComponent } from './same-word-at-sentence-start-analysis.component';

describe('SameWordAtSentenceStartAnalysisComponent', () => {
  let component: SameWordAtSentenceStartAnalysisComponent;
  let fixture: ComponentFixture<SameWordAtSentenceStartAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SameWordAtSentenceStartAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SameWordAtSentenceStartAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
