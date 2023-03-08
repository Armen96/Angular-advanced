import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {MainComponent} from './main/main.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductFormComponent} from './product-form/product-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialUiModule} from "../../lib/material/material-ui.module";
import {ButtonComponent} from "../../lib/components/button/button.component";
import {ButtonAloneComponent} from "../../lib/components/button-alone/button-alone.component";


@NgModule({
  declarations: [
    MainComponent,
    ProductListComponent,
    ProductFormComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MaterialUiModule,
    ButtonAloneComponent
  ]
})
export class HomeModule {
}
