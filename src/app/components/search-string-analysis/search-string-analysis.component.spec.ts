import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStringAnalysisComponent } from './search-string-analysis.component';

describe('SearchStringAnalysisComponent', () => {
  let component: SearchStringAnalysisComponent;
  let fixture: ComponentFixture<SearchStringAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchStringAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchStringAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
