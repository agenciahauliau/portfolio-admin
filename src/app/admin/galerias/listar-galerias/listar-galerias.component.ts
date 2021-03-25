import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { faTrashAlt, faEye, faPlusSquare, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';

import { GraphQlService } from '../../../services/graphql.service';
import { GQL_EXIBE_GALERIAS } from '../../../graphql/graphql';
import { Galeria } from '../../../helpers/types';

@Component({
  selector: 'app-listar-galerias',
  templateUrl: './listar-galerias.component.html',
  styleUrls: ['./listar-galerias.component.scss', '../../admin.component.scss'],
})
export class ListarGaleriasComponent implements OnInit {
  faEye = faEye;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faImage = faImage;
  faPlusSquare = faPlusSquare;

  galerias!: Galeria[];
  galeriasQuery!: QueryRef<any>;
  loading = true;
  error: any;

  private querySubs = new Subscription();

  constructor(
    private apollo: Apollo,
    private router: Router,
    private accountService: GraphQlService,
  ) {}

  ngOnInit() {
    this.galeriasQuery = this.apollo.watchQuery<any>({
      query: GQL_EXIBE_GALERIAS,
      pollInterval: 500,
    });

    this.querySubs = this.galeriasQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.galerias = data.galerias;
    });
  }

  goToGaleria(galeriaId: any) {
    this.router.navigate(['admin/galeria', galeriaId]);
  }

  editarGaleria(galeriaId: any) {
    this.router.navigate(['admin/editar-galeria', galeriaId]);
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
