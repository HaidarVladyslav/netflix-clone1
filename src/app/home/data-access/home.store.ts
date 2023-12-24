import { inject } from "@angular/core";
import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { Movie } from "../../shared/interfaces/movie";
import { HomeService } from "./home.service";
import { pipe, switchMap, tap } from "rxjs";

interface HomeState {
  bgMovie: null | Movie;
  popular: Movie[];
  loadingPopular: boolean;
  topRated: Movie[];
  loadingTopRated: boolean;
  trending: Movie[];
  loadingTrending: boolean;
  horror: Movie[];
  loadingHorror: boolean;
  upcoming: Movie[];
  loadingUpcoming: boolean;
}

export const HomeStore = signalStore(
  { providedIn: 'root' },
  withState<HomeState>({
    bgMovie: null,
    popular: [],
    loadingPopular: false,
    topRated: [],
    loadingTopRated: false,
    trending: [],
    loadingTrending: false,
    horror: [],
    loadingHorror: false,
    upcoming: [],
    loadingUpcoming: false,

  }),
  withMethods((store, homeService = inject(HomeService)) => ({
    loadPopular: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loadingPopular: true })),
        switchMap(() => homeService.getPopularMovies().pipe(
          tapResponse({
            next: (moviesRequest) => {
              const bgMovie = moviesRequest.results[Math.floor(Math.random() * moviesRequest.results.length)];
              patchState(store, { bgMovie, popular: moviesRequest.results })
            },
            error: console.error,
            finalize: () => patchState(store, { loadingPopular: false })
          })
        )
        )
      )
    ),
    loadTopRated: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loadingTopRated: true })),
        switchMap(() => homeService.getTopRatedMovies().pipe(
          tapResponse({
            next: (moviesRequest) => {
              patchState(store, { topRated: moviesRequest.results })
            },
            error: console.error,
            finalize: () => patchState(store, { loadingTopRated: false })
          })
        )
        )
      )
    ),
    loadTrending: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loadingTrending: true })),
        switchMap(() => homeService.getTrendingMovies().pipe(
          tapResponse({
            next: (moviesRequest) => {
              patchState(store, { trending: moviesRequest.results })
            },
            error: console.error,
            finalize: () => patchState(store, { loadingTrending: false })
          })
        )
        )
      )
    ),
    loadHorror: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loadingHorror: true })),
        switchMap(() => homeService.getHorrorMovies().pipe(
          tapResponse({
            next: (moviesRequest) => {
              patchState(store, { horror: moviesRequest.results })
            },
            error: console.error,
            finalize: () => patchState(store, { loadingHorror: false })
          })
        )
        )
      )
    ),
    loadUpcoming: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loadingUpcoming: true })),
        switchMap(() => homeService.getUpcomingMovies().pipe(
          tapResponse({
            next: (moviesRequest) => {
              patchState(store, { upcoming: moviesRequest.results })
            },
            error: console.error,
            finalize: () => patchState(store, { loadingUpcoming: false })
          })
        )
        )
      )
    ),
  })),
  withHooks({
    onInit({ loadPopular, loadTopRated, loadTrending, loadHorror, loadUpcoming }) {
      loadPopular();
      loadTopRated();
      loadTrending();
      loadHorror();
      loadUpcoming();
    }
  })
)