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
    this.heroService.getHeroes().then((heroes)=>{
      this.heroes = heroes;
    });
  }

  onSelect (hero) {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if(!name){
      return;
    }
    this.heroService.create(name)
      .then((hero) => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }


}
