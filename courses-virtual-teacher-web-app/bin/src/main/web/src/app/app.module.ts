import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './modules/routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { SiteHomeComponent } from './components/site/site-home/site-home.component';
import { SiteDashboardComponent } from './components/site/site-dashboard/site-dashboard.component';
import { SiteHeaderComponent } from './components/site/site-header/site-header.component';
import { SiteFooterComponent } from './components/site/site-footer/site-footer.component';
import { AccountSectionComponent } from './components/account/account-section/account-section.component';
import { AccountEditComponent } from './components/account/account-edit/account-edit.component';
import { AccountLoginComponent } from './components/account/account-login/account-login.component';
import { AccountLostPasswordComponent } from './components/account/account-lost-password/account-lost-password.component';
import { CoursesSectionComponent } from './components/courses/courses-section/courses-section.component';
import { CoursesEditComponent } from './components/courses/courses-edit/courses-edit.component';
import { CoursesTreeviewEditComponent } from './components/courses/treeview/courses-treeview-edit/courses-treeview-edit.component';
import { CoursesTreeviewSectionComponent } from './components/courses/treeview/courses-treeview-section/courses-treeview-section.component';
import { CoursesPreviewSectionComponent } from './components/courses/preview/courses-preview-section/courses-preview-section.component';
import { CoursesPreviewEditComponent } from './components/courses/preview/courses-preview-edit/courses-preview-edit.component';
import { StructuresSectionComponent } from './components/structures/structures-section/structures-section.component';
import { StructuresEditComponent } from './components/structures/structures-edit/structures-edit.component';
import { TasksSectionComponent } from './components/tasks/tasks-section/tasks-section.component';
import { TasksEditComponent } from './components/tasks/tasks-edit/tasks-edit.component';
import { MailsSectionComponent } from './components/mails/mails-section/mails-section.component';
import { MailsEditComponent } from './components/mails/mails-edit/mails-edit.component';
import { SiteNotFoundComponent } from './components/site/site-not-found/site-not-found.component';
import { AccountService } from './services/account.service';
import { MailsService } from './services/mails.service';
import { StructuresService } from './services/structures.service';
import { TasksService } from './services/tasks.service';
import { CourseService } from './services/course.service';
import { SyncfusionModule } from './modules/syncfusion/syncfusion.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeViewService } from './services/tree-view.service';

@NgModule({
  declarations: [
    AppComponent,
    SiteHomeComponent,
    SiteDashboardComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    AccountSectionComponent,
    AccountEditComponent,
    AccountLoginComponent,
    AccountLostPasswordComponent,
    CoursesSectionComponent,
    CoursesEditComponent,
    CoursesTreeviewEditComponent,
    CoursesPreviewSectionComponent,
    CoursesPreviewEditComponent,
    CoursesTreeviewSectionComponent,
    StructuresSectionComponent,
    StructuresEditComponent,
    TasksSectionComponent,
    TasksEditComponent,
    MailsSectionComponent,
    MailsEditComponent,
    SiteNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SyncfusionModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    AccountService,
    CourseService,
    MailsService,
    StructuresService,
    TasksService,
    TreeViewService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
