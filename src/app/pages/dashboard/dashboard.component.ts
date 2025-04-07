import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardTabsComponent } from "../../components/dashboard-tabs/dashboard-tabs.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, DashboardTabsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
