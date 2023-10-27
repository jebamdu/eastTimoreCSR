import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-pageloader',
  templateUrl: './pageloader.component.html',
  styleUrls: ['./pageloader.component.less']
})
export class PageloaderComponent implements OnInit {
  @Input() item? :string;

  constructor() { }
  
  ngOnInit(): void {
console.log("pageloadder")
  }

}
