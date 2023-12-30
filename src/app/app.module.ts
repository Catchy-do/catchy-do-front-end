import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgSelect2Module } from 'ng-select2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { KHttpInterceptorService } from './services/interceptor/k-http-interceptor.service';
import {  OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { WebSocketService } from './services/websocket/websocket.service';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular/material/legacy-slide-toggle';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SlickCarouselModule,
   
    ToastrModule.forRoot(),
    //HttpClientInMemoryWebApiModule.forRoot(DataService),
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelect2Module,
    MatIconModule,
    MatDialogModule,
    
 
    MatSlideToggleModule
  ],
  providers: [{ provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: HTTP_INTERCEPTORS, useClass: KHttpInterceptorService, multi: true },
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'fr'},
    WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule {}
