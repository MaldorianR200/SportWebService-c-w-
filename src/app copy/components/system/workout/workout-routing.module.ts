import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeightLossComponent } from './weight-loss/weight-loss.component';
import { MuscleMassComponent } from './muscle-mass/muscle-mass.component';
import { YogaComponent } from './yoga/yoga.component';
import { ChoosingWorkoutComponent } from './choosing-workout/choosing-workout.component';
import { AppModule } from 'src/app/app.module';
import { WorkoutComponent } from './workout.component';


const workoutRoutes: Routes = [
  { path: 'choosing-workout', component: ChoosingWorkoutComponent},
  { path: 'weight-loss', component: WeightLossComponent },
  { path: 'muscle-mass', component: MuscleMassComponent },
  { path: 'yoga', component: YogaComponent}
];

@NgModule({
  imports: [ RouterModule.forChild(workoutRoutes)],
  exports: [RouterModule],
})
export class WorkoutRoutingModule { }
