import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteHomeComponent } from 'src/app/components/site/site-home/site-home.component';
import { SiteDashboardComponent } from 'src/app/components/site/site-dashboard/site-dashboard.component';
import { AccountSectionComponent } from 'src/app/components/account/account-section/account-section.component';
import { CoursesSectionComponent } from 'src/app/components/courses/courses-section/courses-section.component';
import { StructuresSectionComponent } from 'src/app/components/structures/structures-section/structures-section.component';
import { TasksSectionComponent } from 'src/app/components/tasks/tasks-section/tasks-section.component';
import { MailsSectionComponent } from 'src/app/components/mails/mails-section/mails-section.component';
import { AccountLoginComponent } from 'src/app/components/account/account-login/account-login.component';
import { CoursesEditComponent } from 'src/app/components/courses/courses-edit/courses-edit.component';
import { SiteNotFoundComponent } from 'src/app/components/site/site-not-found/site-not-found.component';
import { AccountEditComponent } from 'src/app/components/account/account-edit/account-edit.component';
import { AccountLostPasswordComponent } from 'src/app/components/account/account-lost-password/account-lost-password.component';

const routes: Routes = [
  { path: '', component: SiteHomeComponent },
  { path: 'home', component: SiteHomeComponent },
  { path: 'dashboard', component: SiteDashboardComponent },
  { path: 'account', component: AccountSectionComponent },
  { path: 'account-edit/:iduser', component: AccountEditComponent },
  { path: 'courses', component: CoursesSectionComponent },
  { path: 'courses/:iduser', component: CoursesSectionComponent },
  { path: 'courses-edit/:idcourse', component: CoursesEditComponent },
  { path: 'structures', component: StructuresSectionComponent },
  { path: 'tasks', component: TasksSectionComponent },
  { path: 'mails', component: MailsSectionComponent },
  { path: 'login', component: AccountLoginComponent },
  { path: 'forgot-password', component: AccountLostPasswordComponent },
  { path: 'not-found', component: SiteNotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
