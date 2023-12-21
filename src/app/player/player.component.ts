import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  template: `
    <p>
      player works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PlayerComponent {

}
