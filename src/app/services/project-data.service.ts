/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ProjectData } from '../interface/project-data';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../directive/sortable.directive';
import { HttpClient } from '@angular/common/http';

interface SearchResult {
	projectDatas: ProjectData[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(
  projectDatas: ProjectData[],
  column: SortColumn,
  direction: string
): ProjectData[] {
  if (direction === '' || column === '') {
    return projectDatas;
  } else {
    return [...projectDatas].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function showDetail(project: ProjectData) {
  return project.scale;
}

function matches(project: ProjectData, term: string, pipe: PipeTransform) {
	return (
    project.projectId.toLowerCase().includes(term.toLowerCase()) ||
    project.scale.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(project.status).includes(term) ||
    pipe.transform(project.spi).includes(term)
  );
}

export const PROJECTDATAS: ProjectData[] = [
  {
    projectId: 'Project A',
    scale: 'P01人月',
    date: '2023/4~2024/1',
    status: '146989754',
    system_team: 'Team Alpha',
    process: 'Agile',
    process_status: 'Ongoing',
    planning_status: 'In Progress',
    progress_status: '50%',
    num_delayed_tasks: '3',
    num_completed_tasks: '15',
    total_tasks: '20',
    assignment_status: 'Assigned',
    num_unconfirmed_issues: '2',
    critical: '5',
    non_critical: '10',
    num_completed_assignments: '8',
    total_assignments: '10',
    spi: '1.2',
    cpi: '0.9',
    pv: '100',
    ev: '90',
    ac: '100',
    progress: 'On Track',
    assignment: 'Active',
    xx: 'DataX',
  },
  {
    projectId: 'Project B',
    scale: 'P02人月',
    date: '2023/4~2024/1',
    status: '640679',
    system_team: 'Team Beta',
    process: 'Waterfall',
    process_status: 'Completed',
    planning_status: 'Completed',
    progress_status: '100%',
    num_delayed_tasks: '0',
    num_completed_tasks: '25',
    total_tasks: '25',
    assignment_status: 'Completed',
    num_unconfirmed_issues: '0',
    critical: '2',
    non_critical: '8',
    num_completed_assignments: '10',
    total_assignments: '10',
    spi: '1.0',
    cpi: '1.1',
    pv: '150',
    ev: '165',
    ac: '150',
    progress: 'Completed',
    assignment: 'Completed',
    xx: 'DataY',
  },
  {
    projectId: 'Project C',
    scale: 'P03人月',
    date: '2023/4~2024/1',
    status: '357114',
    system_team: 'Team Gamma',
    process: 'Scrum',
    process_status: 'Ongoing',
    planning_status: 'Not Started',
    progress_status: '25%',
    num_delayed_tasks: '5',
    num_completed_tasks: '10',
    total_tasks: '15',
    assignment_status: 'Assigned',
    num_unconfirmed_issues: '1',
    critical: '3',
    non_critical: '7',
    num_completed_assignments: '5',
    total_assignments: '8',
    spi: '0.8',
    cpi: '0.9',
    pv: '50',
    ev: '45',
    ac: '50',
    progress: 'Behind Schedule',
    assignment: 'Active',
    xx: 'DataZ',
  },
  {
    projectId: 'Project D',
    scale: 'P04人月',
    date: '2023/4~2024/1',
    status: '357114',
    system_team: 'Team Gamma',
    process: 'Scrum',
    process_status: 'Ongoing',
    planning_status: 'Not Started',
    progress_status: '25%',
    num_delayed_tasks: '5',
    num_completed_tasks: '10',
    total_tasks: '15',
    assignment_status: 'Assigned',
    num_unconfirmed_issues: '1',
    critical: '3',
    non_critical: '7',
    num_completed_assignments: '5',
    total_assignments: '8',
    spi: '0.8',
    cpi: '0.9',
    pv: '50',
    ev: '45',
    ac: '50',
    progress: 'Behind Schedule',
    assignment: 'Active',
    xx: 'DataZ',
  },
  {
    projectId: 'Project E',
    scale: 'P05人月',
    date: '2023/4~2024/1',
    status: '357114',
    system_team: 'Team Gamma',
    process: 'Scrum',
    process_status: 'Ongoing',
    planning_status: 'Not Started',
    progress_status: '25%',
    num_delayed_tasks: '5',
    num_completed_tasks: '10',
    total_tasks: '15',
    assignment_status: 'Assigned',
    num_unconfirmed_issues: '1',
    critical: '3',
    non_critical: '7',
    num_completed_assignments: '5',
    total_assignments: '8',
    spi: '0.8',
    cpi: '0.9',
    pv: '50',
    ev: '45',
    ac: '50',
    progress: 'Behind Schedule',
    assignment: 'Active',
    xx: 'DataZ',
  },
  {
    projectId: 'Project F',
    scale: 'P06人月',
    date: '2023/4~2024/1',
    status: '357114',
    system_team: 'Team Gamma',
    process: 'Scrum',
    process_status: 'Ongoing',
    planning_status: 'Not Started',
    progress_status: '25%',
    num_delayed_tasks: '5',
    num_completed_tasks: '10',
    total_tasks: '15',
    assignment_status: 'Assigned',
    num_unconfirmed_issues: '1',
    critical: '3',
    non_critical: '7',
    num_completed_assignments: '5',
    total_assignments: '8',
    spi: '0.8',
    cpi: '0.9',
    pv: '50',
    ev: '45',
    ac: '50',
    progress: 'Behind Schedule',
    assignment: 'Active',
    xx: 'DataZ',
  },
  {
    projectId: 'Project G',
    scale: 'P07人月',
    date: '2023/4~2024/1',
    status: '357114',
    system_team: 'Team Gamma',
    process: 'Scrum',
    process_status: 'Ongoing',
    planning_status: 'Not Started',
    progress_status: '25%',
    num_delayed_tasks: '5',
    num_completed_tasks: '10',
    total_tasks: '15',
    assignment_status: 'Assigned',
    num_unconfirmed_issues: '1',
    critical: '3',
    non_critical: '7',
    num_completed_assignments: '5',
    total_assignments: '8',
    spi: '0.8',
    cpi: '0.9',
    pv: '50',
    ev: '45',
    ac: '50',
    progress: 'Behind Schedule',
    assignment: 'Active',
    xx: 'DataZ',
  },
  {
    projectId: 'Project H',
    scale: 'P08人月',
    date: '2023/4~2024/1',
    status: '357114',
    system_team: 'Team Gamma',
    process: 'Scrum',
    process_status: 'Ongoing',
    planning_status: 'Not Started',
    progress_status: '25%',
    num_delayed_tasks: '5',
    num_completed_tasks: '10',
    total_tasks: '15',
    assignment_status: 'Assigned',
    num_unconfirmed_issues: '1',
    critical: '3',
    non_critical: '7',
    num_completed_assignments: '5',
    total_assignments: '8',
    spi: '0.8',
    cpi: '0.9',
    pv: '50',
    ev: '45',
    ac: '50',
    progress: 'Behind Schedule',
    assignment: 'Active',
    xx: 'DataZ',
  },
  {
    projectId: 'Project I',
    scale: 'P09人月',
    date: '2023/4~2024/1',
    status: '357114',
    system_team: 'Team Gamma',
    process: 'Scrum',
    process_status: 'Ongoing',
    planning_status: 'Not Started',
    progress_status: '25%',
    num_delayed_tasks: '5',
    num_completed_tasks: '10',
    total_tasks: '15',
    assignment_status: 'Assigned',
    num_unconfirmed_issues: '1',
    critical: '3',
    non_critical: '7',
    num_completed_assignments: '5',
    total_assignments: '8',
    spi: '0.8',
    cpi: '0.9',
    pv: '50',
    ev: '45',
    ac: '50',
    progress: 'Behind Schedule',
    assignment: 'Active',
    xx: 'DataZ',
  },
  {
    projectId: 'Project K',
    scale: 'P10人月',
    date: '2023/4~2024/1',
    status: '357114',
    system_team: 'Team Gamma',
    process: 'Scrum',
    process_status: 'Ongoing',
    planning_status: 'Not Started',
    progress_status: '25%',
    num_delayed_tasks: '5',
    num_completed_tasks: '10',
    total_tasks: '15',
    assignment_status: 'Assigned',
    num_unconfirmed_issues: '1',
    critical: '3',
    non_critical: '7',
    num_completed_assignments: '5',
    total_assignments: '8',
    spi: '0.8',
    cpi: '0.9',
    pv: '50',
    ev: '45',
    ac: '50',
    progress: 'Behind Schedule',
    assignment: 'Active',
    xx: 'DataZ',
  },
  {
    projectId: 'Project L',
    scale: 'P11人月',
    date: '2023/4~2024/1',
    status: '357114',
    system_team: 'Team Gamma',
    process: 'Scrum',
    process_status: 'Ongoing',
    planning_status: 'Not Started',
    progress_status: '25%',
    num_delayed_tasks: '5',
    num_completed_tasks: '10',
    total_tasks: '15',
    assignment_status: 'Assigned',
    num_unconfirmed_issues: '1',
    critical: '3',
    non_critical: '7',
    num_completed_assignments: '5',
    total_assignments: '8',
    spi: '0.8',
    cpi: '0.9',
    pv: '50',
    ev: '45',
    ac: '50',
    progress: 'Behind Schedule',
    assignment: 'Active',
    xx: 'DataZ',
  },
  {
    projectId: 'Project M',
    scale: 'P12人月',
    date: '2023/4~2024/1',
    status: '357114',
    system_team: 'Team Gamma',
    process: 'Scrum',
    process_status: 'Ongoing',
    planning_status: 'Not Started',
    progress_status: '25%',
    num_delayed_tasks: '5',
    num_completed_tasks: '10',
    total_tasks: '15',
    assignment_status: 'Assigned',
    num_unconfirmed_issues: '1',
    critical: '3',
    non_critical: '7',
    num_completed_assignments: '5',
    total_assignments: '8',
    spi: '0.8',
    cpi: '0.9',
    pv: '50',
    ev: '45',
    ac: '50',
    progress: 'Behind Schedule',
    assignment: 'Active',
    xx: 'DataZ',
  },
  {
    projectId: 'Project N',
    scale: 'P13人月',
    date: '2023/4~2024/1',
    status: '357114',
    system_team: 'Team Gamma',
    process: 'Scrum',
    process_status: 'Ongoing',
    planning_status: 'Not Started',
    progress_status: '25%',
    num_delayed_tasks: '5',
    num_completed_tasks: '10',
    total_tasks: '15',
    assignment_status: 'Assigned',
    num_unconfirmed_issues: '1',
    critical: '3',
    non_critical: '7',
    num_completed_assignments: '5',
    total_assignments: '8',
    spi: '0.8',
    cpi: '0.9',
    pv: '50',
    ev: '45',
    ac: '50',
    progress: 'Behind Schedule',
    assignment: 'Active',
    xx: 'DataZ',
  },
];

@Injectable({ providedIn: 'root' })
export class ProjectDataService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _projectDatas$ = new BehaviorSubject<ProjectData[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  // baseUrl = 'http://localhost:3001';

  // PROJECTDATAS: Observable<ProjectData[]> = this.http.get<ProjectData[]>(
  //   this.baseUrl + '/company-detail-list'
  // );

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(private pipe: DecimalPipe, private http: HttpClient) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._projectDatas$.next(result.projectDatas);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get projectDatas$() {
    // return this.http.get<ProjectData[]>(this.baseUrl + '/company-detail-list');

    return this._projectDatas$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;

    // 1. sort
    let projectDatas = sort(PROJECTDATAS, sortColumn, sortDirection);

    // 2. filter
    projectDatas = projectDatas.filter((country) =>
      matches(country, searchTerm, this.pipe)
    );
    const total = projectDatas.length;

    // 3. paginate
    projectDatas = projectDatas.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ projectDatas, total });
  }
}
