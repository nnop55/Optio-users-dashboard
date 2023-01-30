import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { addUserReducer, deleteUserReducer, getRoleReducer, getUserReducer, updateUserReducer } from './store/reducer/users.reducer';
import { UsersEffects } from './store/effects/users.effects';



const materialModules = [
  MatSidenavModule,
  MatInputModule,
  MatButtonModule,
  MatPaginatorModule,
  MatTableModule,
  MatIconModule,
  MatSelectModule,
  MatSortModule,
];

const ngrxModules = [
  StoreModule.forRoot({}, {}),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  StoreModule.forFeature("getUsers", getUserReducer),
  StoreModule.forFeature("updateUsers", updateUserReducer),
  StoreModule.forFeature("deleteUsers", deleteUserReducer),
  StoreModule.forFeature("addUsers", addUserReducer),
  StoreModule.forFeature("getRoles", getRoleReducer),
  EffectsModule.forFeature([UsersEffects])
]

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    materialModules,
    FormsModule,
    HttpClientModule,
    ngrxModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
