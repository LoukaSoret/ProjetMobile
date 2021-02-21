import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import firebase from 'firebase';

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
    });
  }

  login(): void {
    if (this.loginForm.valid){
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

  async loginWithGoogle() {
    try {
      const googleUser = await Plugins.GoogleAuth.signIn() as any;
      const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
      await this.auth.signInAndRetrieveDataWithCredential(credential);
      this.router.navigate(['/home']);
    } catch (err) {
      console.log(err);
    }
  }

  get errorControl() {
    return this.loginForm.controls;
  }
}
