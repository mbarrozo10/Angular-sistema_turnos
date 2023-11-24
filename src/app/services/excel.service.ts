import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'
const EXCEL_TYPE= 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8';
const EXCEL_EXT='.xlsx'
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  generateReportWithDict( data: any[], filename: string) {
    // const customHeaders=[{nombre: 'nombre', key:'nombre'},{nombre: 'apellido', key:"apellido"},{nombre: 'correo',key:'correo'},{nombre: 'tipo', key:'tipo'}]
    // let worksheetData: any[] = [];

    // Object(data).forEach( (item: any) => {
    //   let worksheetItem = Object();
    //   customHeaders.forEach( header => {
    //     worksheetItem[header.nombre] = item[header.key];
    //   })
    //   worksheetData.push(worksheetItem)
    // })

    // // excel file
    // let workbook = XLSX.utils.book_new();
    // let worksheet = XLSX.utils.json_to_sheet(worksheetData);
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1")
    // XLSX.writeFileXLSX(workbook, filename, {});
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet},SheetNames: ['data']};
    const excelBuffer:any = XLSX.write(workbook,{bookType:'xlsx',type:'array'})
    this.saveAsExcel(excelBuffer,filename);
  }

  private saveAsExcel(buffer:any, path: string){
    const data: Blob = new Blob([buffer],{type:EXCEL_TYPE})
    FileSaver.saveAs(data,path + '_export_' + new Date().getTime()+EXCEL_EXT)
  }
}
