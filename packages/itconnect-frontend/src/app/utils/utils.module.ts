import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PermissionPipe} from "./pipes/permission.pipe";
import {NumberOnlyDirective} from "./directives/number-only.directive";
import {SafeHtmlPipe} from "./pipes/sanitizeHtml.pipe";
import {NumberDecimalOnlyDirective} from "./directives/number-decimal-only.directive";
import {DateFromNowPipe} from "./pipes/dateFromNow.pipe";


@NgModule({
  declarations: [
    PermissionPipe,
    NumberOnlyDirective,
    SafeHtmlPipe,
    NumberDecimalOnlyDirective,
    DateFromNowPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PermissionPipe,
    NumberOnlyDirective,
    SafeHtmlPipe,
    NumberDecimalOnlyDirective,
    DateFromNowPipe
  ]
})
export class UtilsModule { }
