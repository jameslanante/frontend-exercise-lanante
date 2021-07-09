export class Employee {
    constructor(
      public firstName: string,
      public lastName: string,
      public email: string,
      public id: string
    ) {}
}

export class EmployeeResponse {
    constructor(
        public success: boolean,
        public msg: string
    ) {}
}