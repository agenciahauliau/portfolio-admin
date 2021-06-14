import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faEdit,
  faEye,
  faImage,
  faPlusSquare,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GQL_LISTAR_POSTS } from '../../../graphql/graphql';
import { Post } from '../../../helpers/types';
import { GraphQlService } from '../../../services/graphql.service';

@Component({
  selector: 'app-listar-posts',
  templateUrl: './listar-posts.component.html',
  styleUrls: ['./listar-posts.component.scss', '../../admin.component.scss'],
})
export class ListarPostsComponent implements OnInit, OnDestroy {
  faEye = faEye;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faImage = faImage;
  faPlusSquare = faPlusSquare;

  posts!: Post[];
  postsQuery!: QueryRef<any>;
  loading = true;
  error: any;

  p: number = 1;

  private querySubs = new Subscription();

  constructor(private apollo: Apollo, private router: Router, private gqlService: GraphQlService) {}

  ngOnInit(): void {
    this.postsQuery = this.apollo.watchQuery<any>({
      query: GQL_LISTAR_POSTS,
    });

    this.querySubs = this.postsQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.posts = [...data.posts];
      console.log(data.posts);
    });
  }

  goToPost(postId: any) {
    this.router.navigate(['admin/post', postId]);
  }

  editarPost(postId: any) {
    this.router.navigate(['admin/editar-post', postId]);
  }

  refresh() {
    this.postsQuery.refetch();
  }

  async remover(id: any) {
    if (confirm(`Têm certeza que quer deletar?`)) {
      await this.gqlService.deletarPost(id);
      this.refresh();
    } else {
      this.refresh();
    }
  }

  ngOnDestroy() {
    this.querySubs.unsubscribe();
  }

  async atualizaStatus(id: unknown, event: any) {
    const status = { status: event.target.value };
    console.log(event);
    if (confirm(`Confirma alteração para "${event.target.value}" ?`)) {
      await this.gqlService
        .atualizaPost(id, status)
        .then((res: any) => {
          if (res.data) {
            console.log('Sucesso', res?.data?.updatePost?.status);
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
      this.router.navigateByUrl('./', { skipLocationChange: true });
    }
  }
}
