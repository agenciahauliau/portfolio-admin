import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: any, length: number, max: number, symbol: string) {
    let texto = value;
    if (texto.length <= max) {
      return texto;
    } else {
      return value.split(' ').slice(0, length).join(' ') + symbol;
    }
  }
}
