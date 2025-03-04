import { Component, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {
  images: File[] = []; // Armazena os arquivos
  imageUrls: string[] = []; // Armazena as URLs das imagens para visualização
  fotosExistentes: any[] = [];

  @Output() imagesChanged = new EventEmitter<File[]>(); // Emissão do tipo File[]
  @Output() removerChanged = new EventEmitter<number>();

  addImage(event: any) {
    const files: FileList = event.target.files; // Obtém todos os arquivos selecionados
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
          this.imageUrls.push(e.target!.result as string); // Armazena a URL para exibição
        };

        reader.readAsDataURL(file); // Lê o arquivo como URL
        this.images.push(file); // Adiciona o arquivo ao array de File
      }
      this.imagesChanged.emit(this.images); // Emitir imagens alteradas
    }
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.imageUrls.splice(index, 1); // Remove a URL correspondente
    this.imagesChanged.emit(this.images); // Emitir imagens alteradas
  }

  removerImagemExistente(index: number, imagemId: number) {
    if (confirm("Deseja excluir uma foto existente?")) {
      this.fotosExistentes.splice(index, 1);
      this.removerChanged.emit(imagemId)
    }
  }

  carregarImagensExistentes(imagens: string[]) {
    this.fotosExistentes = imagens;

  }
}