import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AbstractControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {map, catchError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  public loginForm !: FormGroup;
  constructor(private formbuilder: FormBuilder, private userService: UserService,
    private authService: AuthService, private http: HttpClient, private router: Router) {}  // инициализируем переменную, которую позже используем (!(not-error))
  email: string = '';
  password: string = '';


  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{8,}')]]
    })
  }


  login(): void {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password)
    .pipe(
      map((res) => {
        return res.find((a: any) => a.email === this.loginForm.value.email && a.password === this.loginForm.value.password);
      }),
      catchError((err) => {
        console.error("Ошибка при входе в систему:", err);
        alert("Что-то пошло не так");
        throw err;
      })
    )
    .subscribe((user) => {
      if (user) {
        this.authService.isAuthenticated = true;
        console.log(this.authService.isAuthenticated);
        alert('Аутификация успешна!');
        const { email, password } = this.loginForm.value;
        this.authService.setIsAuthenticated(true);
        localStorage.setItem(this.authService.localStorageEmail, email);
        console.log(email);
        console.log(localStorage.getItem(this.authService.localStorageEmail));
        this.loginForm.reset();
        this.router.navigate(["../../home"]);
      } else {
        alert("Пользователь не найден");
      }
    });
  }
}






