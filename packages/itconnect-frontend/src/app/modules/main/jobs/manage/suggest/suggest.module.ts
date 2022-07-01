import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggestRoutingModule } from './suggest-routing.module';
import { SuggestComponent } from './suggest.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UtilsModule} from "../../../../../utils/utils.module";
import {MatButtonModule} from "@angular/material/button";
import {CommonComponentsModule} from "../../../../../components/common-components.module";
import {MainComponentsModule} from "../../../components/components.module";


@NgModule({
  declarations: [
    SuggestComponent
  ],
  imports: [
    CommonModule,
    SuggestRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    NgSelectModule,
    MatIconModule,
    FormsModule,
    MatPaginatorModule,
    UtilsModule,
    MatButtonModule,
    CommonComponentsModule,
    MainComponentsModule
  ]
})
export class SuggestModule { }
