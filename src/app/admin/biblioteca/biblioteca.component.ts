import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faTrashAlt, faEye, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faHome, faSyncAlt, faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GQL_LISTAR_ARQUIVOS } from '../../graphql/graphql';
import { UploadService } from '../../services/upload.service';
HttpClient;
@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss', '../../admin/admin.component.scss'],
})
export class BibliotecaComponent implements OnInit, OnDestroy {
  url = `${environment.API}files/`;
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
  faTrash = faTrash;

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
    this.midiasQuery = this.apollo.watchQuery<any>({
      query: GQL_LISTAR_ARQUIVOS,
    });

    this.querySubs = this.midiasQuery.valueChanges.subscribe(({ data, loading }) => {
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
            this.message.push(`Arquivo enviado com sucesso ${file.name}`);
            this.refresh();
            setTimeout(() => {
              this.progressInfos.splice(idx, 1);
              this.message.splice(idx, 1);
            }, 5000);
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

  deletaImagem(imgUrl: string): void {
    this.uploadService
      .deletaArquivo(imgUrl)
      .then((res: any) => {
        if (res.data) {
          console.log('Sucesso', res?.data);
          this.message = [];
          this.progressInfos = [];
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

  ngOnDestroy() {
    this.querySubs.unsubscribe();
  }

  refresh() {
    this.midiasQuery.refetch();
  }

  voltar() {
    this.router.navigate(['/admin/biblioteca']);
  }
}
