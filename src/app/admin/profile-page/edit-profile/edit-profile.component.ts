import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { ProfileUser } from '../../../shared/interfaces';
import { AlertService } from '../../shared/services/alert.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  @ViewChild('input') InputRef: ElementRef;
  form: FormGroup;
  user: ProfileUser;
  logo: File;
  imagePreview: any = '';
  date: Date = new Date();
  updateSub: Subscription;

  constructor(private userService: UserService, private alertService: AlertService, private router: Router) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.user = users.find(user => user.uid === localStorage.getItem('uid'));
      this.form = new FormGroup({
        username: new FormControl(this.user.username, Validators.required),
        firstName: new FormControl(this.user.firstName, Validators.required),
        lastName: new FormControl(this.user.lastName, Validators.required),
        email: new FormControl(this.user.email, [Validators.required, Validators.email]),
        birthday: new FormControl(this.user.birthday, Validators.required),
        country: new FormControl(this.user.country),
        // зробити лого
      });
    });
  }

  submit() {
    this.updateSub = this.userService
      .update({
        ...this.user,
        username: this.form.value.username,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        birthday: this.form.value.birthday,
        country: this.form.value.country,
        logoSrc: this.imagePreview,
      })
      .subscribe(() => {
        this.alertService.success('You profile was changed');
        this.router.navigate(['/admin', 'user', localStorage.getItem('uid')]);
      });
  }

  ngOnDestroy() {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }

  triggerClick() {
    this.InputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.logo = file;
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }
}
