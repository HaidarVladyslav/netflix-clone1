import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
  standalone: true,
  imports: [],
  template: `
    <svg xmlns="http://www.w3.org/2000/svg">
      <use [attr.xlink:href]="'assets/'+path+iconName+'.svg#'+iconName"></use>
    </svg>
  `,
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgComponent {
  @Input({ required: true }) iconName!: string;
  @Input({ transform: (path: string) => path + '/' }) path?: string = '';
}
