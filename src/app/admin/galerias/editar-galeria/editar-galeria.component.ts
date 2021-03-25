import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GQL_PESQ_GALERIA } from 'src/app/graphql/graphql';
import { Galeria } from 'src/app/helpers/types';
import { GraphQlService } from 'src/app/services/graphql.service';

@Component({
  selector: 'app-editar-galeria',
  templateUrl: './editar-galeria.component.html',
  styleUrls: ['./editar-galeria.component.scss', '../../admin.component.scss'],
})
export class EditarGaleriaComponent implements OnInit, OnDestroy {
  form: Galeria = {
    nomeGaleria: '',
    arquivoDestaque: '',
    idImovel: [''],
    url: [''],
  };
  faPlusSquare = faPlusSquare;
  galeriaQuery!: QueryRef<any>;
  loading = true;
  error: any;

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
      query: GQL_PESQ_GALERIA,
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
    const galeriaId = this.route.snapshot.paramMap.get('id');
    if (this.form.idImovel) {
      this.form.idImovel = this.separa(this.form.idImovel + '');
    }
    if (this.form.url) {
      this.form.url = this.separa(this.form.url + '');
      this.form.arquivoDestaque = this.form.url?.[0];
    }
    await this.gqlService.atualizaGaleria(galeriaId, this.form);
    setTimeout(() => {
      window.alert('Galeria Atualizada');
      this.voltar();
    }, 2000);
  }

  refresh() {
    this.galeriaQuery.refetch();
  }

  voltar() {
    this.router.navigate(['../']);
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }

  separa(data: any) {
    return data.split(/\n+|\r+|,\s+/g).filter(Boolean);
  }
}
