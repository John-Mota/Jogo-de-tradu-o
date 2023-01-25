import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { Phrases } from '../shared/phrases.model';
import { FRASES } from './phrases.mock';
import { ProgressoComponent } from '../progresso/progresso.component';


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public frases = FRASES
  public instrucao: string = 'Traduza a frase: '
  public resposta: string=""
  public progresso: number = 0 
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter()

  rodadas: number = 0
  rodadaPhrase!: Phrases;
  tentativas: number = 3


  constructor() {
    this.atualizaRodada() 
  }
  


  ngOnInit() {
  }

  ngOnDestroy() {
    
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
  }

  public verificarResposta(): void {

    
    if(this.resposta == this.frases[this.rodadas].phrasesPtbr) {
      

      //troca apergunta da rodada
      this.rodadas++
     

      //barra de progresso
      this.progresso = this.progresso + 25

      //Verificar se acertou todas as traduções
      if(this.rodadas === 4) {
        this.encerrarJogo.emit('VITÓRIA')
      }

      this.atualizaRodada()
      
    } else {
      this.tentativas--

      if(this.tentativas === -1) {
        this.encerrarJogo.emit('derrota')
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
