import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './jobs.component';
import {CommonComponentsModule} from "../../../components/common-components.module";


@NgModule({
  declarations: [
    JobsComponent
  ],
    imports: [
        CommonModule,
        JobsRoutingModule,
        CommonComponentsModule
    ]
})
export class JobsModule { }
