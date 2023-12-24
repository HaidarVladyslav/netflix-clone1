import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Movie } from '../../interfaces/movie';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [MovieComponent, FontAwesomeModule],
  template: `
    <h2 class="text-white font-bold md:text-xl p-4">{{ title }}</h2>
    <div class="relative flex items-center group">
      <button (click)="slideLeft()" class="absolute text-2xl bg-white rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10 transition-all hidden group-hover:block w-8 h-8">
        <fa-icon [icon]="faChevronLeft" />
      </button>
      <div #slider id="slider" class="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth relative">
        @for (movie of movies; track movie.id) {
          <app-movie [movie]="movie" />
        }
      </div>
      <button (click)="slideRight()" class="absolute right-0 text-2xl bg-white rounded-full opacity-50 hover:opacity-100 cursor-pointer z-10 transition-all hidden group-hover:block w-8 h-8">
        <fa-icon [icon]="faChevronRight" />
      </button>
    </div>
  `,
  styles: `
    #slider {
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RowComponent {
  @ViewChild('slider') slider!: ElementRef;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) movies!: Movie[];
  public readonly faChevronLeft = faChevronLeft;
  public readonly faChevronRight = faChevronRight;

  public slideLeft(): void {
    this.slider.nativeElement.scrollLeft -= 500;
  }

  public slideRight(): void {
    this.slider.nativeElement.scrollLeft += 500;
  }
}
