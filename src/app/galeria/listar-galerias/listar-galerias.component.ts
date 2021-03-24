import { Component, OnInit } from '@angular/core';
import {
  faTrashAlt,
  faEye,
  faPlusSquare,
} from '@fortawesome/free-regular-svg-icons';
import { faHome, faSyncAlt, faImage } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { AccountService } from '../../services/account.service';

import { Galeria } from '../../helpers/types';
import { GQL_EXIBE_GALERIASS } from 'src/app/helpers/graphql';

@Component({
  selector: 'app-listar-galerias',
  templateUrl: './listar-galerias.component.html',
  styleUrls: ['./listar-galerias.component.scss'],
})
export class ListarGaleriasComponent implements OnInit {
  faEye = faEye;
  faTrashAlt = faTrashAlt;
  faPlusSquare = faPlusSquare;
  faHome = faHome;
  faSyncAlt = faSyncAlt;
  faImage = faImage;

  galerias!: Galeria[];
  galeriasQuery!: QueryRef<any>;
  loading = true;
  error: any;

  private querySubs = new Subscription();

  constructor(
    private apollo: Apollo,
    private router: Router,
    private accountService: AccountService,
  ) {}

  ngOnInit() {
    this.galeriasQuery = this.apollo.watchQuery<any>({
      query: GQL_EXIBE_GALERIASS,
      pollInterval: 500,
    });

    this.querySubs = this.galeriasQuery.valueChanges.subscribe(
      ({ data, loading }) => {
        this.loading = loading;
        this.galerias = data.galerias;
      },
    );
  }

  goToGaleria(galeriaId: any) {
    this.router.navigate(['admin/galeria', galeriaId]);
  }

  refresh() {
    this.galeriasQuery.refetch();
  }

  async remover(id: any) {
    await this.accountService.removeGaleria(id);
    this.refresh();
  }

  ngOnDestroy() {
    this.querySubs.unsubscribe();
  }
}
