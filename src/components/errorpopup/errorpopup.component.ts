import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-errorpopup',
  templateUrl: './errorpopup.component.html',
  styleUrls: ['./errorpopup.component.less']
})
export class ErrorpopupComponent implements OnInit {
  @Output() errorPopupFun = new EventEmitter<string>();
  @Input() errmsg:string | undefined
  constructor() { }

  ngOnInit(): void {
    $("#errorModal").modal('show'); 
    }

  
  closebutton(){
    this.errorPopupFun.emit()
    $("#errorModal").modal('hide'); 
  }

}
