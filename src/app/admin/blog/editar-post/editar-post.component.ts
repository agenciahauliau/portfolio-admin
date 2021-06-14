import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../../helpers/types';
import { GraphQlService } from '../../../services/graphql.service';
import { UploadService } from '../../../services/upload.service';
import { environment } from '../../../../environments/environment';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GQL_BUSCAR_POST } from 'src/app/graphql/graphql';

@Component({
  selector: 'app-editar-post',
  templateUrl: '../form-post.component.html',
  styleUrls: ['../form-post.component.scss', '../../admin.component.scss'],
})
export class EditarPostComponent implements OnInit, OnDestroy {
  /* Para upload */
  url = `${environment.API}files/`;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  mainImg = '';
  imgPreview: any;

  faPlusSquare = faPlusSquare;
  faTrash = faTrash;

  postForm!: Post & FormGroup;

  postQuery!: QueryRef<any>;
  loading = true;
  error: any;

  private querySubs = new Subscription();
  public isActive: boolean = false;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private gqlService: GraphQlService,
    private uploadService: UploadService,
  ) {}

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      status: '',
      titulo: ['', [Validators.required, Validators.minLength(4)]],
      descricao: [''],
      conteudo: [''],
      imagemPrincipal: [''],
      categoria: [[]],
      tags: [[]],
    });

    const postId = this.route.snapshot.paramMap.get('id');
    this.postQuery = this.apollo.watchQuery<Post>({
      query: GQL_BUSCAR_POST,
      variables: {
        id: postId,
      },
    });

    this.querySubs = this.postQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.postForm.patchValue(data.post);
      this.mainImg = data.post.imagemPrincipal;
      this.patchDadosPostForm();
      this.postForm.patchValue({
        tags: data.post.tags.join(', '),
      });
      this.postForm.patchValue({
        categoria: data.post.categoria.join(', '),
      });
    });
  }

  ngOnDestroy(): void {
    this.querySubs.unsubscribe();
  }

  get getControl() {
    return this.postForm.controls;
  }

  patchDadosPostForm() {
    if (this.postForm.value.categoria) {
      this.postForm.value.categoria = this.separa(this.postForm.value.categoria + '');
    }
    if (this.postForm.value.tags) {
      this.postForm.value.tags = this.separa(this.postForm.value.tags + '');
    }
    this.postForm.value.imagemPrincipal = this.mainImg;
  }

  refresh() {
    this.postQuery.refetch();
  }

  voltar() {
    this.router.navigate(['admin/posts']);
  }

  separa(data: any) {
    return data.split(/\n+|\r+|,\s?/g).filter(Boolean);
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    /* Previsualização da imagem */
    let mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert('Campo somente para imagens.');
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      this.imgPreview = reader.result;
    };
  }

  /* Imagem principal */
  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name, url: '' };
    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Arquivo enviado com sucesso ' + file.name;
            this.progressInfos[idx].url = this.url + event.body[0];
            this.message.push(msg);
            this.mainImg = this.url + event.body[0];
          }
        },
        (error: any) => {
          this.progressInfos[idx].value = 0;
          const msg = `Não foi possível subir o arquivo: ${file.name}\n Possivel Causa: ${error}`;
          this.message.push(msg);
        },
      );
    }
  }

  deletaImgPrincipal(imgUrl: string): void {
    this.uploadService
      .deletaArquivo(imgUrl)
      .then((res: any) => {
        if (res.data) {
          console.log('Sucesso', res?.data);
          this.message = [];
          this.progressInfos = [];
          this.mainImg = '';
        }
        if (res.errors) {
          console.log('Erro', res?.errors[0]?.message);
          window.alert(`Erro: ${res.errors[0].message}`);
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  ativaModal(event: any) {
    if (event.target.id === 'complemento') {
      this.isActive ? (this.isActive = false) : (this.isActive = true);
    }
  }

  async onSubmit() {
    const postId = this.route.snapshot.paramMap.get('id');
    this.patchDadosPostForm();
    if (this.postForm.value.status != 'publicado') this.postForm.value.status = 'rascunho';
    await this.gqlService
      .atualizaPost(postId, this.postForm.value)
      .then((res: any) => {
        if (res.data) {
          console.log('Sucesso', res?.data);
          window.alert(`Post Atualizado!!\nID: ${res?.data.updatePost.postId}`);
          this.voltar();
        }
        if (res.errors) {
          console.log('Erro', res?.errors[0]?.message);
          window.alert(`Erro: ${res.errors[0].message}`);
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
}
