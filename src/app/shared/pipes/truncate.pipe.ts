import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(text: string, truncNum: number = 150): string {
    if (text.length > truncNum) {
      return text.slice(0, truncNum) + '...';
    }
    return text;
  }

}
