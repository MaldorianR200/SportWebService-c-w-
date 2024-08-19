import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError } from 'rxjs';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {



  public id!: number;
  public userEmail!: string;
  public localStorageEmail: string = "";
  public isAuthenticated: boolean;
  private apiUrl = 'http://localhost:3000/users';
  loggedInEmail!: string;
  constructor(private http: HttpClient) {
    this.isAuthenticated = false;
  }


  login(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getIsAuthenticated(id: number, filedName: string = "isAuthenticated"): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${id}`).pipe(
      map((item: any) => item[filedName])
    )
  }

  // updateUserWeight(userId: number, newWeight: number): Observable<any> {
  //   return this.http.patch(`${this.apiUrl}/${userId}`, { weight: newWeight });
  // }


  // Метод для изменения значения isAuthenticated
  getUserIdByEmail(): Observable<number> {
    const url = `${this.apiUrl}?email=${this.userEmail}`; // Формируем URL запроса с параметром email
    return this.http.get<any[]>(url).pipe(
      map(users => {
        const user = users.find(user => user.email === this.userEmail);

        return user ? user.id : undefined;
      })
    );
  }
  setIsAuthenticated(value: boolean): Observable<any> {
    this.getUserIdByEmail().subscribe(userId => {
      this.id = userId;
      console.log(value);

    })
    return this.http.patch(`${this.apiUrl}/${this.id}`, { isAuthenticated: value });
  }

  getLoggedInEmail() : string | null{
    console.log(this.localStorageEmail);
    return localStorage.getItem(this.localStorageEmail);
  }

  checkEmailExists(email: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


  registration(name: string, email: string, password: string, workoutCount: number, weight: number,
    pulse: number, isAuthenticated: boolean, avatarUrl: string, fitnessLevel: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { name, email, password, workoutCount, weight, pulse, isAuthenticated,
      avatarUrl, fitnessLevel});
  }

  // isAuthenticatedUser(): boolean | any {
  //   return this.getIsAuthenticated();

  // }

  logout(): void {
    // Реализация логики выхода
    this.setIsAuthenticated(false);
  }






}
