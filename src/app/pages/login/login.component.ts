import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../lib/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public emailField: string = '';
  public passwordField: string = '';
  public isError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    let user = this.authService.getUser();

    if (user) {
      this.router.navigate(['']);
    }
  }

  async signInWithGoogle() {
    await this.authService.signInWithGoogle();
  }

  async signIn() {
    let result = await this.authService.signInWithPassword({email: this.emailField, password: this.passwordField});

    if (result) {
      this.emailField = '';
      this.passwordField = '';

      this.isError = false;
    } else {
      this.isError = true;
    }
  }

}
