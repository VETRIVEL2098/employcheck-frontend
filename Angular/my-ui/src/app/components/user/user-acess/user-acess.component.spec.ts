import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAcessComponent } from './user-acess.component';

describe('UserAcessComponent', () => {
  let component: UserAcessComponent;
  let fixture: ComponentFixture<UserAcessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAcessComponent]
    });
    fixture = TestBed.createComponent(UserAcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
