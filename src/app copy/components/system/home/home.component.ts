import { Component, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private elRef: ElementRef){}
  ngOnInit(): void {

    let menu = this.elRef.nativeElement.querySelector('#menu-btn');
    let navbar = this.elRef.nativeElement.querySelector('.header .navbar');

    menu.onclick = () => {
      menu.classList.toggle('fa-times');
      navbar.classList.toggle('active');
    };

    window.onscroll = () => {
      menu.classList.remove('fa-times');
      navbar.classList.remove('active');
    }

    const swiper = new Swiper(".home-slider", {
      spaceBetween: 20,
      effect: "fade",
      grabCursor: true,
      loop: true,
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }


}




