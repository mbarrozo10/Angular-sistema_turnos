import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { MainComponent } from './main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import { RecaptchaModule } from "ng-recaptcha";
import { NgHcaptchaModule } from 'ng-hcaptcha';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    // HoraPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"tplabo2","appId":"1:497786768920:web:6d0b6b42e6f0d2a11a3d6d","storageBucket":"tplabo2.appspot.com","apiKey":"AIzaSyBvlwZHLRNqY561ZSh0gCJVdpigbv6K4jg","authDomain":"tplabo2.firebaseapp.com","messagingSenderId":"497786768920"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule,
    RecaptchaModule,
    NgHcaptchaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
