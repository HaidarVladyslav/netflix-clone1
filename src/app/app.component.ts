import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/ui/navbar/navbar.component";
import { injectAuthFeature } from './shared/store/auth.store';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-navbar [isMainSite]="!!vm.user()" (signOut)="vm.logout()" />
    <router-outlet></router-outlet>
  `,
  styles: [],
  imports: [RouterOutlet, NavbarComponent]
})
export class AppComponent implements OnInit {
  public vm = injectAuthFeature();

  ngOnInit(): void {
    this.vm.getAuthState();
  }
}
