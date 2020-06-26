import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/interfaces';
import { AlertService } from '../shared/services/alert.service';
import { MustMatch } from '../shared/must-match.validator';

@Component({
  selector: 'app-singup-page',
  templateUrl: './singup-page.component.html',
  styleUrls: ['./singup-page.component.scss'],
})
export class SingupPageComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  message: string;

  constructor(public authService: AuthService, private router: Router, private alert: AlertService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl(null, Validators.required),
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.authService.register(user).subscribe(
      () => {
        this.form.reset();
        this.alert.success('Registration Successful. Please Login');
        this.router.navigate(['/admin', 'login']);
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      }
    );
  }
}
