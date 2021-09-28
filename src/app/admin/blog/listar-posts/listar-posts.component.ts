import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GQL_LISTAR_POSTS } from '../../../graphql/graphql';
import { Post } from '../../../helpers/types';
import { GraphQlService } from '../../../services/graphql.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icones } from 'src/assets/icones';

@Component({
  selector: 'app-listar-posts',
  templateUrl: './listar-posts.component.html',
  styleUrls: ['../../assets/lista-itens.component.scss', '../../assets/admin.component.scss'],
})
export class ListarPostsComponent implements OnInit, OnDestroy {
  posts!: Post[];
  postsQuery!: QueryRef<any>;
  loading = true;
  error: any;

  p: number = 1;

  private querySubs = new Subscription();

  iconeEditar!: SafeHtml;
  iconeExcluir!: SafeHtml;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private gqlService: GraphQlService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.iconeEditar = this.sanitizer.bypassSecurityTrustHtml(icones.iconeEditar);
    this.iconeExcluir = this.sanitizer.bypassSecurityTrustHtml(icones.iconeExcluir);

    this.postsQuery = this.apollo.watchQuery<any>({
      query: GQL_LISTAR_POSTS,
    });

    this.querySubs = this.postsQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.posts = [...data.posts];

      console.log(this.posts);
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
    // const status = { status: event.target.value };
    const status = () => {
      if (event.target.checked === true) {
        return 'publicado';
      } else {
        return 'rascunho';
      }
    };
    const statusPub = { status: status() };

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
