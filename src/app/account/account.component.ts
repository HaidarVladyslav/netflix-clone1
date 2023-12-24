import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  template: `
    <p>
      account works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AccountComponent {

}
