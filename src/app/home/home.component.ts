import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HomeStore } from './data-access/home.store';
import { TruncatePipe } from "../shared/pipes/truncate.pipe";
import { MainComponent } from "./ui/main/main.component";
import { RowComponent } from "../shared/ui/row/row.component";

@Component({
    selector: 'app-home',
    standalone: true,
    template: `
    <app-main [movie]="homeStore.bgMovie()" />
    <app-row [title]="'UpComing'" [movies]="homeStore.upcoming()" />
    <app-row [title]="'Popular'" [movies]="homeStore.popular()" />
    <app-row [title]="'Trending'" [movies]="homeStore.trending()" />
    <app-row [title]="'Top Rated'" [movies]="homeStore.topRated()" />
    <app-row [title]="'Horror'" [movies]="homeStore.horror()" />
  `,
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TruncatePipe, MainComponent, RowComponent]
})
export default class HomeComponent {
  readonly homeStore = inject(HomeStore);
}
