import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Workout, WorkoutHistory } from '../models/workout.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workouts: Workout[] = [
    { id: 1, name: 'Кардио' },
    { id: 2, name: 'Силовая' },
    { id: 3, name: 'Йога' },
  ];
  private apiUrl = 'http://localhost:3000/history';
  private apiUsers = 'http://localhost:3000/users';
  private workoutHistory: WorkoutHistory[] = [];

  private workoutHistorySubject: BehaviorSubject<WorkoutHistory[]> = new BehaviorSubject<WorkoutHistory[]>([]);

  constructor(private http: HttpClient) {
    this.workoutHistorySubject.next(this.workoutHistory);
  }

  private selectedWorkout: Workout | null = null;

  // Получение списка тренировок
  getWorkouts(): Workout[] {
    return this.workouts;
  }

    // Получение текущей выбранной тренировки
    getSelectedWorkout(): Workout | null {
      return this.selectedWorkout;
    }

    // Установка выбранной тренировки
    setSelectedWorkout(workout: Workout): void {
      this.selectedWorkout = workout;
    }

  // Получение истории прохождения тренировок
  getWorkoutHistory(): Observable<WorkoutHistory[]> {
    return this.workoutHistorySubject.asObservable();
  }

  updateUserCountWorkout(userId: number, newCount: number): Observable<any> {
    console.log("New count: " + newCount + "  " + " userId: " + userId);
    return this.http.patch(`${this.apiUsers}/${userId}`, { workoutCount: newCount });
  }

  // Добавление прохождения тренировки в историю
  addWorkoutToHistory(userId: number, workoutId: number, type:string, date: string, pulse: number): void {
    const newWorkoutHistory: WorkoutHistory = {
      userId,
      workoutId,
      type,
      date,
      pulse
    };
    this.workoutHistory.push(newWorkoutHistory);
    this.workoutHistorySubject.next(this.workoutHistory);

    this.http.post<any>(this.apiUrl, newWorkoutHistory).subscribe({
      next: response => {
        // alert('Данные успешно отправлены на сервер:' + response);
        console.log('Данные успешно отправлены на сервер:', response);
        // Обработка успешного ответа сервера, если необходимо
      },
      error: error => {
        // alert('Ошибка при отправке данных на сервер:' + error);
        console.error('Ошибка при отправке данных на сервер:', error);
        // Обработка ошибок при отправке данных на сервер, если необходимо
      }
    }

    );
  }
}
