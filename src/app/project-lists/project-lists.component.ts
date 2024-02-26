import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable, take } from 'rxjs';
import { ProjectData } from '../interface/project-data';
import { ProjectDataService } from '../services/project-data.service';
import { SortableDirective, SortEvent } from '../directive/sortable.directive';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { ProjectListsDetailComponent } from '../project-lists-detail/project-lists-detail.component';

@Component({
  selector: 'app-project-lists',
  standalone: true,
  imports: [
    DecimalPipe,
    FormsModule,
    AsyncPipe,
    NgbHighlight,
    SortableDirective,
    NgbPaginationModule,
    FontAwesomeModule,
    RouterOutlet,
    RouterLink,
    ProjectListsDetailComponent,
  ],
  templateUrl: './project-lists.component.html',
  styleUrl: './project-lists.component.css',
  providers: [ProjectDataService, DecimalPipe],
})
export class ProjectListsComponent {

  // keep the button enabled by default
  isDisabled: boolean = true;

  projectDatas$: Observable<ProjectData[]>;
  total$: Observable<number>;
  faSort = faSort;
  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  constructor(public service: ProjectDataService, private router: Router) {
    this.projectDatas$ = service.projectDatas$;
    this.total$ = service.total$;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  selectedProject: ProjectData | undefined;
  showDetails(pjList: string) {
    // Enable or disable button conditionally
    if (this.isDisabled == true) {
      this.isDisabled = false;
    }

    this.projectDatas$
      .pipe(take(1))
      .subscribe((projectDatas: ProjectData[]) => {
        this.selectedProject = projectDatas.find(
          (projectData) => projectData.projectId === pjList
        );
      });
  }
}
