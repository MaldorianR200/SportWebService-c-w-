import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserService } from './user.service';
import { WorkoutService } from './workout.service';
import { WorkoutHistory } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000'; // Подставьте адрес вашего сервера

  userId!: number;
  public localStorageEmail: string = "";
  constructor(private http: HttpClient, private UserService: UserService,
  private WorkoutService: WorkoutService) {}

  // Получение данных профиля с сервера
  getHistoryWorkout(userId: number): Observable<WorkoutHistory[]> {
    return this.http.get<WorkoutHistory[]>(`${this.apiUrl}/history?userId=${userId}`);
  }

  getLoggedInEmail() : string | null{
    console.log(this.localStorageEmail);
    return localStorage.getItem(this.localStorageEmail);
  }

  // Отправка обновлённых данных профиля на сервер
  updateProfileData(newProfileData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}`, newProfileData);
  }


  getIdByDate(date: string):  Observable<number> {
    const url = `${this.apiUrl}/history?date=${date}`;
    return this.http.get<any[]>(url).pipe(
      map(records => {
        const record = records.find(record => record.date === date);
        return record ? record.id : undefined;
      })
    );
  }

  removeRecordFromHistory(id: number) {
    console.log("Удаление записи под id: " + id);
    return this.http.delete<Observable<number>>(`${this.apiUrl}/history/${id}`);
  }
}
