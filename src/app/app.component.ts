import {Component, OnDestroy} from '@angular/core';
import {AuthService} from "./lib/services/auth.service";
import {UserInterface} from "./lib/interfaces/user.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public user: UserInterface | null = null;
  private subs: Array<any> = []

  constructor(private authService: AuthService) {
    this.user = authService.getUser()

    this.subs.push(this.authService.authInstance.subscribe(data => {
      this.user = data;
    }));
  }

  async signOut() {
    await this.authService.signOut();
  }

  ngOnDestroy() {
    this.subs.forEach(sub =>{
      sub.unsubscribe();
    })
  }
}
