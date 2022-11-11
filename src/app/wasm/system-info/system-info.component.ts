import { Component, NgZone } from "@angular/core";
import { EmscriptenWasmComponent } from "../emscripten-wasm.component";

@Component({
  templateUrl: "./system-info.component.html",
  styleUrls: ["./system-info.component.css"],
})
export class WasmSystemInfoComponent extends EmscriptenWasmComponent {
  output: string;
  current = "X";
  disableBoard = false;
  currentBoardValues = [];
  BoardValues = { 0: [], 1: [], 2: [] };
  movesPendingLabel = "Moves still pending!";
  emptyBlock = "";
  noWinnerLabel = "Oops! Looks like no one won :(";
  result: any;

  constructor(ngZone: NgZone) {
    super("SystemInfoModule", "system-info.js");

    this.output = "";

    var BoardValues = this.BoardValues;
    var movesPendingLabel = this.movesPendingLabel;
    var emptyBlock = this.emptyBlock;
    var noWinnerLabel = this.noWinnerLabel;

    this.moduleDecorator = (mod) => {
      mod.print = (what: string) => {
        ngZone.run(() => {
          this.output += "\n" + what;
        });
      };
    };
  }

  // getSystemInfo() {
  //   console.log("system");
  //   this.output = "";
  //   this.module.ccall(
  //     "system_info",
  //     "void",
  //     ["string", "string", "string", "string"],
  //     ["/src/app/wasm/system-info/system-info.font.txt"]
  //   );
  // }

  makeMove(event) {
    if (!this.disableBoard) {
      event.target.innerHTML = this.current;
      this.current = this.current === "O" ? "X" : "O";
      this.currentBoardValues = Array.from(document.getElementsByClassName("block")).map((item) => {
        return item.innerHTML;
      });
      this.BoardValues = {
        0: this.currentBoardValues.slice(0, 3),
        1: this.currentBoardValues.slice(3, 6),
        2: this.currentBoardValues.slice(6, 9),
      };
      this.result = this.module.ccall("tic_tac_toe");
      if (this.result == "X" || this.result == "O") {
        this.disableBoard = true;
        document.getElementById("game-status").innerHTML = `${this.result} Won!!!!`;
      } else {
        document.getElementById("game-status").innerHTML = this.result;
      }
    }
  }
  resetGame() {
    this.disableBoard = false;
    location.reload();
  }
}
