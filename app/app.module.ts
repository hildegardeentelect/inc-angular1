import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JwPaginationComponent } from 'jw-angular-pagination';
// import { MatDialogRef } from '@angular/material';
// import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDialogModule } from '@angular/material';

// import { FilterPipe }from './supplier-list/filter.pipe';
import { AppComponent } from './app.component';
import { DialogContentExampleDialog } from './supplier-list/popup-component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';


@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatNativeDateModule,
    RouterModule.forRoot([
      { path: '', component: SupplierListComponent },
    ])
  ],
  entryComponents: [
    DialogContentExampleDialog
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProductListComponent,
    ProductAlertsComponent, 
    SupplierListComponent,
    JwPaginationComponent, 
    DialogContentExampleDialog
    
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/