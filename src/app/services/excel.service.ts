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
    let nuevoArray = data.map(({ ['pass']: _, ...restoDelObjeto }) => restoDelObjeto);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(nuevoArray);
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet},SheetNames: ['data']};
    const excelBuffer:any = XLSX.write(workbook,{bookType:'xlsx',type:'array'})
    this.saveAsExcel(excelBuffer,filename);
  }

  private saveAsExcel(buffer:any, path: string){
    const data: Blob = new Blob([buffer],{type:EXCEL_TYPE})
    FileSaver.saveAs(data,path + '_export_' + new Date().getTime()+EXCEL_EXT)
  }
}
