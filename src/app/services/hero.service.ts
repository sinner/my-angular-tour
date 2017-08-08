import { Injectable } from '@angular/core';
import {Hero} from "../models/hero";
import {HEROES} from "../models/mock-heroes";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

@Injectable()
export class HeroService {

  constructor(private slimLoadingBarService: SlimLoadingBarService) { }

  getHeroes(): Promise<Hero[]> {
    this.slimLoadingBarService.complete();
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    this.slimLoadingBarService.start(() => {

    });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getHeroes())
      }, 2000);
    });
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroesSlowly().then(
      heroes => heroes.find(hero => hero.id === id)
    );
  }

}
