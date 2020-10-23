import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signForm = new FormGroup({
      username: new FormControl('', {validators: [Validators.required]}),
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: Validators.required})
    });
  }

  onSubmit() {
    this.authService.signup({
      email: this.signForm.value.email,
      password: this.signForm.value.password,
      username: this.signForm.value.username
    });
  }
}
