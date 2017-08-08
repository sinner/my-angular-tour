import {Component, OnInit} from '@angular/core';
import {Hero} from "../models/hero";
import {HeroService} from "../services/hero.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-my-heroes',
  providers: [],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  selectedHero: Hero;

  constructor (private heroService: HeroService, private  router: Router) {

  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroesSlowly().then((heroes)=>{
      this.heroes = heroes;
    });
  }

  onSelect (hero) {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

}
