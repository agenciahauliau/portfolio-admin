import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./assets/admin.component.scss'],
})
export class AdminComponent implements OnInit {

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {}

  logout() {
    this.tokenService.signOut();
  }
}
