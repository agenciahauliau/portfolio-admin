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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { icones } from 'src/assets/icones';

HttpClient;
@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss', '../assets/admin.component.scss'],
})
export class BibliotecaComponent implements OnInit, OnDestroy {
  url = `${environment.API}files/`;
  midias!: [string];
  midiasQuery!: QueryRef<any>;
  loading = true;
  error: any;

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  nomes: string[] = [];
  alright: boolean = true;

  p: number = 1;

  private querySubs = new Subscription();

  iconeUpload!: SafeHtml;
  iconeLink!: SafeHtml;
  iconeExcluir!: SafeHtml;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private uploadService: UploadService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    this.iconeUpload = this.sanitizer.bypassSecurityTrustHtml(icones.iconeUpload);
    this.iconeLink = this.sanitizer.bypassSecurityTrustHtml(icones.iconeLink);
    this.iconeExcluir = this.sanitizer.bypassSecurityTrustHtml(icones.iconeExcluir);

    this.midiasQuery = this.apollo.watchQuery<any>({
      query: GQL_LISTAR_ARQUIVOS,
    });

    this.querySubs = this.midiasQuery.valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.midias = data.listarUploads;
    });
  }

  selectFiles(event: any): void {
    this.nomes = [];
    this.message = [];
    this.progressInfos = [];
    this.alright = true;
    this.selectedFiles = event.target.files;
    this.nameFile();
  }

  nameFile(): void {
    this.nomes = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.nomes.push(this.selectedFiles[i].name);
      }
    }
  }

  uploadFiles(): void {
    this.message = [];
    this.alright = true;
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }

    console.log(this.message)

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
            this.alright = true
            this.refresh();
            setTimeout(() => {
              console.log(this.nomes[idx]);
              this.progressInfos.splice(idx, 1);
              this.message.splice(idx, 1);
            }, 5000);
          }
        },
        (error: any) => {
          this.progressInfos[idx].value = 0;
          const msg = `Não foi possível subir o arquivo: ${file.name}\n Possivel Causa: ${error}`;
          this.message.push(msg);
          this.alright = false
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

  copiar(event: any) {
    let link = event.target.parentElement.dataset.url;
    var text = document.createElement('input')
    document.body.appendChild(text);
    text.value = link;
    text.select();
    document.execCommand('copy');
    document.body.removeChild(text);
  }
}
