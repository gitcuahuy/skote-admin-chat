import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  // bread crumb items
 readonly breadCrumbItems: Array<{}>;
  constructor() {
    this.breadCrumbItems = [{ label: 'Quản lý nhân sự' }, { label: 'danh sách nhân sự', active: true }];
  }

  ngOnInit(): void {
  }

}
