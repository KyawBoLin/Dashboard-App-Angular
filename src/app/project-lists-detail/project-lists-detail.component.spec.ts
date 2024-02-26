import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListsDetailComponent } from './project-lists-detail.component';

describe('ProjectListsDetailComponent', () => {
  let component: ProjectListsDetailComponent;
  let fixture: ComponentFixture<ProjectListsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListsDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectListsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
