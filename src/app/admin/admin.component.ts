import { Component, OnInit } from '@angular/core';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  faRocket = faRocket;

  constructor() {}

  ngOnInit(): void {}
}
