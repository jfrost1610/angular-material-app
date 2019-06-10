import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private svc: EmployeeService) { }

  listData: MatTableDataSource<any>;
  // Control the columns displayed and their order from here
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'actions'];

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  ngOnInit() {
    this.svc.getEmployees().subscribe(
      list => {
        let array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listData = new MatTableDataSource(array);
        this.listData.sort = this.sort;
      }
    );
  }

}
