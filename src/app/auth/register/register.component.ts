import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  template: `
    <p>
      register works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RegisterComponent {

}
