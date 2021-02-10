import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AngularFireAuthGuard], data: {authGuardPipe: () => redirectUnauthorizedTo(['login'])}
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'list-details/:listId',
    loadChildren: () => import('./pages/list-details/list-details.module').then( m => m.ListDetailsPageModule),
    canActivate: [AngularFireAuthGuard], data: {authGuardPipe: () => redirectUnauthorizedTo(['login'])}
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard], data: {authGuardPipe: () => redirectLoggedInTo(['home'])}
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule),
    canActivate: [AngularFireAuthGuard], data: {authGuardPipe: () => redirectLoggedInTo(['home'])}
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
