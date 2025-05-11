import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { GlobalConstants } from './constants/global-constants';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManageTransactionsComponent } from './components/manage-transactions/manage-transactions.component';
import { ManageBooksComponent } from './components/manage-books/manage-books.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'manageTransactions', pathMatch: 'full'},
      {
        path: 'manageTransactions',
        component: ManageTransactionsComponent,
        canActivate: [authGuard],
        data: {
          allowedRoles: [
            GlobalConstants.NORMAL_ROLE_NAME,
            GlobalConstants.ADMIN_ROLE_NAME,
          ],
        },
      },
      {
        path: 'manageBooks',
        component: ManageBooksComponent,
        canActivate: [authGuard],
        data: {
          allowedRoles: [
            GlobalConstants.NORMAL_ROLE_NAME,
            GlobalConstants.ADMIN_ROLE_NAME,
          ],
        },
      },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    data: {
      allowedRoles: [
        GlobalConstants.NORMAL_ROLE_NAME,
        GlobalConstants.ADMIN_ROLE_NAME,
      ],
    },
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
