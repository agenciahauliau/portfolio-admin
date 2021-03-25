import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faHome, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { Galeria } from 'src/app/helpers/types';
import { GQL_PESQ_GALERIA } from 'src/app/graphql/graphql';

@Component({
  selector: 'app-exibir-galeria',
  templateUrl: './exibir-galeria.component.html',
  styleUrls: ['./exibir-galeria.component.scss', '../../admin.component.scss'],
})
export class ExibirGaleriaComponent implements OnInit, OnDestroy {
  faPlusSquare = faPlusSquare;
  faHome = faHome;
  faSyncAlt = faSyncAlt;

  galeria!: Galeria;
  galeriaQuery!: QueryRef<any>;
  loading = true;
  error: any;

  private querySubs = new Subscription();
  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const galeriaId = this.route.snapshot.paramMap.get('id');
    this.galeriaQuery = this.apollo.watchQuery<Galeria>({
      query: GQL_PESQ_GALERIA,
      variables: {
        _id: galeriaId,
      },
      errorPolicy: 'all',
    });

    this.querySubs = this.galeriaQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.galeria = data.galeria;
    });
  }

  refresh() {
    this.galeriaQuery.refetch();
  }

  voltar() {
    this.router.navigate(['/admin']);
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }
}
