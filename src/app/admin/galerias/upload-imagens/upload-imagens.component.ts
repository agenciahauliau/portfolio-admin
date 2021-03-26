import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faTrashAlt, faEye, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faHome, faSyncAlt, faImage } from '@fortawesome/free-solid-svg-icons';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription, Observable } from 'rxjs';
import { GQL_LISTA_ARQUIVOS } from 'src/app/graphql/graphql';
import { GraphQlService } from 'src/app/services/graphql.service';
import { TokenService } from 'src/app/services/token.service';
import { UploadService } from 'src/app/services/upload.service';
HttpClient;
@Component({
  selector: 'app-upload-imagens',
  templateUrl: './upload-imagens.component.html',
  styleUrls: ['./upload-imagens.component.scss', '../../admin.component.scss'],
})
export class UploadImagensComponent implements OnInit, OnDestroy {
  url = 'https://admin.portfolio.imb.br/v1/files/';
  midias!: [string];
  midiasQuery!: QueryRef<any>;
  loading = true;
  error: any;

  faEye = faEye;
  faTrashAlt = faTrashAlt;
  faPlusSquare = faPlusSquare;
  faHome = faHome;
  faSyncAlt = faSyncAlt;
  faImage = faImage;

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  private querySubs = new Subscription();

  constructor(
    private apollo: Apollo,
    private router: Router,
    private uploadService: UploadService,
  ) {}

  ngOnInit(): void {
    this.querySubs = this.apollo
      .watchQuery<any>({
        query: GQL_LISTA_ARQUIVOS,
        fetchPolicy: 'no-cache',
        pollInterval: 2000,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.midias = data.listarUploads;
      });
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Arquivo enviado com sucesso ' + file.name;
            this.message.push(msg);
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

  ngOnDestroy() {
    this.querySubs.unsubscribe();
  }

  /* ngAfterViewInit() {
    (document.querySelector('.app-alerts') as HTMLElement).style.top = '150px';
  }*/

  voltar() {
    this.router.navigate(['/admin/upload']);
  }
}
