import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { GraphQlService } from 'src/app/services/graphql.service';
import { Subscription } from 'rxjs';
import { GQL_BUSCAR_POST } from '../../../graphql/graphql';
import { Post } from '../../../helpers/types';

@Component({
  selector: 'app-exibir-post',
  templateUrl: './exibir-post.component.html',
  styleUrls: ['./exibir-post.component.scss', '../../assets/admin.component.scss'],
})
export class ExibirPostComponent implements OnInit, OnDestroy {
  
  post!: Post;
  postQuery!: QueryRef<any>;
  loading = true;
  error: any;

  private querySubs = new Subscription();
  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router, private gqlService: GraphQlService) {}

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

  async remover(id: any) {
    if (confirm(`Têm certeza que quer deletar?`)) {
      await this.gqlService.deletarPost(id);
      this.router.navigate(['admin/posts']);
    } else {
      this.refresh();
    }
  }

  async atualizaStatus(id: unknown, event: any) {
    // const status = { status: event.target.value };
    const status = () => {
      if(event.target.checked === true){
        return 'publicado'
      } else {
        return 'rascunho'
      }
    };
    const statusPub = {status: status()}

    console.log(event);

    await this.gqlService
      .atualizaPost(id, statusPub)
      .then((res: any) => {
        if (res.data) {
          console.log('Sucesso', res?.data?.updatePost?.status);
        }
        if (res.errors) {
          console.log('Erro', res?.errors[0]?.message);
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
}
