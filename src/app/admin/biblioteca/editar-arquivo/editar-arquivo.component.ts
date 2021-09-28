import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from '../../../helpers/types';

import { GraphQlService } from '../../../services/graphql.service';
import { environment } from '../../../../environments/environment';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GQL_BUSCAR_FILE } from 'src/app/graphql/graphql';

@Component({
  selector: 'app-editar-arquivo',
  templateUrl: './editar-arquivo.component.html',
  styleUrls: [
    './editar-arquivo.component.scss',
    '../../assets/form.component.scss',
    '../../assets/admin.component.scss',
  ],
})
export class EditarArquivoComponent implements OnInit, OnDestroy {
  public url = `${environment.API}files/`;
  public fileForm!: File & FormGroup;
  public fileQuery!: QueryRef<any>;
  public loading = true;
  public error: any;
  private querySubs = new Subscription();

  public imagem: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo,
    private formBuilder: FormBuilder,
    private gqlService: GraphQlService,
  ) {}

  ngOnInit(): void {
    this.fileForm = this.formBuilder.group({
      name: [''],
      tipo: [''],
      altText: [''],
    });

    const fileId = this.route.snapshot.paramMap.get('id');
    this.fileQuery = this.apollo.watchQuery<File>({
      query: GQL_BUSCAR_FILE,
      variables: {
        fileDados: {
          _id: fileId,
        },
      },
    });

    this.querySubs = this.fileQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.fileForm.patchValue(data.file);
      this.imagem = data.file.name;
    });
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }

  get getControl() {
    return this.fileForm.controls;
  }

  refresh() {
    this.fileQuery.refetch();
  }

  voltar() {
    this.router.navigate(['admin/biblioteca']);
  }

  async onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.gqlService
      .atualizaFile(id, this.fileForm.value)
      .then((res: any) => {
        if (res.data) {
          console.log('Sucesso', res?.data);
          window.alert(`Post Atualizado!!\nID: ${res?.data.updateFile.fileId}`);
          this.voltar();
        }
        if (res.errors) {
          console.log('Erro', res.errors);
          window.alert(`Erro ao atualizar!!`);
        }
      })
      .catch((err) => {
        console.log('Erro', err);
        window.alert(`Erro ao atualizar!!`);
      });
  }
}
