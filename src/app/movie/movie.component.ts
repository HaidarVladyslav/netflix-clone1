import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  template: `
    <p>
      movie works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MovieComponent {

}
