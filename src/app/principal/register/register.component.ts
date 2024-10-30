import { Component } from '@angular/core';
import { CidadesService } from '../../../services/cidades.service';
import { UsuarioService } from '../../../services/usuario.service';

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
              private usuarioService : UsuarioService,
    ) {}

    ngOnInit(): void {
      this.getCidades();
    }

    onSubmit() {
      const payload = {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        genero: this.genero,
        estado: this.estado,
        idade: this.idade,
      };      

      this.usuarioService.registrarUsuario(payload).subscribe(
        response => {
          console.log('Resposta do servidor:', response);
        },
        error => {
          console.error('Erro ao enviar os dados:', error);
        }
      );

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
