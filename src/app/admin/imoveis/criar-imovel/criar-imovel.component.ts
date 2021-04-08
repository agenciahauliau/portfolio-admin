import { Component, OnInit } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { faHome, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GraphQlService } from '../../../services/graphql.service';
import { Imovel } from '../../../helpers/types';
import { environment } from '../../../../environments/environment';
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-criar-imovel',
  templateUrl: './criar-imovel.component.html',
  styleUrls: ['./criar-imovel.component.scss', '../../admin.component.scss'],
})
export class CriarImovelComponent implements OnInit {
  //Para upload
  url = `${environment.API}files/`;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  mainImg = '';
  imgPreview: any;

  // Para Upload de Planta
  selectedPlantaFiles?: FileList;
  progressInfosPlantaFiles: any[] = [];
  messagePlantaFiles: string[] = [];
  plantaFiles = [''];

  // Filtros e mascaras
  prefixReal = 'R$';
  sufixoM2 = ' m²';
  maskCep = '00000-000';
  maskM2 = '000.00';

  // Para Upload Imagens Adicionais
  selectedFilesImgsAdicionais?: FileList;
  progressInfosImgsAdicionais: any[] = [];
  messageImgAdicionais: string[] = [];
  plusImgs = [''];

  faPlusSquare = faPlusSquare;
  faHome = faHome;
  faTrash = faTrash;

  imovelForm!: Imovel & FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private gqlService: GraphQlService,
    private uploadService: UploadService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.imovelForm = this.formBuilder.group({
      nomeImovel: ['', [Validators.required, Validators.minLength(4)]],
      imagemPrincipal: [''],
      categoriaImovel: ['', [Validators.required]],
      jardins: [false],
      descricaoImovel: ['', [Validators.required]],
      tipoNegociacao: ['', [Validators.required]],
      statusImovel: ['', [Validators.required]],
      aceitaPermuta: [false],
      mobiliado: [false],
      valorImovel: ['', [Validators.required, Validators.min(0)]],
      valorEntrada: ['', Validators.min(0)],
      valorParcela: ['', Validators.min(0)],
      valorIPTU: ['', [Validators.required, Validators.min(0)]],
      valorCondominio: ['', Validators.min(0)],
      areaTotal: ['', [Validators.required, Validators.min(0)]],
      areaConstruida: ['', Validators.min(0)],
      andarImovel: ['', Validators.min(0)],
      qtdeQuarto: ['', Validators.min(0)],
      qtdeBanheiro: ['', Validators.min(0)],
      qtdeSuites: ['', Validators.min(0)],
      qtdeVagas: ['', Validators.min(0)],
      nomeConstrutora: ['', Validators.required],
      cep: ['', [Validators.required, Validators.min(0o1001000), Validators.max(99999999)]],
      logradouro: ['', Validators.required],
      numeroLogradouro: [''],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      imagensAdicionais: [[]],
      comodidadesImovel: [[]],
      comodidadesCondominio: [[]],
      statusLancamento: 'pendente',
      previsaoLancamento: 0,
      imgPlantaCondominio: [],
    });
  }

  get getControl() {
    return this.imovelForm.controls;
  }

  async onSubmit() {
    /* Tratamento de dados das comodidades de imóvel e de condomínio */
    if (this.imovelForm.value.comodidadesImovel) {
      this.imovelForm.value.comodidadesImovel = this.separa(
        this.imovelForm.value.comodidadesImovel + '',
      );
    }
    if (this.imovelForm.value.comodidadesCondominio) {
      this.imovelForm.value.comodidadesCondominio = this.separa(
        this.imovelForm.value.comodidadesCondominio + '',
      );
    }

    /* Checagem de números */
    if (!this.imovelForm.value.valorImovel) this.imovelForm.value.valorImovel = 0;
    if (!this.imovelForm.value.valorEntrada) this.imovelForm.value.valorEntrada = 0;
    if (!this.imovelForm.value.valorParcela) this.imovelForm.value.valorParcela = 0;
    if (!this.imovelForm.value.valorIPTU) this.imovelForm.value.valorIPTU = 0;
    if (!this.imovelForm.value.valorCondominio) this.imovelForm.value.valorCondominio = 0;
    if (!this.imovelForm.value.areaTotal) this.imovelForm.value.areaTotal = 0;
    if (!this.imovelForm.value.areaConstruida) this.imovelForm.value.areaConstruida = 0;
    if (!this.imovelForm.value.andarImovel) this.imovelForm.value.andarImovel = 0;
    if (!this.imovelForm.value.qtdeQuarto) this.imovelForm.value.qtdeQuarto = 0;
    if (!this.imovelForm.value.qtdeBanheiro) this.imovelForm.value.qtdeBanheiro = 0;
    if (!this.imovelForm.value.qtdeSuites) this.imovelForm.value.qtdeSuites = 0;
    if (!this.imovelForm.value.qtdeVagas) this.imovelForm.value.qtdeVagas = 0;

    /* Recebe as imagens */
    this.imovelForm.value.imagemPrincipal = this.mainImg;
    this.imovelForm.value.imagensAdicionais = this.plusImgs;
    this.imovelForm.value.imgPlantaCondominio = this.plantaFiles;
    this.imovelForm.value.previsaoLancamento = Date.parse(this.imovelForm.value.previsaoLancamento);

    await this.gqlService
      .criarImovel(this.imovelForm.value)
      .then((res: any) => {
        if (res.data) {
          console.log('Sucesso', res?.data);
          window.alert('Imóvel criado');
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

  separa(data: any) {
    return data.split(/\n+|\r+|,\s?/g).filter(Boolean);
  }

  limpaArrayImgs() {
    this.mainImg = '';
    this.plantaFiles = [''];
    this.plusImgs = [''];
    this.progressInfos = [];
    this.progressInfosPlantaFiles = [];
    this.progressInfosImgsAdicionais = [];
  }

  voltar() {
    this.router.navigate(['admin/imoveis']);
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

  /* Imagens adicionais */
  selectFilesImagensAdicionais(event: any): void {
    this.messageImgAdicionais = [];
    this.progressInfosImgsAdicionais = [];
    this.selectedFilesImgsAdicionais = event.target.files;
  }

  uploadFilesImagensAdicionais(): void {
    this.message = [];
    if (this.selectedFilesImgsAdicionais) {
      for (let i = 0; i < this.selectedFilesImgsAdicionais.length; i++) {
        this.uploadImagensAdicionais(i, this.selectedFilesImgsAdicionais[i]);
      }
    }
  }

  uploadImagensAdicionais(idx: number, file: File): void {
    this.progressInfosImgsAdicionais[idx] = { value: 0, fileName: file.name, url: '' };
    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfosImgsAdicionais[idx].value = Math.round(
              (100 * event.loaded) / event.total,
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Arquivo enviado com sucesso ' + file.name;
            this.messageImgAdicionais.push(msg);
            this.progressInfosImgsAdicionais[idx].url = this.url + event.body[0];
            this.plusImgs.push(this.url + event.body[0]);
            this.plusImgs = this.plusImgs.filter((x) => x.trim() != '');
          }
        },
        (error: any) => {
          this.progressInfosImgsAdicionais[idx].value = 0;
          const msg = `Não foi possível subir o arquivo: ${file.name}\n Possivel Causa: ${error}`;
          this.messageImgAdicionais.push(msg);
        },
      );
    }
  }

  deletaImagensAdicionais(imgUrl: string): void {
    this.uploadService
      .deletaArquivo(imgUrl)
      .then((res: any) => {
        if (res.data) {
          console.log('Sucesso', res?.data);
          this.removeLinkDoArray(this.plusImgs, imgUrl);
          this.removeLinkDoArray(this.progressInfosImgsAdicionais, imgUrl);
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

  /* Planta imagens */
  selectFilesPlantaFiles(event: any): void {
    this.messagePlantaFiles = [];
    this.progressInfosPlantaFiles = [];
    this.selectedPlantaFiles = event.target.files;
  }

  uploadFilesPlantaFiles(): void {
    this.message = [];
    if (this.selectedPlantaFiles) {
      for (let i = 0; i < this.selectedPlantaFiles.length; i++) {
        this.uploadImgPlantas(i, this.selectedPlantaFiles[i]);
      }
    }
  }

  uploadImgPlantas(idx: number, file: File): void {
    this.progressInfosPlantaFiles[idx] = { value: 0, fileName: file.name, url: '' };
    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfosPlantaFiles[idx].value = Math.round(
              (100 * event.loaded) / event.total,
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Arquivo enviado com sucesso ' + file.name;
            this.messagePlantaFiles.push(msg);
            this.progressInfosPlantaFiles[idx].url = this.url + event.body[0];
            this.plantaFiles.push(this.url + event.body[0]);
            this.plantaFiles = this.plantaFiles.filter((x) => x.trim() != '');
          }
        },
        (error: any) => {
          this.progressInfosPlantaFiles[idx].value = 0;
          const msg = `Não foi possível subir o arquivo: ${file.name}\n Possivel Causa: ${error}`;
          this.messagePlantaFiles.push(msg);
        },
      );
    }
  }

  deletaImagensPlantas(imgUrl: string): void {
    this.uploadService
      .deletaArquivo(imgUrl)
      .then((res: any) => {
        if (res.data) {
          console.log('Sucesso', res?.data);
          this.removeLinkDoArray(this.plantaFiles, imgUrl);
          this.removeLinkDoArray(this.progressInfosPlantaFiles, imgUrl);
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

  removeLinkDoArray(array: any, url: string) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === url) {
        array.splice(i, 1);
        i--;
      }
      if (array[i]?.url === url) {
        array.splice(i, 1);
        i--;
      }
    }
  }
}
