import { inject, makeEnvironmentProviders } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { Store, createActionGroup, createFeature, createReducer, emptyProps, on, props, provideState } from "@ngrx/store";
import { Actions, createEffect, ofType, provideEffects } from "@ngrx/effects";
import { User } from "firebase/auth";
import { Credentials } from "../interfaces/credentials";
import { AuthService } from "../data-access/auth.service";

export interface AuthState {
  user: User | null;
  error: string | null;
};

export const initialState: AuthState = {
  user: null,
  error: null,
};

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Get Auth State': emptyProps(),
    'Get Auth State Success': props<{ user: User | null }>(),
    'Get Auth State Failure': props<{ error: string }>(),
    'Sign Up': props<{ credentials: Credentials }>(),
    'Sign Up Success': props<{ user: User | null }>(),
    'Sign Up Failure': props<{ error: string }>(),
    'Login': props<{ credentials: Credentials }>(),
    'Login Success': props<{ user: User | null }>(),
    'Login Failure': props<{ error: string }>(),
    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: string }>(),
  }
});

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.getAuthStateSuccess, (state, { user }) => ({
      ...state,
      user
    })),
    on(AuthActions.getAuthStateFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(AuthActions.signUpSuccess, (state, { user }) => ({
      ...state,
      user
    })),
    on(AuthActions.signUpFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(AuthActions.loginSuccess, (state, { user }) => ({
      ...state,
      user
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
      ...state,
      error
    })),
    on(AuthActions.logoutSuccess, (state) => ({
      ...state,
      user: null
    })),
    on(AuthActions.logoutFailure, (state, { error }) => ({
      ...state,
      user: null,
      error
    })),
  )
});

export const {
  selectUser,
  selectAuthState,
  selectError
} = authFeature;

export const signUp$ = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
  return actions$.pipe(
    ofType(AuthActions.signUp),
    switchMap(({ credentials }) => authService.createAccount({ ...credentials }).pipe(
      map((user) => AuthActions.signUpSuccess({ user: user.user })),
      tap(() => router.navigateByUrl('/'))
    )),
    catchError(error => of(AuthActions.signUpFailure({ error })))
  )
}, { functional: true });

export const login$ = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
  return actions$.pipe(
    ofType(AuthActions.login),
    switchMap(({ credentials }) => authService.login({ ...credentials }).pipe(
      map((user) => AuthActions.loginSuccess({ user: user.user })),
      tap(() => router.navigateByUrl('/'))
    )),
    catchError(error => of(AuthActions.loginFailure({ error })))
  )
}, { functional: true });

export const logout$ = createEffect((actions$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
  return actions$.pipe(
    ofType(AuthActions.logout),
    switchMap(() => authService.logout().pipe(
      map(() => AuthActions.logoutSuccess()),
      tap(() => router.navigateByUrl('/auth/login'))
    )),
    catchError(error => of(AuthActions.loginFailure({ error })))
  )
}, { functional: true });

export const getAuthState$ = createEffect((actions$ = inject(Actions), authService = inject(AuthService)) => {
  return actions$.pipe(
    ofType(AuthActions.getAuthState),
    switchMap(() => authService.getUser$.pipe(
      map((user) => AuthActions.getAuthStateSuccess({ user })),
    )),
    catchError(error => of(AuthActions.getAuthStateFailure({ error })))
  )
}, { functional: true });

export function provideAuthFeature() {
  return makeEnvironmentProviders([
    provideState(authFeature),
    provideEffects({ signUp$, getAuthState$, login$, logout$ })
  ]);
}

export function injectAuthFeature() {
  const store = inject(Store);

  return {
    getAuthState: () => store.dispatch(AuthActions.getAuthState()),
    user: store.selectSignal(selectUser),
    error: store.select(selectError),
    signUp: (credentials: Credentials) => store.dispatch(AuthActions.signUp({ credentials })),
    login: (credentials: Credentials) => store.dispatch(AuthActions.login({ credentials })),
    logout: () => store.dispatch(AuthActions.logout()),
  }
}