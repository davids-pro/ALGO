import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  nbCopy = 1;
  priceCopy: number;

  sex = 'homme';
  age = 18;
  taxeable: boolean;

  ageConducteur = 18;
  agePermis = 0;
  nbAccident = 0;
  anciennete = 0;
  tarif: string;

  ngOnInit() {
    this.photocopies();
    this.impots();
    this.assurance();
  }

  photocopies() {
    const initial = (copy: number) => {
      return copy * 0.1;
    };
    const firstDiscount = (copy: number) => {
      return copy * 0.09;
    };
    const secondDiscount = (copy: number) => {
      return copy * 0.08;
    };
    if (this.nbCopy < 11) {
      this.priceCopy = initial(this.nbCopy);
    } else if (this.nbCopy >= 11 && this.nbCopy < 31) {
      this.priceCopy = initial(10) + firstDiscount(this.nbCopy - 10);
    } else {
      this.priceCopy =
        initial(10) + firstDiscount(20) + secondDiscount(this.nbCopy - 30);
    }
  }

  impots() {
    if (this.age < 18) {
      this.taxeable = false;
    } else if (this.age >= 18 && this.age <= 35) {
      this.taxeable = true;
    } else {
      if (this.sex === 'femme') {
        this.taxeable = false;
      } else {
        this.taxeable = true;
      }
    }
  }

  assurance() {
    let points = 0;
    if (this.ageConducteur >= 25) {
      points++;
    }
    if (this.agePermis >= 2) {
      points++;
    }
    switch (this.nbAccident) {
      case 0:
        points = points + 3;
        break;
      case 1:
        points = points + 2;
        break;
      case 2:
        points = points + 1;
    }
    if (points > 2) {
      if (this.anciennete >= 1) {
        points++;
      }
      if (points === 3) {
        this.tarif = 'D';
      } else if (points === 4) {
        this.tarif = 'C';
      } else if (points === 5) {
        this.tarif = 'B';
      } else if (points > 5) {
        this.tarif = 'A';
      }
    } else {
      this.tarif = null;
    }
  }
}
