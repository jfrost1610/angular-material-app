import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { DepartmentService } from 'src/app/shared/department.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private svc: EmployeeService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<EmployeeComponent>) {

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
      if (!this.svc.form.get('$key').value)
        this.svc.insertEmployee(this.svc.form.value);
      else
        this.svc.updateEmployee(this.svc.form.value);
      this.onClear();
      this.notificationService.success('Submitted successfully');
      this.onClose();
    }
  }

  onClose() {
    this.onClear();
    this.dialogRef.close();
  }

}
