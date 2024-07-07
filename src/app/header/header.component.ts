import { Component } from '@angular/core';
import {NzSpaceComponent, NzSpaceItemDirective} from "ng-zorro-antd/space";
import {NzUploadComponent} from "ng-zorro-antd/upload";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzSpaceComponent,
    NzUploadComponent,
    NzButtonComponent,
    NzIconDirective,
    NzPopconfirmDirective,
    NzSpaceItemDirective
  ],
  template: `
    <div class="header_layout">
      <button nz-button nzType="default" [nzSize]="'small'" nzShape="circle"><span nz-icon nzType="question"></span></button>
      <button nz-button nzType="default" [nzSize]="'small'" nzShape="circle"><span nz-icon nzType="user"></span></button>
      <button nz-button nzType="default" [nzSize]="'small'" nzShape="circle"><span nz-icon nzType="logout"></span></button>
    </div>
  `,
  styles: [
      `.header_layout {
        width: 100%;
        display: flex;
        gap: 10px;
        padding: 10px 15px;
        background-color: #40a9ff;
      }`
  ]
})
export class HeaderComponent {

}
