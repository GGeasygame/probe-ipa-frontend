import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTextDialogComponent } from './select-text-dialog.component';

describe('SelectTextDialogComponent', () => {
  let component: SelectTextDialogComponent;
  let fixture: ComponentFixture<SelectTextDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectTextDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
