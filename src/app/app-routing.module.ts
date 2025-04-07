import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiniProjectComponent } from './mini-project/mini-project.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuardGuard } from './authentication-guard.guard';
import { HomeComponent } from './home/home.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

const routes: Routes = [
  {path:'mini-project',component:MiniProjectComponent,canActivate:[AuthenticationGuardGuard],children:[
    {path:'home', component:HomeComponent},
    {path:'create-employee',component:CreateEmployeeComponent},
    {path:'create-employee/:id',component:CreateEmployeeComponent},
    {path:'all-employees',component:AllEmployeesComponent},
    {path:'employee-details/:id',component:EmployeeDetailsComponent},

  ]},
  {path:'',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
