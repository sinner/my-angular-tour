import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";

import {SlimLoadingBarModule, SlimLoadingBarService} from 'ng2-slim-loading-bar';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from "./heroes/heroes.component";
import { HeroService } from "./services/hero.service";
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SlimLoadingBarModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'heroes',
        component: HeroesComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent
  ],
  providers: [
    SlimLoadingBarService,
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
