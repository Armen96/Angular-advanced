import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../lib/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    let user = this.authService.getUser();

    if (user) {
      this.router.navigate(['']);
    }
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

}
