import { Component } from '@angular/core';
import { CidadesService } from '../../../services/cidades.service';
import { UsuarioService } from '../../../services/usuario.service';
import { listarErrosUsuario } from '../../utils/listarErros';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  selectedOption: string = 'usuario';
  selectedCidade: string = "";
  cidades: any[] = []
  nome: string = ''
  email: string = ''
  senha: string = ''
  confirmacao: string = ''
  genero: string = '';
  estado: string = '';
  idade !: number;
  sucesso = false;

  constructor(private cidadesService: CidadesService,
    private router: Router,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.getCidades();
  }

  onSubmit() {
    this.idade ? this.idade : null;
    const payload = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      idade: this.idade,
      genero: this.genero,
      estado: this.estado,
      cidade: this.selectedCidade
    };

    if (!this.verificarSenhas()) {
      return; // Sai da função se as senhas não coincidirem
    }

    this.usuarioService.registrarUsuario(payload).subscribe(
      (response) => {
        this.router.navigate(["/principal/login"]).then(() => {  // Redirecionar ao registrar
          alert("Usuário registrado com sucesso!") 
        })
      },
      (error) => {
        // Erro no registro
        let erros: any[] = [];
        erros = error.error // Captura os erros

        listarErrosUsuario(erros)
      }
    );
  }

  getCidades(): void {
    this.cidadesService.getCidades().subscribe(
      (response) => {
        this.cidades = response;
      },
      (error) => {
        console.error('Erro ao buscar cidades:', error);
      }
    );
  }


  verificarSenhas(): boolean {
    if (this.senha !== this.confirmacao) {

      // Criar alerta da verifação de senhas
      const alert = document.createElement("ngb-alert");
      alert.classList.add('alert', 'alert-danger', "p-1", 'mb-0');
  
      const idadeErroDiv = document.getElementById("senhaErro");
      if (idadeErroDiv) {
        alert.textContent = "Senhas não coincidem"; // Define o conteúdo do alerta
        idadeErroDiv.appendChild(alert);
      }
      return false; // Retorna falso se as senhas não coincidem
    }
    return true; // Retorna verdadeiro se as senhas coincidem
  }

}
