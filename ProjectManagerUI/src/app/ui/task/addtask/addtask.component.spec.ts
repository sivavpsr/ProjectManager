import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtaskComponent } from './addtask.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { OrderbyPipe } from 'src/app/pipe/orderby.pipe';
import { MessagedialogComponent } from '../../shared/messagedialog/messagedialog.component';
import { UserdialogComponent } from '../../shared/userdialog/userdialog.component';
import { ProjectdialogComponent } from '../../shared/projectdialog/projectdialog.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddtaskComponent', () => {
  let component: AddtaskComponent;
  let fixture: ComponentFixture<AddtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ 
        AddtaskComponent,
        FilterPipe,
        OrderbyPipe,
        MessagedialogComponent,
        UserdialogComponent,
        ProjectdialogComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  
  // validate form controls
  it('form validition - invalid', () => {

    component.taskForm.patchValue({
      Task: "",
      Project: ""
    });

    expect(component.taskForm.invalid).toBeTruthy();
  });

  // validate form controls
  it('form validition - valid', () => {

    component.taskForm.patchValue({
      Task: "Task Test 1",
      Project: "Project 1"
    });

    expect(component.taskForm.valid).toBeTruthy();
  });

  // validate form controls
  it('date required - validition', () => {

    component.taskForm.patchValue({
      Task: "Task Test 1",
      Project: "Project 1",
      IsParentTask: false,
      Priority: 5,      
      StartDate: null,
      EndDate: null,
      User: null
    });

    expect(component.taskForm.valid).toBeTruthy();

    component.onSubmit();

    expect(component.startDateRequired).toBeTruthy();
    expect(component.endDateRequired).toBeTruthy();
  });

  // validate form controls
  it('start date greather then end date - validition', () => {

    component.taskForm.patchValue({
      Task: "Task Test 1",
      Project: "Project 1",
      IsParentTask: false,
      Priority: 5,      
      StartDate: new Date(2018, 12, 29),
      EndDate: new Date(2018, 12, 28),
      User: "User 1"
    });

    expect(component.taskForm.valid).toBeTruthy();

    component.onSubmit();

    expect(component.startDateGreater).toBeTruthy();
  });

  // validate form controls
  it('priority required - validition', () => {

    component.taskForm.patchValue({
      Task: "Task Test 1",
      Project: "Project 1",
      IsParentTask: false,
      Priority: 0,      
      StartDate: new Date(2018, 12, 27),
      EndDate: new Date(2018, 12, 28),
      User: "User 1"
    });

    expect(component.taskForm.valid).toBeTruthy();

    component.onSubmit();

    expect(component.priorityRequired).toBeTruthy();
  });

  // validate form controls
  it('user required - validition', () => {

    component.taskForm.patchValue({
      Task: "Task Test 1",
      Project: "Project 1",
      IsParentTask: false,
      Priority: 5,      
      StartDate: new Date(2018, 12, 27),
      EndDate: new Date(2018, 12, 28),
      User: null
    });

    expect(component.taskForm.valid).toBeTruthy();

    component.onSubmit();

    expect(component.userRequired).toBeTruthy();
  });

});
