import { Component, OnInit } from '@angular/core';
import {
  faRocket,
  faHome,
  faSyncAlt,
  faImage,
  faSignOutAlt,
  faClipboard,
} from '@fortawesome/free-solid-svg-icons';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  faRocket = faRocket;
  faHome = faHome;
  faSyncAlt = faSyncAlt;
  faImage = faImage;
  faSignOutAlt = faSignOutAlt;
  faClipboard = faClipboard;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {}

  logout() {
    this.tokenService.signOut();
  }
}
