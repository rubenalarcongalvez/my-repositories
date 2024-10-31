import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    AvatarModule,
    CardModule,
    ButtonModule,
    CheckboxModule,
    ToastModule,
    SelectButtonModule
  ]
})
export class StyleModule { }
