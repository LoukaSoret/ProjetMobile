import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public auth: AngularFireAuth, public router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  login(): void {
    if(this.loginForm.valid){
      this.auth.signInWithEmailAndPassword(
        this.loginForm.get('email').value, this.loginForm.get('password').value)
        .then(() => {
          this.router.navigate(['/home']);
        })
        .catch(() => {
          console.log('Log in error');
        });
    }
  }

  get errorControl() {
    return this.loginForm.controls;
  }
}
