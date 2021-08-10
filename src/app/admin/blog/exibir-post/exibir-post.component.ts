import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { faPlusSquare, faEdit } from '@fortawesome/free-regular-svg-icons';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { GQL_BUSCAR_POST } from '../../../graphql/graphql';
import { Post } from '../../../helpers/types';

@Component({
  selector: 'app-exibir-post',
  templateUrl: './exibir-post.component.html',
  styleUrls: ['./exibir-post.component.scss', '../../assets/admin.component.scss'],
})
export class ExibirPostComponent implements OnInit, OnDestroy {
  faPlusSquare = faPlusSquare;
  faEdit = faEdit;
  faSyncAlt = faSyncAlt;

  post!: Post;
  postQuery!: QueryRef<any>;
  loading = true;
  error: any;

  private querySubs = new Subscription();
  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    this.postQuery = this.apollo.watchQuery<Post>({
      query: GQL_BUSCAR_POST,
      variables: {
        id: postId,
      },
      errorPolicy: 'all',
    });

    this.querySubs = this.postQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.post = data.post;
    });
  }

  editarPost(postId: any) {
    this.router.navigate(['admin/editar-post', postId]);
  }

  refresh() {
    this.postQuery.refetch();
  }

  voltar() {
    this.router.navigate(['admin/imoveis']);
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }
}
