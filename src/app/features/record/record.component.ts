import {Component, inject} from '@angular/core';
import {NgIf} from "@angular/common";
import {
    SpeechConfig,
} from "microsoft-cognitiveservices-speech-sdk";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {HelperService} from "../helper/helper.service";
import {SpeechService} from "../helper/speech.service";

@Component({
    selector: 'app-record',
    standalone: true,
    imports: [
        NgIf,
        NzButtonComponent
    ],
    templateUrl: './record.component.html',
    styleUrl: './record.component.scss'
})
export class RecordComponent {
    
    protected readonly helperService: HelperService = inject(HelperService);
    protected readonly speechService: SpeechService = inject(SpeechService);
    
    protected isRecording: boolean = false
    
    constructor() {
        this.speechService.speechConfig = SpeechConfig.fromSubscription("6d345534e918442f8dc7a8e1c0df8b53", "westeurope");
        this.speechService.speechConfig.speechSynthesisVoiceName = "en-US-AvaMultilingualNeural";
    }
    
    async recordingWrapper(): Promise<void> {
        const inputFields = this.helperService.getInputFields();
        
        return new Promise(async (resolve, reject) => {
            try {
                for (let item of inputFields) {
                    this.speechService.currentRecord = item;
                    await this.speechService.createPrompt(item.name);
                    await this.speechService.createRecording(item.formControlName);
                }
                resolve();
            } catch (error) {
                console.error("Error processing input fields:", error);
                reject(error);
            }
        });
    }
    
    async startRecording() {
        this.isRecording = true;
        this.recordingWrapper.call(this)
            .then(() => {
                this.isRecording = false;
                console.log("All input fields processed successfully.");
            })
            .catch(error => {
                this.isRecording = false;
                console.error("An error occurred while processing input fields:", error);
            });
    }
}
