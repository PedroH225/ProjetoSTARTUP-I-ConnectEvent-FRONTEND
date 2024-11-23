import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-destaque',
  templateUrl: './carousel-destaque.component.html',
  styleUrl: './carousel-destaque.component.scss',
})
export class CarouselDestaqueComponent {
  @Input() fotos: any[] = [];
  imagemUrls: string[] = [];

  ngOnInit(): void {
    this.fotos.forEach((foto: any) => {
      this.imagemUrls.push(`http://localhost:3000/uploads/${foto.foto}`);
    });
  }
}
