import { NgModule } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AppModule } from 'src/app/app.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [ReactiveFormsModule, FormsModule],
  exports: [ReactiveFormsModule, FormsModule]

})
export class SharedModule { }
