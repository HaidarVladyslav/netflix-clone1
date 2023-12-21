import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-background-image',
  standalone: true,
  imports: [],
  template: `
    <div class="h-screen w-screen">
      <img class="h-screen w-screen" src="assets/bg.jpg" alt="main background image">
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundImageComponent {

}
