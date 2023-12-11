import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgxTreeFlowModule} from '../../../ngx-tree-flow/src/lib/ngx-tree-flow.module';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [BrowserModule, MatTabsModule, NgxTreeFlowModule, BrowserAnimationsModule],
})
export class AppModule {}
