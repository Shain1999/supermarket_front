import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCardDialogComponent } from './add-to-card-dialog.component';

describe('AddToCardDialogComponent', () => {
  let component: AddToCardDialogComponent;
  let fixture: ComponentFixture<AddToCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddToCardDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
