import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {
  images: File[] = []; // Inicializa como um array de File

  @Output() imagesChanged = new EventEmitter<File[]>(); // Define o tipo como File[]

  addImage(event: any) {
    const files: FileList = event.target.files; // Obtém todos os arquivos selecionados
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.images.push(file); // Adiciona o arquivo diretamente
      }
      this.imagesChanged.emit(this.images); // Emitir imagens alteradas
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.imagesChanged.emit(this.images); // Emitir imagens alteradas
  }
}