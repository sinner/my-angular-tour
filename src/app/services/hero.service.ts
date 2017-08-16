import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import 'rxjs/add/operator/toPromise';

import {Hero} from "../models/hero";

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  private headers = new Headers({'Content-Type': 'application/json'});

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
    const url = `${this.heroesUrl}/${id}`;
    this.slimLoadingBarService.start();
    return this.http.get(url)
      .toPromise()
      .then((response) => {
        this.slimLoadingBarService.complete();
        return response.json().data as Hero;
      })
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    this.slimLoadingBarService.start();
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then((response) => {
        this.slimLoadingBarService.complete();
        console.log(response);
        return hero;
      })
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
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
