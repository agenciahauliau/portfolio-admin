import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  faTrashAlt,
  faEye,
  faPlusSquare,
} from '@fortawesome/free-regular-svg-icons';
import { faHome, faSyncAlt, faImage } from '@fortawesome/free-solid-svg-icons';
import { Apollo, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GQL_EXIBE_MIDIAS } from 'src/app/helpers/graphql';
import { TokenService } from 'src/app/helpers/token.service';
import { environment } from 'src/environments/environment';
import { AccountService } from '../../services/account.service';
HttpClient;
@Component({
  selector: 'app-upload-imagens',
  templateUrl: './upload-imagens.component.html',
  styleUrls: ['./upload-imagens.component.scss'],
})
export class UploadImagensComponent implements OnInit, OnDestroy {
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
    private accountService: AccountService,
    private http: HttpClient,
    private apollo: Apollo,
    private tokenService: TokenService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.querySubs = this.apollo
      .watchQuery<any>({
        query: GQL_EXIBE_MIDIAS,
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

  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;
  files: any = [];
  //selectFile!: File;

  /* upload(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {},
        (err) => {},
      );
    });

    reader.readAsDataURL(file);
  } */

  /* async onFileUpload(event: any) {
    this.selectFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    return await this.accountService.upload(this.selecetdFile);
  } */

  async uploadFile(file: any) {
    console.log('fiile', file);
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    const result = await this.accountService.upload(file);
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
  /* };
    const fileUpload = this.fileUpload.nativeElement;
    const formData = new FormData();
    console.log(fileUpload.files);
    formData.append('file', fileUpload.files);
    console.log(formData);
    await this.accountService
      .upload(fileUpload.files)
      .then((res) => console.log(res))
      .catch((err) => console.log(err)); */
  /* fileUpload.onchange = async () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        fileUpload.files[index];
      }
      await this.uploadFiles();
    }; */

  async upload($event: any) {
    let operations = {
      query: `
        mutation upload($file: Upload!) {
          uploadFileRemoto(file: $file)
        }
      `,
      variables: { file: null },
    };

    let _map = {
      file: ['variables.file'],
    };
    let file = $event.target.files[0];
    let fd = new FormData();
    fd.append('operations', JSON.stringify(operations));
    console.log('operations', JSON.stringify(operations));
    fd.append('map', JSON.stringify(_map));
    fd.append('file', file, file.name);
    return this.http
      .post(environment.API, fd, {
        reportProgress: true,
        observe: 'events',
        headers: {
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${this.tokenService.getToken()}`,
          'Accept-Encoding': 'gzip, deflate, br',
          Origin:
            'https://back-portfolio-imb-br-dot-rangell-consultoria-ti.rj.r.appspot.com',
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Connection: 'keep-alive',
        },
      })
      .subscribe(
        (data: any) => {
          console.log(data);
          if (data?.errors) {
            console.log('Erro de upload', data?.errors);
            return data?.errors;
          } else {
            console.log('Imagem sucesso', data);
            setTimeout(() => {
              window.alert('Galeria Criada');
              this.voltar();
            }, 6000);
            return data;
          }
        },
        (error) => {
          console.log('erro', error);
        },
      );
  }

  voltar() {
    this.router.navigate(['/admin/upload']);
  }
}
