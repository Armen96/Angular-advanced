import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {FirebaseModule} from "./lib/firebase";
import {LoginComponent} from './pages/login/login.component';
import {NgOptimizedImage} from "@angular/common";
import {MaterialUiModule} from "./lib/material/material-ui.module";
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FirebaseModule,
    NgOptimizedImage,
    MaterialUiModule,
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
