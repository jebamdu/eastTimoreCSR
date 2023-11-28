import { Injectable } from '@angular/core';

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
   


}