import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="footer">
      <p>Portifolio Imóveis {{ ano }}</p>
      <p>feito por <a href="https://hi4u.me">Agênica Haul Iau</a></p>
    </div>
  `,
  styles: [``],
})
export class FooterComponent implements OnInit {
  ano = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {}
}
