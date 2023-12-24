import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { requests } from '../../shared/constants/requests.constant';
import { MovieRequest } from '../../shared/interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private http = inject(HttpClient);
  private readonly endpoints = requests;

  getPopularMovies(): Observable<MovieRequest> {
    return this.http.get<MovieRequest>(this.endpoints.requestPopular);
  }

  getTopRatedMovies(): Observable<MovieRequest> {
    return this.http.get<MovieRequest>(this.endpoints.requestTopRated);
  }

  getTrendingMovies(): Observable<MovieRequest> {
    return this.http.get<MovieRequest>(this.endpoints.requestTrending);
  }

  getHorrorMovies(): Observable<MovieRequest> {
    return this.http.get<MovieRequest>(this.endpoints.requestHorror);
  }

  getUpcomingMovies(): Observable<MovieRequest> {
    return this.http.get<MovieRequest>(this.endpoints.requestUpcoming);
  }
}
