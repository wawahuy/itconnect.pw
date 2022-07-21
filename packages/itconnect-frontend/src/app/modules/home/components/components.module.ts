import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabFindJobComponent } from './tab-find-job/tab-find-job.component';
import { TabFindPeopleComponent } from './tab-find-people/tab-find-people.component';
import {CommonComponentsModule} from "../../../components/common-components.module";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    TabFindJobComponent,
    TabFindPeopleComponent
  ],
  exports: [
    TabFindJobComponent,
    TabFindPeopleComponent
  ],
  imports: [
    CommonModule,
    CommonComponentsModule,
    MatAutocompleteModule,
    RouterModule
  ]
})
export class HomeComponentsModule { }
