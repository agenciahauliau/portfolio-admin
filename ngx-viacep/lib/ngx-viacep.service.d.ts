import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco } from './model/endereco';
import * as ɵngcc0 from '@angular/core';
export declare class NgxViacepService {
    private http;
    constructor(http: HttpClient);
    /**
     * Busca o endereço a partir do CEP
     *
     * @param cep
     */
    buscarPorCep(cep: string): Observable<Endereco>;
    /**
     * Faz a busca aproximada
     *
     * @param uf
     * @param municipio
     * @param logradouro
     */
    buscarPorEndereco(uf: string, municipio: string, logradouro: string): Observable<Endereco[]>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgxViacepService, never>;
}

//# sourceMappingURL=ngx-viacep.service.d.ts.map