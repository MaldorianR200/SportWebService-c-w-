import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {tap, catchError } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public signUpForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private http: HttpClient, private router: Router){}

  public workoutCount: number = 0;
  public weight: number = 0;
  public pulse: number = 0;
  public isAuthenticated: boolean = true;
  public avatarUrl: string = "";
  public  fitnessLevel: string = "";
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{2,}')]],
      email: ['', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
      password: ['',[Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,}')]],

    },)

  }

  signUp() {
    const { name, email, password} = this.signUpForm.value;

    if (this.signUpForm.valid) {
      console.log('Успешно:', this.signUpForm.value);
      // Дальнейшая логика обработки данных формы
    } else {
      console.log('Неверная форма');
    }

    this.authService.checkEmailExists(email).subscribe({
      next: (data: any[]) => {
        const exists = data.some(entry => entry.email === email);
        if (exists) {
          alert('Этот адрес электронной почты уже зарегистрирован.');
          console.log('Этот адрес электронной почты уже зарегистрирован.');
          this.signUpForm.reset(); // Сброс формы к исходному состоянию
          this.router.navigate(["auth/registration"]);
        } else {
          console.log('Этот адрес электронной почты свободен для регистрации.');
          this.authService.registration(name, email, password, this.workoutCount, this.weight,
            this.pulse, this.isAuthenticated, this.avatarUrl, this.fitnessLevel)
          .pipe(
            tap((res) => {
              alert('SIGNUP SUCCESSFUL');
              this.signUpForm.reset();
              this.router.navigate(["auth/login"]);
            }),
            catchError((err) => {
              console.error("Ошибка регистрации:", err);
              alert("Что-то пошло не так");
              throw err;
            })
          )
          .subscribe();
        }
      },
      error: (error) => {
        console.error('Произошла ошибка при проверке почты:', error);
        // Обработка ошибок при проверке почты
      }
  });



  }


}
