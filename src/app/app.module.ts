import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/system/about/about.component';
import { AuthComponent } from './components/auth/auth.component';
import { BlogComponent } from './components/system/blog/blog.component';
import { HomeComponent } from './components/system/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SharedComponent } from './components/shared/shared.component';
import { WorkoutComponent } from './components/system/workout/workout.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { ProfileComponent } from './components/system/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WorkoutRoutingModule } from './components/system/workout/workout-routing.module';
import { UserService } from './components/./shared/services/user.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatOptionModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AuthComponent,
    BlogComponent,
    HomeComponent,
    NotFoundComponent,
    SharedComponent,
    WorkoutComponent,
    FooterComponent,
    HeaderComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CalendarModule,
    CommonModule,
    FullCalendarModule,
    WorkoutRoutingModule,
    MatCardModule,
    MatOptionModule,
    MatOptionModule,
    MatGridListModule

  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class AppModule { }
