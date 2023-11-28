import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {
  
  constructor() { }


  async crearPdf(data:any[]){
    const keys=['fecha','horario','paciente','doctor','especialidad','altura','peso','presion','temperatura','clave','cantidad']
    const array=[]
     data.forEach(key => {array.push(key)})
    array.forEach(key => {key.fecha= this.parsearFecha(key.fecha);});
    const pdfD:any={
      content: [
        {
          text: 'Informe clinico de esta increible aplicacion ',
          style: 'header',
          alignment: 'center'
        },
        {
          image: await this.getBase64ImageFromURL('../../assets/inyeccion.png'),
          alignment: 'center'
        },
        {
          text: 'Fecha: '+ this.parsearFecha(new Date().toString()),
          style: 'subheader'
        },
        {text: 'Informe:'},
        
          this.table(array,keys)
        
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        }}
    }
    const pdf = pdfMake.createPdf(pdfD );

    pdf.download()  
  }

  getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
  
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
  
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
  
        var dataURL = canvas.toDataURL("image/png");
  
        resolve(dataURL);
      };
  
      img.onerror = error => {
        reject(error);
      };
  
      img.src = url;
    });
  }

  buildTableBody(data: any, columns: any) {
    var body = [];

    body.push(columns);

    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push(row[column].toString());
        })

        body.push(dataRow);
    });

    return body;
}

table(data: any, columns: any) {
  return {
      table: {
        widths:[40,40,40,40,40,40,40,40,40,40,40],
          headerRows: 1,
          body: this.buildTableBody(data, columns)
      }
  }}

  parsearFecha(fechaString: string): string {
    const fecha = new Date(fechaString);
    
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
  
    const diaString = dia < 10 ? `0${dia}` : `${dia}`;
    const mesString = mes < 10 ? `0${mes}` : `${mes}`;
  
    return `${diaString}/${mesString}/${anio}`;
  }
}
