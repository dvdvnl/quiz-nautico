import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	LocalStorageModule.withConfig({
		prefix: 'qnb',
		storageType: 'localStorage'
	})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
