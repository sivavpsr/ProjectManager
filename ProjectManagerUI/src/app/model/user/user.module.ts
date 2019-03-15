import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class UserModule {
  public UserId: number;
  public FirstName: string;
  public LastName: string;
  public UserName: string;
}
