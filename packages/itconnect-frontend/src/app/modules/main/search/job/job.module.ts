import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';
import {SearchComponentModule} from "../components/search-component.module";
import {CommonComponentsModule} from "../../../../components/common-components.module";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {JobSearchComponentsModule} from "./components/job-search-components.module";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UtilsModule} from "../../../../utils/utils.module";


@NgModule({
  declarations: [
    JobComponent
  ],
    imports: [
        CommonModule,
        JobRoutingModule,
        SearchComponentModule,
        MatIconModule,
        JobSearchComponentsModule,
        MatButtonModule,
        MatPaginatorModule,
        UtilsModule,
    ]
})
export class JobModule { }
