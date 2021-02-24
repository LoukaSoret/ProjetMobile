import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public auth: AngularFireAuth, public router: Router, public toastController: ToastController) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  register(): void {
    if(this.registerForm.valid){
      this.auth.createUserWithEmailAndPassword(
        this.registerForm.get('email').value, this.registerForm.get('password').value)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.errorToast(error);
      });
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
    return this.registerForm.controls;
  }

}
