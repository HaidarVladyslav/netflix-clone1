import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faOutlinedHeart } from '@fortawesome/free-regular-svg-icons';
import { Movie } from '../../interfaces/movie';
import { IMAGE_BASE_PATH } from '../../constants/image-base-path.constant';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [FontAwesomeModule],
  template: `
    <div class="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img class="text-white w-full h-auto block" [src]="imageBasePath+'/w500'+(movie.backdrop_path)" [alt]="movie.title">
      <div class="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p class="whitespace-normal text-xs ms:text-sm font-bold flex justify-center items-center h-full text-center">
          {{ movie.title }} 
        </p>
        <button (click)="likeMovieClick.emit(movie)" class="absolute top-4 left-4 text-gray-300 cursor-pointer hover:opacity-80 transition-all">
          @if (like) {
            <fa-icon [icon]="faHeart" />
          } @else {
            <fa-icon [icon]="faOutlinedHeart" />
          }
        </button>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent {
  @Output() likeMovieClick = new EventEmitter<Movie>();
  @Input({ required: true }) movie!: Movie;
  @Input() like: boolean = false;
  public readonly imageBasePath = IMAGE_BASE_PATH;
  public readonly faHeart = faHeart;
  public readonly faOutlinedHeart = faOutlinedHeart;
}
