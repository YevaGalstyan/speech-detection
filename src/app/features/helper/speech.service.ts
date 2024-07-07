import {inject, Injectable} from '@angular/core';
import {
    AudioConfig,
    ResultReason,
    SpeakerAudioDestination,
    SpeechConfig, SpeechRecognizer,
    SpeechSynthesizer
} from "microsoft-cognitiveservices-speech-sdk";
import {HelperService} from "./helper.service";

@Injectable({
    providedIn: 'root'
})
export class SpeechService {
    speechConfig!: SpeechConfig;
    currentRecord!: RecordData;
    
    protected readonly helperService: HelperService = inject(HelperService);
    
    private lastRecognized: string = '';
    _recognizer!: SpeechRecognizer | undefined;
    
    constructor() {
    }
    
    async createPrompt(text: string): Promise<void> {
        const player = new SpeakerAudioDestination();
        const audioConfig = AudioConfig.fromSpeakerOutput(player);
        const synthesizer = new SpeechSynthesizer(this.speechConfig, audioConfig);
        
        this.currentRecord.prompt.state = PromptState.started
        
        return new Promise((resolve, reject) => {
            synthesizer.speakTextAsync(text,
                result => {
                    synthesizer.close();
                    player.onAudioEnd = (s) => {
                        this.currentRecord.prompt.state = PromptState.finished;
                        resolve();
                    };
                },
                err => {
                    this.currentRecord.prompt.state = PromptState.error;
                    this.currentRecord.prompt.errorMsg = "Error - " + err;
                    synthesizer.close();
                    reject(err);
                });
        });
    }
    
    createRecording(formControlName: string): Promise<void> {
        this.helperService.recognizing = true;
        const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
        
        const speechConfig = SpeechConfig.fromSubscription("6d345534e918442f8dc7a8e1c0df8b53", "westeurope");
        speechConfig.speechRecognitionLanguage = 'en-US';
        
        return new Promise((resolve, reject) => {
            this._recognizer = new SpeechRecognizer(speechConfig, audioConfig)
            this._recognizer.recognizing = this._recognizer.recognized = this.recognizerCallback.bind(this)
            this._recognizer.recognizeOnceAsync(result => {
                if (result.reason === ResultReason.RecognizedSpeech) {
                    this.helperService.validateForm.patchValue({[formControlName]: result.text})
                    resolve();
                }
            });
        });
    }
    
    private recognizerCallback(s: any, e: any) {
        const reason = ResultReason[e.result.reason];
        if (reason == "RecognizingSpeech") {
            this.helperService.recordResult.next(this.lastRecognized + e.result.text)
        }
        if (reason == "RecognizedSpeech") {
            this.lastRecognized += e.result.text + "\r\n";
            this.helperService.recordResult.next(this.lastRecognized)
        }
    }
    
    stopRecording(): void {
        this.stop();
        this.helperService.recognizing = false;
    }
    
    private stop() {
        if (!this._recognizer) return;
        
        this._recognizer.stopContinuousRecognitionAsync(
            () => {
                if (!this._recognizer) return;
                this._recognizer.close()
                this._recognizer = undefined
            },
            (err) => console.error(err)
        )
    }
}

export interface RecordData {
    formControlName: string,
    name: string
    prompt: {
        state: PromptState,
        errorMsg: string
    }
}

export enum PromptState {
    notStarted = 'NOTSTARTED',
    started = 'STARTED',
    finished = 'FINISHED',
    error = 'ERROR'
}