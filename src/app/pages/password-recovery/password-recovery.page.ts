import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage implements OnInit {

  passwordResetForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public auth: AngularFireAuth, public router: Router, public toastController: ToastController) { }

  ngOnInit() {
    this.passwordResetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit(): void {
    if(this.passwordResetForm.valid) {
      this.auth.sendPasswordResetEmail(this.passwordResetForm.get('email').value)
      .then(() => {
        this.showRedirectionToast();
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

  async showRedirectionToast() {
    const toast = await this.toastController.create({
      message: "The reset email was sent to your inbox",
      buttons: [
        {
          side: 'start',
          icon: 'arrow-back-outline',
          text: 'Go back to login page',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    toast.present();
  }
}
