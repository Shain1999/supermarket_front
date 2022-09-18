import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hideUserBtns: boolean = true;

  constructor(private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {

    if (this.tokenService.isLogedIn()) {
      this.hideUserBtns = false;
    }
    this.tokenService.onUserDataRecived().subscribe((userData) => {
      if (userData) {
        this.hideUserBtns = false;
      }
    }, err => {
      alert(err);
    })
    this.tokenService.onLogedOut().subscribe((logedOut) => {
      if (logedOut) {
        this.hideUserBtns = true;
      }
    }, err => {
      alert(err);
    })
  }
  navToProducts() {
    this.router.navigate(["/", "products"])
  }
  logOut(): void {

    if (this.tokenService.isLogedIn()) {
      this.tokenService.logOut();
      this.router.navigate(["/", "login"])
    }
    else {
      this.router.navigate(['/', "login"]);
    }
  }

}
