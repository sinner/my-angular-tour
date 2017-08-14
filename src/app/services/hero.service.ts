import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import 'rxjs/add/operator/toPromise';

import {Hero} from "../models/hero";

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private slimLoadingBarService: SlimLoadingBarService, private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    this.slimLoadingBarService.start();
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then((response) => {
        this.slimLoadingBarService.complete();
        return response.json().data as Hero[];
      })
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes().then(
      heroes => heroes.find(hero => hero.id === id)
    );
  }

  /**
   * @deprecated
   * @returns {Promise<Hero[]>}
   */
  getHeroesSlowly(): Promise<Hero[]> {
    this.slimLoadingBarService.start(() => {

    });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getHeroes())
      }, 2000);
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
