import {Component, inject} from '@angular/core';
import {NzTypographyComponent} from "ng-zorro-antd/typography";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {HelperService} from "../helper/helper.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-record-result',
  standalone: true,
  imports: [
    NzTypographyComponent,
    NzIconDirective,
    AsyncPipe
  ],
  templateUrl: './record-result.component.html',
  styleUrl: './record-result.component.scss'
})
export class RecordResultComponent {
  
  readonly helperService: HelperService = inject(HelperService);
  
}
