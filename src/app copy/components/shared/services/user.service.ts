import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { retry, Observable, of, map, catchError  } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private AuthService: AuthService, private http: HttpClient) { }

  private userDataKey = 'userData'; // Ключ для сохранения данных

  private apiUrl = 'http://localhost:3000/users';
  public userEmail = this.AuthService.getLoggedInEmail();
  getUserIdByEmail(): Observable<number> {
    const url = `${this.apiUrl}?email=${this.userEmail}`; // Формируем URL запроса с параметром email
    return this.http.get<any[]>(url).pipe(
      map(users => {
        const user = users.find(user => user.email === this.userEmail);

        return user ? user.id : undefined;
      })
    );
  }

  getCachedUser(): any {
    const userData = localStorage.getItem(this.userDataKey);
    return userData ? JSON.parse(userData) : null; // Возвращение сохраненных данных из Local Storage
  }

  updateUserCountWorkout(userId: number, newCount: number): Observable<any> {
    console.log("New count: " + newCount + "  " + " userId: " + userId);
    return this.http.patch(`${this.apiUrl}/${userId}`, { workoutCount: newCount });
  }

  updateUserWeight(userId: number, newWeight: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}`, { weight: newWeight });
  }
  updateUserName(userId: number, newName: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}`, { name: newName });
  }
  updateFitnessLevel(userId: number, newFitnessLevel: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}`, { fitnessLevel: newFitnessLevel });
  }
  updateAvatarUrl(userId: number, newAvatarUrl: string | null | ArrayBuffer): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}`, { avatarUrl: newAvatarUrl });
  }
  updateUserEmail(userId: number, newEmail: string): Observable<any> {
    localStorage.setItem(this.AuthService.localStorageEmail, newEmail);
    return this.http.patch(`${this.apiUrl}/${userId}`, { email: newEmail });
  }
  getUsers() {
    return this.http.get<UserData[]>(this.apiUrl);
  }
  getUser(id: number){
    return this.http.get<UserData>(`${this.apiUrl}/${id}`);
  }
}
