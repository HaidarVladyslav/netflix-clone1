import { ApplicationConfig, InjectionToken, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

const app = initializeApp(environment.firebaseConfig);

export const FIRESTORE = new InjectionToken('Firebase Firestore', {
  providedIn: 'root',
  factory: () => getFirestore()
});

export const AUTH = new InjectionToken('Firebase Auth', {
  providedIn: 'root',
  factory: () => getAuth()
});

export const STORAGE = new InjectionToken('Firebase Storage', {
  providedIn: 'root',
  factory: () => getStorage()
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ]
};
