import { Component, OnInit } from '@angular/core';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from '../services/token.service';
import { icones } from '../../assets/icones'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./assets/admin.component.scss'],
})
export class AdminComponent implements OnInit {

  public imoveis = icones.imoveis;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {}

  logout() {
    this.tokenService.signOut();
  }
}
