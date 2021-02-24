import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import firebase from 'firebase';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public auth: AngularFireAuth, public router: Router, public toastController: ToastController) { }

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
        .catch(error => {
          this.errorToast(error);
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

  async errorToast(errorMessage: string) {
    const toast = await this.toastController.create({
      message: errorMessage,
      duration: 10000
    });
    toast.present();
  }

  get errorControl() {
    return this.loginForm.controls;
  }
}
