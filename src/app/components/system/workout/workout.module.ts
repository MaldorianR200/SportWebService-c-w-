import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WeightLossComponent } from './weight-loss/weight-loss.component';
import { MuscleMassComponent } from './muscle-mass/muscle-mass.component';
import { YogaComponent } from './yoga/yoga.component';
import { ChoosingWorkoutComponent } from './choosing-workout/choosing-workout.component';
import { WorkoutRoutingModule } from './workout-routing.module';
import { SharedModule } from '../../shared/modules/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';






@NgModule({
  declarations: [
    WeightLossComponent,
    MuscleMassComponent,
    YogaComponent,
    ChoosingWorkoutComponent,


  ],
  imports: [
    CommonModule,
    WorkoutRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatGridListModule

  ],
  providers: [],
  exports: [

  ]
})
export class WorkoutModule { }
