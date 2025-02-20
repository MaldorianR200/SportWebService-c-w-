import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],

})
export class AboutComponent {
  checked: boolean = false;
  trainer1 = `Мастер спорта по классическому бодибилдингу, чемпион мира по бодибилдингу в парах,
  тренер по бодибилдингу и фитнесу, фитнес блогер и автор двух книг.`;
  trainer2 = `Cоветский и российский профессиональный культурист, киноактёр, тренер,
  судья и блогер. Абсолютный чемпион России по бодибилдингу 2006 года по версии ФБФР, многократный
  чемпион Москвы, серебряный призёр чемпионата Европы 2009 года. Мастер спорта России международного класса (9 февраля 2010 года).`
}



