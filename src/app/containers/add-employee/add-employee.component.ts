import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidator, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee, EmployeeResponse } from 'src/app/data/models/employee.model';
import { EmployeeService } from 'src/app/data/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.less']
})
export class AddEmployeeComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }
  public employeeList: Array<Employee>;
  public createResponse: EmployeeResponse;
  public showCreateMessage: boolean;
  public employeeFormGroup: FormGroup;

  public ngOnInit(): void {
    this.showCreateMessage = false;
    this.employeeList = new Array<Employee>();
    this.employeeList = JSON.parse(sessionStorage.getItem('employee-list'))
    ? JSON.parse(sessionStorage.getItem('employee-list')) : this.getEmployees();
    this.initializeFormGroup();
  }

  public get isUniqueID(): boolean {
    console.log('load', true);
    const uniqueID = this.employeeList.some((employee) => employee.id !== this.employeeFormGroup.get('id').value); 
    return uniqueID;
  }

  public onClickCreate(): void {
    if (this.employeeFormGroup.invalid) {
      return;
    }
    const payload = this.employeeFormGroup.value;
    this.employeeService.loadAddEmployee(payload).then((employee: EmployeeResponse): void => {
      this.createResponse = employee;
      if (employee.success === true) {
        this.employeeList.push(this.employeeFormGroup.value);
        this.employeeFormGroup.reset();
      }
    })
    .catch((err): void => {
      this.createResponse = new EmployeeResponse(false, err['error']['msg']);
      console.log('Error creating employee', err);
    })
    .finally((): void => {
      this.showCreateMessage = true;
    });
  }

  private getEmployees(): void {
    this.employeeService.loadEmployeeList().then((employeeData: Array<Employee>): void => {
        this.employeeList = employeeData;
      })
      .catch((err): void => {
        console.log('Error loading employee list', err);
      });
  }

  private initializeFormGroup(): void {
    this.employeeFormGroup = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      id: new FormControl(null, Validators.required)
    });
  }

}
