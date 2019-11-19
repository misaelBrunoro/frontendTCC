import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-disciplinas',
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.scss']
})
export class DisciplinasComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Nome'];
  dataSource = new MatTableDataSource<any>([]);

  constructor() { }

  ngOnInit() {
  }

}
