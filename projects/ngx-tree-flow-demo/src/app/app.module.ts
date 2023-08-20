import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxTreeFlowModule } from '../../../ngx-tree-flow/src/lib/ngx-tree-flow.module';

@NgModule({
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  imports: [BrowserModule, NgxTreeFlowModule],
})
export class AppModule {}
