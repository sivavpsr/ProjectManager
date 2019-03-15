import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-messagedialog',
  templateUrl: './messagedialog.component.html',
  styleUrls: ['./messagedialog.component.css'],
  preserveWhitespaces: true
})
export class MessagedialogComponent implements OnInit {

  ngOnInit() {
  }

  constructor(private dialogRef: MatDialogRef<MessagedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ok(){
    this.dialogRef.close('OK');
  }

  cancel(){
    this.dialogRef.close('CANCEL');
  }
}
