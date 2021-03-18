import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GQL_BUSCAR_IMOVEL } from '../../helpers/graphql';
import { Imovel } from '../../helpers/types';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faHome, faSyncAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-exibir-imovel',
  templateUrl: './exibir-imovel.component.html',
  styleUrls: ['./exibir-imovel.component.scss'],
})
export class ExibirImovelComponent implements OnInit, OnDestroy {
  faPlusSquare = faPlusSquare;
  faHome = faHome;
  faSyncAlt = faSyncAlt;

  imovel!: Imovel;
  imovelQuery!: QueryRef<any>;
  loading = true;
  error: any;

  private querySubs = new Subscription();
  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const imovelId = this.route.snapshot.paramMap.get('id');
    this.imovelQuery = this.apollo.watchQuery<Imovel>({
      query: GQL_BUSCAR_IMOVEL,
      variables: {
        _id: imovelId,
      },
      errorPolicy: 'all',
    });

    this.querySubs = this.imovelQuery.valueChanges.subscribe(
      ({ data, loading }) => {
        this.loading = loading;
        this.imovel = data.imovel;
      }
    );
  }

  refresh() {
    this.imovelQuery.refetch();
  }

  voltar() {
    this.router.navigate(['/imoveis']);
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }
}
