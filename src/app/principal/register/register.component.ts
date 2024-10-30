import { Component } from '@angular/core';
import { CidadesService } from '../../../services/cidades.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
    selectedOption: string = 'usuario';
    selectedCidade : string = "";
    cidades: any[] = []
    nome : string = ''
    email : string = ''
    senha : string = ''
    confirmacao : string = ''
    genero : string = '';
    estado : string = '';
    idade !: number;
  
    constructor( private cidadesService : CidadesService, 
    ) {}

    ngOnInit(): void {
      this.getCidades();
    }

    onSubmit() {
      console.log("aaaa" + this.nome, this.email, this.senha, this.confirmacao, this.genero, this.estado, this.idade);
      
    }
    
  getCidades(): void {
    this.cidadesService.getCidades().subscribe(
      (response) => {
        this.cidades = response;
      },
      (error) => {
        console.error('Erro ao buscar eventos:', error);
      }
    );
  }

}
