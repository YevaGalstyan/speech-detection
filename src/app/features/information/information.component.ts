import {Component, inject} from '@angular/core';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {ReactiveFormsModule} from "@angular/forms";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {NgForOf, NgIf} from "@angular/common";
import {RecordComponent} from "../record/record.component";
import {RecordResultComponent} from "../record-result/record-result.component";
import {HelperService} from "../helper/helper.service";
import {PromptState, RecordData, SpeechService} from "../helper/speech.service";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-information',
  standalone: true,
  imports: [
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormControlComponent,
    ReactiveFormsModule,
    NzColDirective,
    NzInputDirective,
    NzInputGroupComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzRowDirective,
    NzButtonComponent,
    NzCheckboxComponent,
    NzTabSetComponent,
    NzTabComponent,
    NgIf,
    RecordComponent,
    RecordResultComponent,
    NgForOf,
    NzIconDirective
  ],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss'
})
export class InformationComponent {
  protected readonly helperService: HelperService = inject(HelperService);
  protected readonly speechService: SpeechService = inject(SpeechService);
  
  inputFields: RecordData[] = []
  
  constructor() {
    this.inputFields = this.helperService.getInputFields();
  }
  
  protected readonly PromptState = PromptState;
}