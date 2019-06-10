import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { DepartmentService } from 'src/app/shared/department.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private svc: EmployeeService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.svc.getEmployees();
  }

  onClear() {
    this.svc.form.reset();
    this.svc.initializeFormGroup();
  }

  onSubmit() {
    if (this.svc.form.valid) {
      this.svc.insertEmployee(this.svc.form.value);
      this.onClear();
      this.notificationService.success('Submitted successfully');
    }
  }

}
