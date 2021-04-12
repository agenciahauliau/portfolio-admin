import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faEye, faPlusSquare, faEdit } from '@fortawesome/free-regular-svg-icons';
import { GraphQlService } from '../../../services/graphql.service';
import { GQL_LISTAR_IMOVEIS } from '../../../graphql/graphql';
import { Imovel } from '../../../helpers/types';

@Component({
  selector: 'app-listar-imoveis',
  templateUrl: './listar-imoveis.component.html',
  styleUrls: ['./listar-imoveis.component.scss', '../../admin.component.scss'],
})
export class ListarImoveisComponent implements OnInit, OnDestroy {
  faEye = faEye;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faImage = faImage;
  faPlusSquare = faPlusSquare;

  imoveis!: Imovel[];
  imoveisQuery!: QueryRef<any>;
  loading = true;
  error: any;

  private querySubs = new Subscription();

  constructor(private apollo: Apollo, private router: Router, private gqlService: GraphQlService) {}

  ngOnInit() {
    this.imoveisQuery = this.apollo.watchQuery<any>({
      query: GQL_LISTAR_IMOVEIS,
      nextFetchPolicy: 'cache-and-network',
    });

    this.querySubs = this.imoveisQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.imoveis = data.imoveis;
    });
  }

  goToImovel(imovelId: any) {
    this.router.navigate(['admin/imovel', imovelId]);
  }

  editarImovel(imovelId: any) {
    this.router.navigate(['admin/editar-imovel', imovelId]);
  }

  async atualizaStatus(id: unknown, event: any) {
    const status = { statusLancamento: event.target.value };
    console.log(event);
    if (confirm(`Confirma alteração para "${event.target.value}" ?`)) {
      await this.gqlService
        .atualizaImovel(id, status)
        .then((res: any) => {
          if (res.data) {
            console.log('Sucesso', res?.data?.updateImovel?.statusLancamento);
          }
          if (res.errors) {
            console.log('Erro', res?.errors[0]?.message);
            window.alert(`Erro: ${res.errors[0].message}`);
          }
        })
        .catch((err) => {
          console.log('err', err);
        });
    } else {
      this.router.navigateByUrl('/', { skipLocationChange: true });
    }
  }

  refresh() {
    this.imoveisQuery.refetch();
  }

  async remover(id: any) {
    await this.gqlService.deletarImovel(id);
    this.refresh();
  }

  ngOnDestroy() {
    this.querySubs.unsubscribe();
  }
}
