import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/system/home/home.component';
import { ProfileComponent } from './components/system/profile/profile.component';
import { AboutComponent } from './components/system/about/about.component';
import { WorkoutComponent } from './components/system/workout/workout.component';
import { BlogComponent } from './components/system/blog/blog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { AuthGuard } from './components/auth/auth.guard';


const routes: Routes = [
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},

  {path: 'auth', loadChildren: () => import('./components/shared/modules/auth.module').then((m) => m.AuthModule)},
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/registration', component: RegistrationComponent},
  {path: 'about', component: AboutComponent, canActivate: [AuthGuard]},
  {path: 'workout', component: WorkoutComponent, canActivate: [AuthGuard]},
  {path: 'workout', loadChildren: () => import('./components/system/workout/workout.module').then((m) => m.WorkoutModule)},
  {path: 'blog', component: BlogComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
