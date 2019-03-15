import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParenttaskdialogComponent } from './parenttaskdialog.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { OrderbyPipe } from 'src/app/pipe/orderby.pipe';

describe('ParenttaskdialogComponent', () => {
  let component: ParenttaskdialogComponent;
  let fixture: ComponentFixture<ParenttaskdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        HttpClientModule,
        FormsModule
      ],
      declarations: [ 
        ParenttaskdialogComponent,
        FilterPipe,
        OrderbyPipe
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParenttaskdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
