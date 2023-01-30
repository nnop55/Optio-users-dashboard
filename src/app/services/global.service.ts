import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Find } from '../models/find.model';
import { Save } from '../models/save.model';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {                             //Headers for authorization
  headers: any = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${environment.auth_token}` });

  constructor(private http: HttpClient) { }

  getUsers(body: User): Observable<Find> {                //Get users data
    return this.http.post<Find>(`${environment.baseUrl}/admin/users/find`, body, { headers: this.headers })
  }

  addSaveUser(body: User): Observable<Save> {             //Add or update user
    return this.http.post<Save>(`${environment.baseUrl}/admin/users/save`, body, { headers: this.headers })
  }

  removeUser(body: any): Observable<boolean> {           //Remove user
    return this.http.post<boolean>(`${environment.baseUrl}/admin/users/remove/`, body, { headers: this.headers })
  }

  getRoles(body: any): Observable<any> {                  //Get roles data
    return this.http.post<any>(`${environment.baseUrl}/reference-data/find`, body, { headers: this.headers })
  }

}
