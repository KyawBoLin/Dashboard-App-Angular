import { Routes } from '@angular/router';
import { ProjectListsDetailComponent } from './project-lists-detail/project-lists-detail.component';

export const routes: Routes = [
  { path: 'day', loadComponent: () => ProjectListsDetailComponent },
  { path: 'week', loadComponent: () => ProjectListsDetailComponent },
  { path: 'month', loadComponent: () => ProjectListsDetailComponent },
];
