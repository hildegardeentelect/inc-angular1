import { Component,Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { products } from '../products';
import { MatDialog } from '@angular/material';
import { DialogContentExampleDialog } from './popup-component';
// import { range } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent {
  products = products;
  private apiUrl = 'http://frontendshowcase.azurewebsites.net/api/';
  data: any = {};
  searchText: string;

  suppliers: Array<any>;
  filteredSuppliers: Array<any>;
  pageOfItems: Array<any>;
  items: Array<any>;
  pager: any = {};

  
  newSupplier: string; 
  newCity: string; 
  newReference: string; 
  supplierToAdd: any ={};

  updatedCity:string; 
  updatedReference:string; 
  
  constructor(private http: Http, public dialog: MatDialog) {
    console.log('Hello :D');

    this.getSuppliers(); 
  }

  openDialog() {
    console.log("opening?")
    // const dialogRef;

      this.newSupplier="";
      this.newCity="";
      this.newReference="";
      const dialogRef = this.dialog.open(DialogContentExampleDialog, {
        data: {newSupplier: this.newSupplier, newCity: this.newCity, newReference: this.newReference}
      });

  
          // dialogRef.close
      dialogRef.afterClosed().subscribe(result => {

        if (result.newSupplier.length == 0) {
          if (confirm("Please enter a valid supplier name!")) {
            this.openDialog(); 
            // this.getSuppliers(); 
          } 
        } else {
          console.log('The dialog was closed');
          this.newSupplier = result;
          this.supplierToAdd.name = {};
          this.supplierToAdd.name = result.newSupplier;
          this.supplierToAdd.city = {};
          this.supplierToAdd.city = result.newCity;
          this.supplierToAdd.reference = {};
          this.supplierToAdd.reference = result.newReference;
          
          this.postData('Suppliers',this.supplierToAdd).subscribe(data => {
            console.log(data);
            window.alert("Supplier successfully added!");
            this.getSuppliers(); 
          })
        } 



      });
    


  }  


  getData(apicall: any) {
    return this.http.get(this.apiUrl+apicall) 
      .map((res: Response) => res.json())
  }
    
  postData(post: string, content: any = {}) {
    return this.http.post(this.apiUrl+post, content) 
      .map((res: Response) => res.json())
  }

  deleteData(deletefield: string, deleteID: string) {
    console.log(this.apiUrl+deletefield+'/'+deleteID)
    return this.http.delete(this.apiUrl+deletefield+'/'+deleteID) 
      .map((res: Response) => res.json())
  }

  addSupplier() {
    this.getData('Suppliers').subscribe(data => {
      console.log(data);
      this.suppliers = data; 
      // this.filteredSuppliers = data; 
      for (var x in this.suppliers) {
        this.suppliers[x].selected = {};
        this.suppliers[x].selected = false;
      }
      this.suppliers[0].selected = true;
      this.filteredSuppliers = this.suppliers;
      console.log(this.filteredSuppliers);
      this.searchText = "";
      this.setPage(1);
    })
  }

  updateSupplier(supplier: any={}) {
    // console.log(supplier);
    if (this.updatedCity.length > 0) supplier.city = this.updatedCity;
    if (this.updatedReference.length > 0) supplier.reference = this.updatedReference;

    this.postData('Suppliers',supplier).subscribe(data => {
      console.log(data);
      window.alert("Supplier successfully updated!");
      this.getSuppliers(); 
    })
  }

  getSuppliers() {
    this.getData('Suppliers').subscribe(data => {
      console.log(data);
      this.suppliers = data; 
      // this.filteredSuppliers = data; 
      for (var x in this.suppliers) {
        this.suppliers[x].selected = {};
        this.suppliers[x].selected = false;
      }
      this.suppliers[0].selected = true;
      this.filteredSuppliers = this.suppliers;
      console.log(this.filteredSuppliers);
      this.searchText = "";
      this.setPage(1);
    })
  }

  deleteSupplier(i) {
    if (confirm("Are you sure you would like to delete this supplier?")) {
      console.log("CONFIRMED DELETE " + i);
      
      this.deleteData('Suppliers', i).subscribe(data => {
        console.log(data);
        this.getSuppliers(); 
      })

      // this.getSuppliers(); 
    } else console.log("NOT CONFIRMED");
  }
  
  speak(i) {
    console.log("Testing..." + this.pager.pageSize);
    for (var x in this.suppliers) {
      if (i != x) this.suppliers[x].selected = 0;
    }

    this.updatedCity = this.suppliers[i].city;
    this.updatedReference = this.suppliers[i].reference;
    
    this.suppliers[i].selected = !this.suppliers[i].selected;
  }

  setPage(page) { 
    if(this.searchText.length > 0) {
      this.filteredSuppliers = this.suppliers.filter( it => 
        // console.log("Name " +it.name);console.log("Lower case" +it.name.toLowerCase());
        it.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else this.filteredSuppliers = this.suppliers; 

    // if (page < 1 || page > this.pager.totalPages) { return };
  
    this.pager = this.PagerService(this.filteredSuppliers.length, page, 15);
    this.items = this.filteredSuppliers.slice(this.pager.startIndex, this.pager.endIndex + 1);

    for (var x in this.filteredSuppliers) this.filteredSuppliers[x].selected = 0;      

  }

  getNumber(num) {
    return new Array(num);   
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.setPage(1);
      // alert("äre you sure?");
      // rest of your code
    }
  }
  
  PagerService(totalItems, currentPage, pageSize) {
      // default to first page
      currentPage = currentPage || 1;

      // default page size is 10
      pageSize = pageSize || 10;

      // calculate total pages
      var totalPages = Math.ceil(totalItems / pageSize);
      var startPage, endPage;
      if (totalPages <= 10) {
          // less than 10 total pages so show all
          startPage = 1;
          endPage = totalPages;
      } else {
          // more than 10 total pages so calculate start and end pages
          if (currentPage <= 6) {
              startPage = 1;
              endPage = 10;
          } else if (currentPage + 4 >= totalPages) {
              startPage = totalPages - 9;
              endPage = totalPages;
          } else {
              startPage = currentPage - 5;
              endPage = currentPage + 4;
          }
      }

      // calculate start and end item indexes
      var startIndex = (currentPage - 1) * pageSize;
      var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

      // create an array of pages to ng-repeat in the pager control
      var pages = endPage + 1 - startPage;

      // return object with all pager properties required by the view
      return {
          totalItems: totalItems,
          currentPage: currentPage,
          pageSize: pageSize,
          totalPages: totalPages,
          startPage: startPage,
          endPage: endPage,
          startIndex: startIndex,
          endIndex: endIndex,
          pages: pages
      };
    }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

