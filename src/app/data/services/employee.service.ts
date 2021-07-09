import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee, EmployeeResponse } from '../models/employee.model';
import { environment } from '../../../environments/environment';
import { IEmployee } from '../interfaces/IEmployee.interface';

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  private url: string;

  constructor(
    private httpClient: HttpClient
  ) {
      this.url = environment.API_URL;
  }

  public loadEmployeeList(): Promise<Array<Employee>> {
    return new Promise<Array<Employee>>((resolve: any, reject: any) => {
      this.apiGetEmployeeList().subscribe(
            (employeeListData: Array<Employee>) => {
              resolve(employeeListData);
            },
            (error: any): void => {
              console.log("error ", error);
              reject(error);
            }
          );
    });
  }

  public loadAddEmployee(payload: IEmployee): Promise<EmployeeResponse> {
    return new Promise<EmployeeResponse>((resolve: any, reject: any) => {
        this.apiPostAddEmployee(payload).subscribe(
            (employeeResponse: EmployeeResponse) => {
              resolve(employeeResponse);
            },
            (error): void => {
              reject(error);
            }
          );
    });
  }

  public loadDeleteEmployee(id: string): Promise<EmployeeResponse> {
    return new Promise<EmployeeResponse>((resolve: any, reject: any) => {
        this.apiDeleteEmployee(id).subscribe(
            (employeeResponse: EmployeeResponse) => {
              resolve(employeeResponse);
            },
            (error): void => {
              reject(error);
            }
          );
    });
  }

  private apiGetEmployeeList(): Observable<Array<Employee>> {
    const endPointUrl = `${this.url}/list`;
    return this.httpClient.get(endPointUrl).pipe(map((data: Array<Employee>) => data));
  }

  private apiPostAddEmployee(payload: IEmployee): Observable<EmployeeResponse> {
    const endPointUrl = `${this.url}/add`;
    return this.httpClient.post(endPointUrl, payload).pipe(map((data: EmployeeResponse) => data));
  }

  private apiDeleteEmployee(payload: string): Observable<EmployeeResponse> {
    const endPointUrl = `${this.url}/delete/${payload}`;
    return this.httpClient.delete(endPointUrl).pipe(map((data: EmployeeResponse) => data));
  }

}
