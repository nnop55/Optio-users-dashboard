import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { GlobalService } from '../services/global.service';
import { User } from '../models/user.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { addUsersSelector, deleteUsersSelector, getRolesSelector, getUsersSelector, updateUsersSelector } from '../store/selector/users.selector';
import { invokeDeleteUserAPI, invokeRolesApi, invokeSaveUserAPI, invokeUpdateUserAPI, invokeUsersApi, } from '../store/action/users.action';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  total!: number;
  userItem: User = new User();
  disableSaveBtn: boolean = true;
  searchData: any = new Object();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('search') search!: ElementRef;
  @ViewChild(MatPaginator, { static: true }) matPaginator!: MatPaginator;

  isOpened: boolean = false;

  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'Roles', 'locked', 'Delete'];
  dataSource = new MatTableDataSource();

  rolesData: any[] = [];

  userStatus: any[] = [
    { value: true, viewValue: 'Active' },
    { value: false, viewValue: 'InActive' },
  ];

  constructor(private _service: GlobalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private store: Store<any>) { }

  ngOnInit(): void {
    this.getRoles();
    this.getParams();

  }

  updateRouteParameters() {               //Updating router params while data changed
    const params = {
      pageIndex: this.matPaginator.pageIndex,
      pageSize: this.matPaginator.pageSize,
      search: this.searchData['search'],
      active: this.searchData['sortBy'],
      direction: this.searchData['sortDirection'],
    };

    const urlTree = this.router.createUrlTree([''], {
      relativeTo: this.activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge',
    });

    //Update route with Query Params
    this.location.go(urlTree.toString());
  }

  getParams() {                                  //Get router params for change data
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.matPaginator.pageIndex = params['pageIndex'];
      this.matPaginator.pageSize = params['pageSize'];
      this.searchData['search'] = params['search'];
      this.searchData['sortBy'] = params['active'];
      this.searchData['sortDirection'] = params['direction'];

      this.getUsers(false, false);

    })
  }


  ngAfterViewInit() {                       //Debounce time for search 
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => {
          this.getUsers(true);
        })
      )
      .subscribe();
  }


  validation() {                          //Check inputs validation for disable or enable save/add button
    if (this.userItem.email != '' && this.userItem.firstName != '' && this.userItem.lastName != ''
      && this.userItem.locked != undefined && this.userItem.roles && this.userItem.roles.length > 0) {
      this.disableSaveBtn = false;
    } else {
      this.disableSaveBtn = true
    }
  }


  getRoles() {                      //Subscribe roles data 
    const postData = {
      "typeId": 4,
      "sortBy": "name",
      "sortDirection": "asc",
      "pageIndex": 0,
      "pageSize": 50,
      "includes": [
        "code", "name"
      ]
    }

    this.store.dispatch(invokeRolesApi({ payload: postData }));

    this.store.select(getRolesSelector).subscribe((res: any) => {
      if (res.success) {
        this.rolesData = res.data.entities;
      }
    })

  }


  getUsers(fromSearch: boolean = false, updateUrl: boolean = true) {  //Subscribe users data

    if (fromSearch) {
      this.matPaginator.pageIndex = 0;
    }


    if (updateUrl) {
      this.updateRouteParameters();
    }

    const postData = {        //Data for body. Search and paginator data
      "pageIndex": this.matPaginator.pageIndex ? this.matPaginator.pageIndex : 0,
      "pageSize": this.matPaginator.pageSize ? this.matPaginator.pageSize : 5,
      ...this.searchData
    }

    this.store.dispatch(invokeUsersApi({ payload: postData }));

    this.store.select(getUsersSelector).subscribe((res: any) => {
      if (res.success) {
        this.dataSource.data = res.data.entities;
        this.total = res.data.total;
      }
    })

  }

  createUser() {              //Add user 
    if (!this.disableSaveBtn) {
      this.validation();

      this.store.dispatch(invokeSaveUserAPI({ payload: this.userItem }));

      this.store.pipe(select(addUsersSelector)).subscribe((res: any) => {
        if (res.success) {
          this.userItem = new User();
          Swal.fire('User Added', '', 'success')
          this.getUsers();
          this.closeDrawer();
        } else {
          Swal.fire('User already Exist', '', 'info')
        }
      })
    }
  }

  updateUser() {            //Update user
    if (!this.disableSaveBtn) {
      this.validation();

      this.store.dispatch(invokeUpdateUserAPI({ payload: this.userItem }));
      console.log(this.userItem)
      this.store.select(updateUsersSelector).subscribe((res: any) => {
        if (res.success) {
          Swal.fire('User Updated', '', 'success')
          this.userItem = new User();
          this.getUsers();
          this.closeDrawer();
        }
      })
    }
  }

  deleteUser(id: any) {        //Subscribe for remove user and sweetalert2
    Swal.fire({
      title: 'Are you sure delete this user?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Cancel',
      denyButtonText: `Delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Cancelled', '', 'info')
      } else if (result.isDenied) {
        this.userItem.id = id;

        this.store.dispatch(invokeDeleteUserAPI({ id: this.userItem.id }));

        this.store.select(deleteUsersSelector).subscribe((res: any) => {
          if (res.success) {
            Swal.fire('User Deleted', '', 'success')
            this.getUsers();
          }
        })
      }
    })
  }

  getStatus(status: boolean) {        //Get status text in html True=Active, False=InActive
    return this.userStatus.filter((o: any) => o.value == status)[0].viewValue;
  }

  editUser(item: User) {             //Edit user from drawer.
    this.isOpened = true;
    this.userItem.id = item.id;
    this.userItem.email = item.email;
    this.userItem.firstName = item.firstName;
    this.userItem.lastName = item.lastName;
    this.userItem.locked = item.locked;
    this.userItem.roles = item.roles;
    this.validation();
  }

  sortBy() {          //Sort users by email, firstName, lastName, status.
    this.searchData['sortBy'] = this.sort.active;
    this.searchData['sortDirection'] = this.sort.direction;
    this.getUsers();
    console.log(this.sort)
  }

  addUser() {                 //Add user from drawer
    this.isOpened = true;
    this.userItem = new User();
  }

  closeDrawer() {              //Close drawer
    this.isOpened = false;
    this.userItem = new User();
  }



}


