import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class mainservice{
   public header=''
   public sidebardata={};
   public setListData: any;
   public pageloaderMainservice:boolean=false;
   public errorPopup:boolean=false
   public setSortFilerData:any
   
   filter = new FormGroup({
    //ebooks
    publisherName: new FormControl(false, Validators.required), 
    language: new FormControl(false, Validators.required),
    organizedBy: new FormControl(false, Validators.required),
    municipality: new FormControl(false, Validators.required),
    sector: new FormControl(false, Validators.required),
    moduleName: new FormControl(false, Validators.required),
    jobCountry: new FormControl(false, Validators.required),
  
    //training
  
  })

}