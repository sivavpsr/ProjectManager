import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { OrderbyPipe } from 'src/app/pipe/orderby.pipe';
import { MatDialogModule } from '@angular/material';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatDialogModule
      ],
      declarations: [
        UserComponent,
        FilterPipe,
        OrderbyPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // validate form controls
  it('form validition - invalid', () => {

    component.userForm.patchValue({
      FirstName: "",
      LastName: ""
    });

    expect(component.userForm.invalid).toBeTruthy();
  });

  // validate form controls
  it('form validition - valid', () => {

    component.userForm.patchValue({
      FirstName: "Test",
      LastName: "Test"
    });

    expect(component.userForm.valid).toBeTruthy();
  });


});
