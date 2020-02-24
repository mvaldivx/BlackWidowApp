import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  formatText(cad){
    var texto = parseFloat(cad).toFixed(2);
        var numero = texto + ""
        var nuevoNumero = "";
        var resultado = "";
        if (numero[0] == "-") {
          nuevoNumero = numero.replace(/,/g, '').substring(1);
        } else {
            nuevoNumero = numero.replace(/,/g, '');
        }
        if (numero.indexOf(".") >= 0)
            nuevoNumero = nuevoNumero.substring(0, nuevoNumero.indexOf("."));
        
        for (var j:number, i = nuevoNumero.length - 1, j = 0; i >= 0; i-- , j++)
            resultado = nuevoNumero.charAt(i) + ((j > 0) && (j % 3 == 0) ? "," : "") + resultado;
  
        if (numero.indexOf(".") >= 0)
            resultado += numero.substring(numero.indexOf("."));
  
        if (numero[0] == "-") {
            texto = "-" + resultado;
        } else {
            texto = resultado;
        }
        return texto
  }
}
