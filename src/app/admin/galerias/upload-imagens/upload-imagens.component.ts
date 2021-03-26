import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { faTrashAlt, faEye, faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faHome, faSyncAlt, faImage } from '@fortawesome/free-solid-svg-icons';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GQL_EXIBE_MIDIAS, GQL_LISTA_ARQUIVOS } from 'src/app/graphql/graphql';
import { GraphQlService } from 'src/app/services/graphql.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';
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

  private querySubs = new Subscription();

  constructor(
    private accountService: GraphQlService,
    private http: HttpClient,
    private apollo: Apollo,
    private tokenService: TokenService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.querySubs = this.apollo
      .watchQuery<any>({
        query: GQL_LISTA_ARQUIVOS,
        fetchPolicy: 'no-cache',
      })
      .valueChanges.subscribe(({ data, loading }) => {
        this.loading = loading;
        this.midias = data.listarUploads;
      });
  }

  ngOnDestroy() {
    this.querySubs.unsubscribe();
  }

  ngAfterViewInit() {
    (document.querySelector('.app-alerts') as HTMLElement).style.top = '150px';
  }

  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;
  files: any = [];

  async uploadFile(file: any) {
    console.log('fiile', file);
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    const result = await this.accountService.uploadArquivo(file);
  }

  private async uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(async (file: any) => {
      console.log('uploadsfiles', file);
      await this.uploadFile(file);
    });
  }

  async onClick(): Promise<any> {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = async () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0 });
      }
      console.log(this.files);
      await this.uploadFiles();
    };
    fileUpload.click();
  }

  async upload($event: any) {
    let file = $event.target.files[0];
    let fd = new FormData();
    fd.append('files', file, file.name);
    return this.http
      .post('http://localhost:8080/v1/files/upload', fd, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe(
        (data: any) => {
          console.log('Imagem sucesso', data.body);
          return data;
        },
        (error) => {
          console.log('erro', error.error.message);
        },
      );
  }

  voltar() {
    this.router.navigate(['/admin/upload']);
  }
}
