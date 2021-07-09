import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, EmployeeResponse } from 'src/app/data/models/employee.model';
import { EmployeeService } from 'src/app/data/services/employee.service';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.less']
})
export class EmployeesPageComponent implements OnInit {
  public employeeList: Array<Employee>;
  public deleteResponse: EmployeeResponse;
  public showDeleteMessage: boolean;
  public errorListMsg: string = "Unable to load Employee List";
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.showDeleteMessage = false;
    this.employeeList = new Array<Employee>();
    this.getEmployees();
  }

  public deleteEmployee(id: string, index: number): void {
    this.employeeService.loadDeleteEmployee(id).then((employee: EmployeeResponse): void => {
      this.deleteResponse = employee;
      if (employee.success === true) {
        this.employeeList.splice(0, index);
      }
    })
    .catch((err): void => {
      this.deleteResponse = new EmployeeResponse(false, err['error']['msg']);
      console.log('Error deleting employee', err);
    })
    .finally((): void => {
      this.showDeleteMessage = true;
    });
  }

  public onClickCreate(): void {
    sessionStorage.setItem('employee-list', JSON.stringify(this.employeeList));
    this.router.navigate(['/employee/create']);
  }

  private getEmployees(): void {
    this.employeeService.loadEmployeeList().then((employeeData: Array<Employee>): void => {
        this.employeeList = employeeData;
      })
      .catch((err): void => {
        console.log('Error loading employee list', err);
      });
  }

}
