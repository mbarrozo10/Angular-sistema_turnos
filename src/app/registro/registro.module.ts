import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environment/environments';

import { RegistroRoutingModule } from './registro-routing.module';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { RegistroComponent } from './registro.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgHcaptchaModule } from 'ng-hcaptcha';

@NgModule({
  declarations: [RegistroComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule, MatButtonModule,
    MatFormFieldModule,
    MatInputModule,MatCardModule,
    MatSelectModule,
    RecaptchaModule,
    NgHcaptchaModule,
    NgHcaptchaModule.forRoot({
      siteKey: environment.siteKey,
      languageCode: 'es'
    }),
  ]
})
export class RegistroModule { }
