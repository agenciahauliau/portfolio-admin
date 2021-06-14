import { Component, OnInit } from '@angular/core';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  faRss = faRss;
  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {}

  logout() {
    this.tokenService.signOut();
  }
}
