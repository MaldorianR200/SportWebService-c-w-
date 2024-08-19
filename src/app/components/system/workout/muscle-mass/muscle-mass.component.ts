import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkoutService } from 'src/app/components/shared/services/workout.service';
import { WorkoutHistory } from 'src/app/components/shared/models/workout.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutModule } from '../workout.module';
import { UserService } from 'src/app/components/shared/services/user.service';
import { Route, Router } from '@angular/router';
import { UserData } from 'src/app/components/shared/models/user.model';
@Component({
  selector: 'app-muscle-mass',
  templateUrl: './muscle-mass.component.html',
  styleUrls: ['./muscle-mass.component.scss']
})
export class MuscleMassComponent implements OnInit {
  constructor(private WorkoutService: WorkoutService, private UserService: UserService, private router: Router){}
  userData!: UserData;
  userId: number = 0;
  selectedWorkoutId: number = 1; // Выбранная тренировка
  pulse: number = 0; // Пульс пользователя (может быть ввод с формы)
  currentDate: Date = new Date(); // Дата выполнения тренировки
  type: string = "Силовая тренировка";
  ngOnInit(): void {
    this.UserService.getUserIdByEmail().subscribe(userId => {
      this.userId = userId;
      this.UserService.getUser(this.userId).subscribe(userData => {
        this.userData = userData;
        console.log(userData);
        console.log(userId);
      })

    })


  }
  // добавление пройденной тренировки в БД
  addWorkoutToHistory() {


    const formattedData = this.currentDate.toISOString();

    if(this.pulse < 50 || this.pulse > 250)
    {
      alert("Введите некорректные данные! Ваш пульс не может быть меньше 50 или больше 250! Вы ввели " + this.pulse);
    } else {
      alert("Данные успешно отправлены! Ваш пульс в конце тренировки: " + this.pulse);
      alert("Вас перенаправляют в профиль");


      this.UserService.updateUserCountWorkout(this.userId, this.userData.workoutCount += 1);
      this.WorkoutService.updateUserCountWorkout(this.userId, this.userData.workoutCount += 1 );
      this.WorkoutService.addWorkoutToHistory(this.userId, this.selectedWorkoutId, this.type, formattedData, this.pulse);
      this.router.navigate(["../../profile"]);
    }


  }
}
