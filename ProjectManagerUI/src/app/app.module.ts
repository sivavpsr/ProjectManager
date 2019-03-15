import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './ui/user/user.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectComponent } from './ui/project/project.component';
import { MessagedialogComponent } from './ui/shared/messagedialog/messagedialog.component';
import { UserdialogComponent } from './ui/shared/userdialog/userdialog.component';
import { FilterPipe } from './pipe/filter.pipe';
import { OrderbyPipe } from './pipe/orderby.pipe';
import { AddtaskComponent } from './ui/task/addtask/addtask.component';
import { ViewtaskComponent } from './ui/task/viewtask/viewtask.component';
import { ProjectdialogComponent } from './ui/shared/projectdialog/projectdialog.component';
import { ParenttaskdialogComponent } from './ui/shared/parenttaskdialog/parenttaskdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProjectComponent,
    MessagedialogComponent,
    UserdialogComponent,
    FilterPipe,
    OrderbyPipe,
    AddtaskComponent,
    ViewtaskComponent,
    ProjectdialogComponent,
    ParenttaskdialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,    
    MatDialogModule    
  ],
  entryComponents:[
    UserdialogComponent,
    MessagedialogComponent,
    ProjectdialogComponent,
    ParenttaskdialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
