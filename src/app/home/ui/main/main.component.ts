import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Movie } from '../../../shared/interfaces/movie';
import { TruncatePipe } from "../../../shared/pipes/truncate.pipe";
import { IMAGE_BASE_PATH } from '../../../shared/constants/image-base-path.constant';

@Component({
    selector: 'app-main',
    standalone: true,
    template: `
    <div class="w-full h-[550px] text-white">
      @if (movie) {
      <div class="w-full h-full">
        <div class="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
          <img class="w-full h-full object-cover object-top" [src]="imageBasePath+'/original'+movie.backdrop_path" [alt]="movie.title">
          <div class="absolute w-full top-[20%] p-4 md:p-8">
            <h1 class="text-3xl md:text-5xl font-bold">{{ movie.title }}</h1>
            <div class="my-4">
              <button class="border bg-gray-300 text-black border-gray-300 py-2 px-5">Play</button>
              <button class="border text-white border-gray-300 py-2 px-5 ml-4">Watch Later</button>
            </div>
            <p class="text-green-400 text-sm">Released {{ movie.release_date  }}</p>
            <p class="w-full md-max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]">{{ movie.overview | truncate }}</p>
          </div>
        </div>
      } @else {
        <span class="w-full block text-center font-bold">
          Loading...
        </span>
      }
    </div>
  `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TruncatePipe]
})
export class MainComponent {
  @Input({ required: true }) movie!: Movie | null;
  public readonly imageBasePath = IMAGE_BASE_PATH;
}
