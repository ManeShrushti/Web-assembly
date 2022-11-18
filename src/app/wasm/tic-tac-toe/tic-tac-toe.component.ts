import { Component, NgZone } from "@angular/core";
import { EmscriptenWasmComponent } from "../emscripten-wasm.component";
import { PlayerValues } from "./constants";

@Component({
  templateUrl: "./tic-tac-toe.component.html",
  styleUrls: ["./tic-tac-toe.component.css"],
})
export class WasmTicTacToeComponent extends EmscriptenWasmComponent {
  error: string;
  logItems: string[] = [];
  result: any;
  newGame: any;
  count = 0;
  player = 0;
  arr = [];
  isStarted = false;
  showResult = false;
  resultMessage = null;
  blocksValues = [];
  blocks = Array.from({length:9},(v,k)=>k);
  blockMatrix = [];
  constructor(private ngZone: NgZone) {
    super("TicTacToeModule", "tic-tac-toe.js");
    this.moduleDecorator = (mod) => {
      mod.printErr = (what: string) => {
        this.ngZone.run(() => (this.error = what));
      };
    };
  }
  ngOnInit() {
  }

  setBoard(){
    let blockDiv = [];
    this.blockMatrix = [];
    //creating a 3x3 matix for divs
    for(let i=0; i< this.blocksValues.length; i++){
      if(i%3 === 2){
        blockDiv.push(this.blocksValues[i]);
        this.blockMatrix.push(blockDiv);
        blockDiv = [];
      }
      else{
        blockDiv.push(this.blocksValues[i]);
      }
    }
  }

  reset() {
    this.showResult = false;
    this.resultMessage = null;
    this.newGame = this.module.ccall("initiate", "number", [], []);
    this.blocksValues  = this.blocks.map((bl)=>({id: bl, disabled: false, value: null}));
    this.setBoard();
    this.count = 0;
    this.isStarted = true;
  }

  move(pos,blockIdx) {
    this.showResult = false;
    this.result = this.module.ccall("move", "number", ["number", "number"], [pos, this.count % 2]);
    if (this.result !== -1) {
      let currentBlock = this.blocksValues.findIndex((bl)=> bl.id === pos);
      this.blocksValues[currentBlock].value = PlayerValues[(this.count + 1) % 2];
      this.blocksValues[currentBlock].disabled = true;
      this.blockMatrix[blockIdx][currentBlock%3] =Object.assign({},this.blocksValues[currentBlock]);
      if (this.result === 1) {
          this.showResult = true;
          this.resultMessage = `Player ${(this.count % 2) + 1} wins. Reset to play again.`;
          setTimeout(()=>{
            this.showResult = false;
            this.resultMessage = null;
          },5000)
        return;
      }
      this.count += 1;
      if (this.count === 9) {
          this.showResult = true;
          this.resultMessage = `It's a DRAW. Reset to play again.`;
          setTimeout(()=>{
            this.showResult = false;
            this.resultMessage = null;
          },5000)
      }
    } else {
      this.showResult = true;
      this.resultMessage = `Invalid Move`;
      setTimeout(()=>{
        this.showResult = false;
        this.resultMessage = null;
      },5000)
    }
  }
}
