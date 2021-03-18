import { Component, OnInit } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faHome} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  faHome = faHome;

  constructor() {}

  ngOnInit(): void {}
}
