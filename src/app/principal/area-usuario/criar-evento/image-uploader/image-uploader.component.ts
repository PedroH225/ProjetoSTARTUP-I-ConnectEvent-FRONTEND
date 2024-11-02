import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {
  images: string[] = []; // Inicializa como um array de File
  fotosExistentes: any[] = []; // Adicione esta linha


  @Output() imagesChanged = new EventEmitter<string[]>(); // Define o tipo como File[]

  addImage(event: any) {
    const files: FileList = event.target.files; // Obtém todos os arquivos selecionados
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          this.images.push(e.target!.result as string); // Adiciona a URL da imagem ao array
          this.imagesChanged.emit(this.images); // Emitir imagens alteradas
        };

        reader.readAsDataURL(file); // Lê o arquivo como URL
      }
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.imagesChanged.emit(this.images); // Emitir imagens alteradas
  }

  removerImagemExistente(index: number) {
    this.fotosExistentes.splice(index, 1);
  }

  carregarImagensExistentes(imagens: string[]) {
    this.fotosExistentes = imagens;
    console.log(imagens);
  }
}