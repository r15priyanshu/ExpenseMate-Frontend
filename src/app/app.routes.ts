import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { GlobalConstants } from './constants/global-constants';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManageTransactionsComponent } from './components/manage-transactions/manage-transactions.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
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
