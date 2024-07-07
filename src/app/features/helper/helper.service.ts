import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PromptState, RecordData} from "./speech.service";

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  recordResult: BehaviorSubject<string> = new BehaviorSubject<string>('');
  recognizing = false;
  
  validateForm: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
  })
  
  getInputFields(): RecordData[] {
    return [
      {
        formControlName: 'firstname',
        name: 'First name',
        prompt: {
          state: PromptState.notStarted,
          errorMsg: ''
        }
      },
      {
        formControlName: 'lastname',
        name: 'Last name',
        prompt: {
          state: PromptState.notStarted,
          errorMsg: ''
        }
      },
      {
        formControlName: 'age',
        name: 'Age',
        prompt: {
          state: PromptState.notStarted,
          errorMsg: ''
        }
      }
    ]
  }
}