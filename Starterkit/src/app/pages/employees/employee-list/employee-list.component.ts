import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IUser} from "@core/models/auth.models";
import {ActivatedRoute, Data, Router} from "@angular/router";
import { UserProfileService } from '@core/services/user.service';
import {ROUTER_CONSTANT} from "@shared/constants/router.constant";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  // bread crumb items
  readonly breadCrumbItems: Array<{}>;
  searchResult: IUser[] = [];

  constructor(private cdr: ChangeDetectorRef,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserProfileService
  ) {
    this.breadCrumbItems = [{label: 'Quản lý nhân sự'}, {label: 'danh sách nhân sự', active: true}];
  }

  expandSet = new Set<number>();

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  ngOnInit(): void {
    this.onSearch()
  }

  // =========== FETCH DATA ==============
  onSearch(keyword?: string) {
    this.userService.search({keyword}).subscribe((data) => {
      this.searchResult = data;
      console.log('searchResult', this.searchResult )
      this.cdr.detectChanges()
    })
  }
  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    console.log(listOfCurrentPageData)
  }
  // =========== HANDLE ACTIONS ==============
  onDetail(id?: string): void {
    console.log('onDetail', id)
    if (!id) {
      console.warn('id is null')
      return;
    }
    this.router.navigate([ROUTER_CONSTANT.employees.detailEmployee(id)])
  }

  onUpdate(id?: string): void {
    console.log('onUpdate', id)
    if (!id) {
      console.warn('id is null')
      return;
    }
    this.router.navigate([ROUTER_CONSTANT.employees.updateEmployee(id)])
  }

  onCreate(): void {
    console.log('onCreate')
    this.router.navigate([ROUTER_CONSTANT.employees.createEmployee])
  }
  // =========== UTILS ==============

  trackByIndex(_: number, data: IUser): string {
    return data.id;
  }
}
