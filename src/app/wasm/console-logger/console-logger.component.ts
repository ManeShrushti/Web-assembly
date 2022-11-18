import { Component, NgZone } from "@angular/core";
import { EmscriptenWasmComponent } from "../emscripten-wasm.component";

@Component({
  templateUrl: "./console-logger.component.html",
  styleUrls: ["./console-logger.component.css"],
})
export class WasmConsoleLoggerComponent extends EmscriptenWasmComponent {
  error: string;
  logItems: string[] = [];
  result: any;
  newGame: any;
  count = 0;
  player = 0;
  arr = [];
  isStarted = false;
  constructor(private ngZone: NgZone) {
    super("ConsoleLoggerModule", "console-logger.js");
    this.moduleDecorator = (mod) => {
      mod.printErr = (what: string) => {
        this.ngZone.run(() => (this.error = what));
      };
    };
  }
  ngOnInit() {
    //this.reset();
  }

  reset() {
    this.newGame = this.module.ccall("initiate", "number", [], []);
    this.arr = [];
    this.count = 0;
    this.isStarted = true;
  }

  move(pos) {
    this.result = this.module.ccall("move", "number", ["number", "number"], [pos, this.count % 2]);
    if (this.result !== -1) {
      this.arr[pos] = (this.count + 1) % 2;
      if (this.result === 1) {
        setTimeout(() => {
          window.alert(`Player ${(this.count % 2) + 1} wins. Reset to play again.`);
        }, 500);
        return;
      }
      this.count += 1;
      if (this.count === 9) {
        setTimeout(() => {
          window.alert(`Lets call it a draw.Reset to play again.`);
        }, 500);
      }
    } else {
      window.alert(`Invalid Move`);
    }
  }
}
