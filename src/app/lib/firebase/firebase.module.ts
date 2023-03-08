import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {environment} from 'src/environments/environment';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireFunctionsModule} from "@angular/fire/compat/functions";

const imports =  [
  CommonModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule.enablePersistence(),
  AngularFireAuthModule,
  AngularFireFunctionsModule,
];

@NgModule({
  imports,
  providers: [],
  exports: [
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
  ]
})
export class FirebaseModule {
}
