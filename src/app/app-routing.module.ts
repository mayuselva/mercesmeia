import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthCustomerResolver } from './resolver/auth-customer.resolver';
import { AuthGuard } from './guards/auth.guard';
import { BaseComponent } from './base/base.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(s => s.LoginModule)},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  {
      path: '', component: BaseComponent,
      resolve : {
                  authCustomer : AuthCustomerResolver
                },
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
       children: [
          { path: 'home' , loadChildren: () => import('./home/home.module').then(s => s.HomeModule) },
          { path: 'home/cards', loadChildren: () => import('./cards/cards.module').then(s => s.CardsPageModule)},
          { path: 'home/my-profile', loadChildren: () => import('./my-profile/my-profile.module').then(s => s.MyProfilePageModule) },
        ]
  },
  { path: '**' , redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
