import { Routes } from '@angular/router';
import {InformationComponent} from "./features/information/information.component";

export const routes: Routes = [
    
    {path: '', redirectTo: 'information', pathMatch: 'full'},
    
    { path: 'information', component: InformationComponent },
];
