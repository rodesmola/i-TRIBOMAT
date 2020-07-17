import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { ProfileComponent } from './profile';
import { RegisterComponent } from './register';
import { PrivateComponent } from './private';
import { ServiceComponent } from './service';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
    { path: 'private', component: PrivateComponent, canActivate: [AuthGuard]  },
    { path: 'service', component: ServiceComponent, canActivate: [AuthGuard]  },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
