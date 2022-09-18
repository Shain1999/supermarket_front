import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReferralComponent } from './order-referral.component';

describe('OrderReferralComponent', () => {
  let component: OrderReferralComponent;
  let fixture: ComponentFixture<OrderReferralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReferralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
