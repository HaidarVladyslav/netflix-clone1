import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex items-center justify-between p-4 z-[100] absolute w-full">
      <h1 class="text-red-600 text-4xl font-bold cursor-pointer">
        <a routerLink="/">NETFLIX</a>
      </h1>
      <div>
        @if (!isMainSite) {
          <a routerLink="/auth/login" class="text-white px-6 py-2 font-bold mr-2">Sign In</a>
          <a routerLink="/auth/register" class="text-white bg-red-600 px-6 py-2 font-bold rounded cursor-pointer">Sign Up</a>
        } @else {
          <button (click)="signOut.emit()" class="text-white bg-red-600 px-6 py-2 font-bold rounded cursor-pointer">Sign Out</button>
        }
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  @Output() signOut = new EventEmitter<void>();
  @Input({ required: true }) isMainSite!: boolean;
}
