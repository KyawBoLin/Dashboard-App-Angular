import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListsComponent } from './project-lists/project-lists.component';
import { ProjectListsDetailComponent } from './project-lists-detail/project-lists-detail.component';
import { ComparisionComponent } from './comparision/comparision.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ProjectListsComponent,
    ProjectListsDetailComponent,
    ComparisionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'prj-dashboard-app';
}
