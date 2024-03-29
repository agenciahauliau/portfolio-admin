import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../../helpers/types';
import { GraphQlService } from '../../../services/graphql.service';
import { UploadService } from '../../../services/upload.service';
import { environment } from '../../../../environments/environment';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icones } from 'src/assets/icones';

@Component({
  selector: 'app-criar-post',
  templateUrl: '../form-post.component.html',
  styleUrls: [
    '../../assets/form.component.scss',
    '../../assets/admin.component.scss',
    '../form-post.component.scss',
  ],
})
export class CriarPostComponent implements OnInit {
  /* Para upload */
  url = `${environment.API}files/`;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  mainImg = '';
  inputUpload: any;
  imgPreview: any;

  postForm!: Post & FormGroup;

  public isActive: boolean = false;

  iconeImagem!: SafeHtml;
  iconeExcluir!: SafeHtml;
  iconeUpload!: SafeHtml;

  public urlCaminho: any = '';
  public tituloPost: any = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private gqlService: GraphQlService,
    private uploadService: UploadService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.iconeImagem = this.sanitizer.bypassSecurityTrustHtml(icones.iconeImagem);
    this.iconeExcluir = this.sanitizer.bypassSecurityTrustHtml(icones.iconeExcluir);
    this.iconeUpload = this.sanitizer.bypassSecurityTrustHtml(icones.iconeUpload);

    this.urlCaminho = this.route.snapshot.routeConfig?.path;

    this.postForm = this.formBuilder.group({
      status: 'rascunho',
      titulo: ['', [Validators.required, Validators.minLength(4)]],
      descricao: [''],
      conteudo: [''],
      imagemPrincipal: [''],
      categoria: [[]],
      tags: [[]],
    });
  }

  get getControl() {
    return this.postForm.controls;
  }

  async onSubmit() {
    if (this.postForm.value.categoria) {
      this.postForm.value.categoria = this.separa(this.postForm.value.categoria + '');
    }
    if (this.postForm.value.tags) {
      this.postForm.value.tags = this.separa(this.postForm.value.tags + '');
    }

    this.postForm.value.imagemPrincipal = this.mainImg;

    await this.gqlService
      .criarPost(this.postForm.value)
      .then((res: any) => {
        if (res.data) {
          console.log('Sucesso', res?.data);
          window.alert(`Post criado!!\nID: ${res?.data.createPost.postId}`);
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

  voltar() {
    this.router.navigate(['../']);
  }

  separa(data: any) {
    return data.split(/\n+|\r+|,\s?/g).filter(Boolean);
  }

  async textareaResized(event: any) {
    console.log(event);
    event.style.height = '1px';
    event.style.height = 12 + event.scrollHeight + 'px';
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.inputUpload = event;

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
            this.inputUpload.target.value = null;
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
          this.imgPreview = null;
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
}
