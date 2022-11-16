import { Component, NgZone } from "@angular/core";
import { EmscriptenWasmComponent } from "../emscripten-wasm.component";

@Component({
  templateUrl: "./console-logger.component.html",
})

export class WasmConsoleLoggerComponent extends EmscriptenWasmComponent {
  error: string;
  logItems: string[] = [];
  result: any;
  constructor(private ngZone: NgZone) {
    super("ConsoleLoggerModule", "console-logger.js");
    this.moduleDecorator = (mod) => {
      mod.printErr = (what: string) => {
        this.ngZone.run(() => (this.error = what));
      };
    };
  }
  ngOnInit(){
  }

  getSquare(){
    this.result = this.module.ccall('int_sqrt', // name of C function
    'number', // return type
    ['number'], // argument types
    [9]);
    console.log(this.result);  
  }
}
