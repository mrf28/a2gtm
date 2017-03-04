import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'where', pure: false })
export class Where implements PipeTransform {
  tmp = [];
  static _whereComparer(a: any, b: any): boolean {
    if (a && b) {
      for (let p in b) {
        if (a[p] != b[p])
          return false;
      }
      return true;
    }
    return false;
  }

  transform(input: any, args: any): any {
    this.tmp.length = 0;
    // let [clauses] = args; // Unexpectedly undefined
    // console.log(clauses);
    if (input){
      this.tmp.push(...input.filter(item => Where._whereComparer(item, args)));
    }
    return this.tmp; 
  }
}