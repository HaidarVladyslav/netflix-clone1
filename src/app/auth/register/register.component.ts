import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/data-access/auth.service';
import { injectAuthFeature } from '../../shared/store/auth.store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  template: `
    <div class="w-full h-screen">
      <img class="hidden sm:block absolute w-full h-full object-cover" src="assets/bg.jpg" alt="Netflix Background">
      <div class="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <div class="fixed w-full px-4 py-24 z-50">
        <div class="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
          <div class="max-w-[320px] mx-auto py-16">
            <h1 class="text-3xl font-bold">Sign Up</h1>
            <form #form="ngForm" [formGroup]="registerForm" (ngSubmit)="vm.signUp(form.value)" class="w-full flex flex-col py-4">
              <input formControlName="email" class="p-3 my-2 bg-gray-700 rounded [&.ng-invalid&.ng-touched]:bg-red-500 [&.ng-invalid&.ng-touched]:placeholder-white" type="email" placeholder="Email" autocomplete="email" />
              <input formControlName="password" class="p-3 my-2 bg-gray-700 rounded [&.ng-invalid&.ng-touched]:bg-red-500 [&.ng-invalid&.ng-touched]:placeholder-white" type="password" placeholder="Password" />
              <button type="submit" [disabled]="!form.valid" class="bg-red-600 disabled:bg-slate-800 py-3 my-6 rounded font-bold transition-all">Sign Up</button>
              <div class="flex items-center justify-between text-small text-gray-600">
                <p class="flex"><input class="mr-2" type="checkbox" />Remember me</p>
                <p>Need Help ?</p>
              </div>
              <p class="py-8">
                <span class="text-gray-600">Already subscribed to Netflix? </span> 
                 <a class="cursor-pointer" routerLink="/auth/login">Sign In</a>
            </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class RegisterComponent {
  public authService = inject(AuthService);
  public vm = injectAuthFeature();
  private fb = inject(FormBuilder);
  public registerForm = this.fb.nonNullable.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
  });
}
