import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tv-show',
  standalone: true,
  imports: [],
  template: `
    <p>
      tv-show works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TvShowComponent {

}
