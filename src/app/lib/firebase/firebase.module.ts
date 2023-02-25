import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {environment} from 'src/environments/environment';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
// import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireFunctionsModule} from "@angular/fire/compat/functions";
// import {AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";

const imports =  [
  CommonModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule.enablePersistence(),
  AngularFireAuthModule,
  // AngularFireStorageModule,
  AngularFireFunctionsModule,
  // AngularFireAnalyticsModule
];

@NgModule({
  imports,
  providers: [],
  exports: [
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    // AngularFireStorageModule
  ]
})
export class FirebaseModule {
}
