import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { OrderbyPipe } from 'src/app/pipe/orderby.pipe';
import { MessagedialogComponent } from '../shared/messagedialog/messagedialog.component';
import { UserdialogComponent } from '../shared/userdialog/userdialog.component';
import { MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        HttpClientModule   
      ],
      declarations: [ 
        ProjectComponent,
        FilterPipe,
        OrderbyPipe,
        MessagedialogComponent,
        UserdialogComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  // validate form controls
  it('form validition - invalid', () => {

    component.projectForm.patchValue({
      ProjectDescription: "",
      Manager: "",
      Priority: 0
    });

    expect(component.projectForm.invalid).toBeTruthy();
  });

  // validate form controls
  it('form validition - valid', () => {

    component.projectForm.patchValue({
      ProjectDescription: "Project Test 1",
      Manager: "Manager 1",
      Priority: 5
    });

    expect(component.projectForm.valid).toBeTruthy();
  });

  // validate form controls
  it('date required - validition', () => {

    component.projectForm.patchValue({
      ProjectDescription: "Project Test 1",
      Manager: "Manager 1",
      Priority: 5,
      DateRequired: true,
      StartDate: null,
      EndDate: null,
    });

    expect(component.projectForm.valid).toBeTruthy();

    component.onSubmit();

    expect(component.startDateRequired).toBeTruthy();
    expect(component.endDateRequired).toBeTruthy();
  });

  // validate form controls
  it('start date greather then end date - validition', () => {

    component.projectForm.patchValue({
      ProjectDescription: "Project Test 1",
      Manager: "Manager 1",
      Priority: 5,
      DateRequired: true,
      StartDate: new Date(2018, 12, 29),
      EndDate: new Date(2018, 12, 28),
    });

    expect(component.projectForm.valid).toBeTruthy();

    component.onSubmit();

    expect(component.startDateGreater).toBeTruthy();
  });
});
