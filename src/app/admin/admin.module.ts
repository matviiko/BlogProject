import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AuthGuard } from './shared/services/auth.guard';
import { SearchPipe } from './shared/pipes/search.pipe';
import { SearchAuthorPipe } from './shared/pipes/search-author.pipe';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/services/alert.service';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { EditCategoryComponent } from './categories-page/edit-category/edit-category.component';
import { SingupPageComponent } from './singup-page/singup-page.component';
import { SettingsProfilePageComponent } from './settings-profile-page/settings-profile-page.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    SearchAuthorPipe,
    AlertComponent,
    CategoriesPageComponent,
    EditCategoryComponent,
    SingupPageComponent,
    SettingsProfilePageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          { path: 'register-user', component: SingupPageComponent },
          { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
          { path: 'categories', component: CategoriesPageComponent, canActivate: [AuthGuard] },
          { path: 'category/:id/edit', component: EditCategoryComponent, canActivate: [AuthGuard] },
          { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
          { path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard] },
          { path: 'settings/:id', component: SettingsProfilePageComponent, canActivate: [AuthGuard] },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AlertService],
})
export class AdminModule {}
