import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GQL_BUSCAR_GALERIA } from '../../../graphql/graphql';
import { Galeria } from '../../../helpers/types';
import { GraphQlService } from '../../../services/graphql.service';

@Component({
  selector: 'app-editar-galeria',
  templateUrl: './editar-galeria.component.html',
  styleUrls: ['./editar-galeria.component.scss', '../../admin.component.scss'],
})
export class EditarGaleriaComponent implements OnInit, OnDestroy {
  faPlusSquare = faPlusSquare;
  loading = true;
  error: any;
  galeriaId = this.route.snapshot.paramMap.get('id');
  galeriaQuery!: QueryRef<any>;
  form: any = {
    nomeGaleria: '',
    arquivoDestaque: '',
    url: [''],
    idImovel: [''],
  };

  private querySubs = new Subscription();

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    private gqlService: GraphQlService,
  ) {}

  ngOnInit(): void {
    const galeriaId = this.route.snapshot.paramMap.get('id');
    this.galeriaQuery = this.apollo.watchQuery<Galeria>({
      query: GQL_BUSCAR_GALERIA,
      variables: {
        id: galeriaId,
      },
      errorPolicy: 'all',
    });

    this.querySubs = this.galeriaQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.form = data.galeria;
    });
  }

  async onSubmit() {
    if (this.form.idImovel) {
      this.form.idImovel = this.separa(this.form.idImovel + '');
    }
    if (this.form.url) {
      this.form.url = this.separa(this.form.url + '');
      this.form.arquivoDestaque = this.form.url?.[0];
    }
    await this.gqlService.atualizaGaleria(this.galeriaId, this.form);
    setTimeout(() => {
      window.alert('Galeria Atualizada');
      this.refresh();
    }, 2000);
  }

  refresh() {
    this.galeriaQuery.refetch();
  }

  voltar() {
    this.router.navigate(['galeria', this.galeriaId]);
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }

  separa(data: any) {
    return data.split(/\n+|\r+|,\s+/g).filter(Boolean);
  }
}
