import { Component, OnInit } from '@angular/core';
import { Phrases } from '../shared/phrases.model';
import { FRASES } from './phrases.mock';
import { ProgressoComponent } from '../progresso/progresso.component';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent {

  public frases = FRASES
  public instrucao: string = 'Traduza a frase: '
  public resposta: string=""
  public progresso: number = 0 

  rodadas: number = 0
  rodadaPhrase!: Phrases;
  tentativas: number = 3


  constructor() {
    this.atualizaRodada() 
  }


  ngOnInit() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void {

    
    if(this.resposta == this.frases[this.rodadas].phrasesPtbr) {
      alert(`Correto`)

      //troca apergunta da rodada
      this.rodadas++
     

      //barra de progresso
      this.progresso = this.progresso + 25

      //Verificar se acertou todas as traduções
      if(this.rodadas === 4) {
        alert('Parabéns Você acertou todas')
      }

      this.atualizaRodada()
      
    } else {
      this.tentativas--

      if(this.tentativas === -1) {
        alert('Você perdeu todas as tentativas')
      }
    }
    
    
  }

  public atualizaRodada(): void{
    
    //Define a frase da rodada com alguma lógica
    this.rodadaPhrase = this.frases[this.rodadas]

    //Limpa a area de resposta
    this.resposta = ""
  }

 

}
