import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserData } from '../../shared/models/user.model';
import { WorkoutHistory } from '../../shared/models/workout.model';
import { ProfileService } from '../../shared/services/profile.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  http: any;

  constructor( private UserService: UserService, private ProfileService: ProfileService,
    private authService: AuthService, private fb: FormBuilder, private router: Router){

  }

  userForm!: FormGroup;
  userForm2!: FormGroup;
  userForm3!: FormGroup;
  userId!: number;
  // Данные пользователя
  public userData!: UserData;
  private recId!: number;

  // Доступ к редактированию
  isEditing: boolean = false;

  // История тренировок
  public historyWorkout!: WorkoutHistory[];
  historyWorkoutSubscription!: Subscription;

  avatarUrl: string | ArrayBuffer | null = null;
  // Объявление переменной в компоненте
  selectedFitnessLevel: string = "Новичок";

  onSubmitFitnessLevel() {
    // Сохранение выбранного уровня подготовки
    console.log('Выбранный уровень подготовки:', this.selectedFitnessLevel);
    this.UserService.getUserIdByEmail().subscribe( (userId) => {
      const newFitnessLevel = this.selectedFitnessLevel;
      this.UserService.updateFitnessLevel(userId, newFitnessLevel).subscribe(updatedUser => {
        console.log('Updated fitnessLevel:', updatedUser.fitnessLevel);
        this.userData.fitnessLevel = newFitnessLevel;
      });
    })


  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result as string;
        console.log(this.avatarUrl + " <-- AVATAR_URL ");
         // Сохранение ссылки на аватарку в localStorage
        localStorage.setItem('avatarUrl', this.avatarUrl);
        // Обновление данных пользователя с путем к фото

        this.UserService.getUserIdByEmail().subscribe((userId) => {
          this.UserService.updateAvatarUrl(userId, this.avatarUrl).subscribe(updatedUser => {
            console.log('Путь к фото сохранен в db.json');
            this.userData.avatarUrl = this.avatarUrl;
          })

        })
      };
      reader.readAsDataURL(file);
    }
  }
    onSubmit() {

      this.UserService.getUserIdByEmail().subscribe( (userId) => {
        const newEmail = this.userForm.value.email;
        this.UserService.updateUserEmail(userId, newEmail).subscribe(updatedUser => {
          console.log('Updated email:', updatedUser.email);
          this.userForm.patchValue({ email: updatedUser.email });
          this.authService.localStorageEmail = newEmail;
          localStorage.setItem(this.authService.localStorageEmail, newEmail);
          console.log(localStorage.getItem(this.authService.localStorageEmail));
          this.userData.email = newEmail;
          alert("Перезайдите в свой аккаунт с новой почтой!");
          this.router.navigate(["/auth/registration"]);
        });
      })
    }

    onSubmit2(): void {
      this.UserService.getUserIdByEmail().subscribe(userId => {
        const newName = this.userForm2.value.name ;
        console.log(newName);
        this.UserService.updateUserName(userId, newName).subscribe(updatedUser => {
          console.log('Updated name:', updatedUser.name);
          this.userForm2.patchValue({ name: updatedUser.name });
          this.userData.name = newName;
        });
      });


      this.isEditing = false;

    }
    onSubmit3() {

      const newWeight = this.userForm3.value.weight;
      this.UserService.getUserIdByEmail().subscribe( (userId) => {
        this.UserService.updateUserWeight(userId, newWeight).subscribe(updatedUser => {
          console.log('Updated weight:', updatedUser.weight);
          this.userForm3.patchValue({ weight: updatedUser.weight });
          this.userData.weight = newWeight;
        })
      })
    }

  ngOnInit(): void {

    const savedAvatarUrl = localStorage.getItem('avatarUrl');
    if (savedAvatarUrl) {
      this.avatarUrl = savedAvatarUrl;
    }

    this.UserService.getUserIdByEmail().subscribe(userId => {
      this.historyWorkoutSubscription = this.ProfileService.getHistoryWorkout(userId).subscribe(workHis => {
        this.historyWorkout = workHis;
        console.log(workHis);
      })
    })
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')]],
    })
    this.userForm2 = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Zа-яА-ЯёЁ0-9 ]{2,}$')]],
    })
    this.userForm3 = this.fb.group({
      weight: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    })

    this.UserService.getUserIdByEmail().subscribe(userId => {
      this.UserService.getUser(userId).subscribe(data => {
        this.userData = data;
      });
    })

  }
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }



  removeRecord(date: string) {
    this.ProfileService.getIdByDate(date).subscribe( (recordId) => {
      this.recId = recordId;
      this.ProfileService.removeRecordFromHistory(recordId).subscribe({
        next: () => {
        let idx = this.historyWorkout.findIndex((data) => data.date === date)
        this.historyWorkout.splice(idx, 1);
        },
        error: (error) => {
        console.log('Ошибка при удалении записи: ', error);
        }
      });
    })
  }

  ngOnDestroy() {
    if(this.historyWorkoutSubscription) {
      this.historyWorkoutSubscription.unsubscribe();
    }
  }
}
