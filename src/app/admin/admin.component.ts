import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icones } from 'src/assets/icones';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./assets/admin.component.scss'],
})
export class AdminComponent implements OnInit {
  iconePainel!: SafeHtml;
  iconeImoveis!: SafeHtml;
  iconeBiblioteca!: SafeHtml;
  iconeLead!: SafeHtml;
  iconeBlog!: SafeHtml;
  iconeConf!: SafeHtml;

  constructor(private tokenService: TokenService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.iconePainel = this.sanitizer.bypassSecurityTrustHtml(icones.iconePainel);
    this.iconeImoveis = this.sanitizer.bypassSecurityTrustHtml(icones.iconeImoveis);
    this.iconeBiblioteca = this.sanitizer.bypassSecurityTrustHtml(icones.iconeBiblioteca);
    this.iconeLead = this.sanitizer.bypassSecurityTrustHtml(icones.iconeLead);
    this.iconeBlog = this.sanitizer.bypassSecurityTrustHtml(icones.iconeBlog);
    this.iconeConf = this.sanitizer.bypassSecurityTrustHtml(icones.iconeConf);
  }

  logout() {
    this.tokenService.signOut();
  }
}
