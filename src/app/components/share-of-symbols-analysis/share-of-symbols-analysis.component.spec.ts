import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareOfSymbolsAnalysisComponent } from './share-of-symbols-analysis.component';

describe('ShareOfSymbolsAnalysisComponent', () => {
  let component: ShareOfSymbolsAnalysisComponent;
  let fixture: ComponentFixture<ShareOfSymbolsAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareOfSymbolsAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareOfSymbolsAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
