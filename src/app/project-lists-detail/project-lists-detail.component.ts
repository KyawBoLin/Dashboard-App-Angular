import { Component, OnInit, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectData } from '../interface/project-data';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-project-lists-detail',
  standalone: true,
  imports: [NgbNavModule, RouterOutlet, NgIf],
  templateUrl: './project-lists-detail.component.html',
  styleUrl: './project-lists-detail.component.css',
})
export class ProjectListsDetailComponent {
  active = 1;
  @Input() projectDatas$: ProjectData | undefined;
}
