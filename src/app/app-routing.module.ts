import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { EmployeesPageComponent } from './containers/employees-page/employees-page.component';
import {AddEmployeeComponent} from './containers/add-employee/add-employee.component';
const mainRoute: Route = {
  path: "",
  component: EmployeesPageComponent
};

const createRoute: Route = {
  path: "employee/create",
  component: AddEmployeeComponent
}

const errorRoute: Route = {
  path: "**",
  redirectTo: "",
};

const routes: Routes = [mainRoute, createRoute, errorRoute];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
