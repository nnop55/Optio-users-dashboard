import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatTableDataSource } from '@angular/material/table';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { GlobalService } from '../services/global.service';
import { User } from '../models/user.model';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Find } from '../models/find.model';
import { Save } from '../models/save.model';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  roles: any[] = [];
  total!: number;
  userItem: User = new User();
  disableSaveBtn: boolean = true;
  pageEvent: PageEvent = new PageEvent();
  searchData: any = new Object();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('search') search!: ElementRef;

  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'Roles', 'locked', 'Delete'];
  dataSource = new MatTableDataSource();

  userStatus: any[] = [
    { value: true, viewValue: 'Active' },
    { value: false, viewValue: 'InActive' },
  ];

  constructor(private _service: GlobalService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit() {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.getUsers();
        })
      )
      .subscribe();
  }

  validation() {
    if (this.userItem.email != '' && this.userItem.firstName != '' && this.userItem.lastName != ''
      && this.userItem.locked != undefined && this.userItem.roles.length > 0) {
      this.disableSaveBtn = false;
    } else {
      this.disableSaveBtn = true
    }
  }

  pageChange(event: PageEvent) {
    this.pageEvent = event;
    this.getUsers();
  }

  getUsers() {
    const postData = {
      "pageIndex": this.pageEvent.pageIndex ? this.pageEvent.pageIndex : 0,
      "pageSize": this.pageEvent.pageSize ? this.pageEvent.pageSize : 5,
      ...this.searchData
    }

    this._service.getUsers(postData).subscribe((res: Find) => {
      if (res.success) {
        this.dataSource.data = res.data.entities;
        this.total = res.data.total;
      }
    });
  }

  addSaveUser() {
    this._service.addSaveUser(this.userItem).subscribe((res: Save) => {
      if (res.success) {
        this.userItem = new User();
        this.getUsers();
      }
    })
  }

  deleteUser(id: any) {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Cancel',
      denyButtonText: `Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Cancelled', '', 'info')
      } else if (result.isDenied) {
        this.userItem.id = id;
        this._service.removeUser(this.userItem).subscribe((res: any) => {
          if (res.success) {
            this.getUsers();
            Swal.fire('Deleted', '', 'success')
          }
        })
      }
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value != "") {
      this.userItem.roles.push(value);
      this.validation();
    }

    event.chipInput!.clear();
  }

  remove(index: number): void {
    if (index >= 0) {
      this.userItem.roles.splice(index, 1);
      this.validation();
    }
  }

  getStatus(status: boolean) {
    return this.userStatus.filter((o: any) => o.value == status)[0].viewValue;
  }

  editUser(item: any) {
    this.userItem = item;
    this.validation();
  }

  sortBy(event: Sort) {
    this.searchData['sortBy'] = event.active;
    this.searchData['sortDirection'] = event.direction;
    this.getUsers();
  }

  drawerChange(show: boolean) {
    if (!show) {
      this.userItem = new User();
    }
  }

}
