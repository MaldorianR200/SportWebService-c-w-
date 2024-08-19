import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/components/shared/models/user.model';
import { WorkoutService } from 'src/app/components/shared/services/workout.service';
import { UserService } from 'src/app/components/shared/services/user.service';


@Component({
  selector: 'app-yoga',
  templateUrl: './yoga.component.html',
  styleUrls: ['./yoga.component.scss']
})
export class YogaComponent implements OnInit{
  constructor(private WorkoutService: WorkoutService, private UserService: UserService, private router: Router){}
  userData!: UserData;
  userId: number = 0;
  selectedWorkoutId: number = 3; // Выбранная тренировка
  pulse: number = 0; // Пульс пользователя (может быть ввод с формы)
  currentDate: Date = new Date(); // Дата выполнения тренировки
  type: string = "Йога";
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

  addWorkoutToHistory() {


    const formattedData = this.currentDate.toISOString();

    if(this.pulse < 50 || this.pulse > 250)
    {
      alert("Введите некорректные данные! Ваш пульс не может быть меньше 50 или больше 250! Вы ввели " + this.pulse);
    } else {
      alert("Данные успешно отправлены! Ваш пульс в конце тренировки: " + this.pulse);
      alert("Вас перенаправляют в профиль");


      this.UserService.updateUserCountWorkout(this.userId, this.userData.workoutCount += 1);
      this.WorkoutService.addWorkoutToHistory(this.userId, this.selectedWorkoutId, this.type, formattedData, this.pulse);
      this.router.navigate(["../../profile"]);
    }


  }
}
