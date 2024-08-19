import { Component } from '@angular/core';
import { WorkoutService } from 'src/app/components/shared/services/workout.service';
import { Workout } from 'src/app/components/shared/models/workout.model';
@Component({
  selector: 'app-choosing-workout',
  templateUrl: './choosing-workout.component.html',
  styleUrls: ['./choosing-workout.component.scss']
})
export class ChoosingWorkoutComponent {

  constructor (private WorkoutService: WorkoutService){

  }

  images = [
    {
      id: 1,
      src: '../../../assets/images/WeightLoss.png',
      alt: 'Сброс веса',
      route: '/workout/weight-loss',
      titel: 'Кардио тренировки'
    },
    {
      id: 2,
      src: '../../../assets/images/MusculMass.png',
      alt: 'Набор массы',
      route: '/workout/muscle-mass',
      titel: 'Силовые тренировки'
    },
    {
      id: 3,
      src: '../../../assets/images/yoga.jpeg',
      alt: 'Йога',
      route: '/workout/yoga',
      titel: 'Йога'
    },
  ];


}
