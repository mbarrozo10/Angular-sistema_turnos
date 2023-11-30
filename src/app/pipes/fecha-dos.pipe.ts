import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaDos'
})
export class FechaDosPipe implements PipeTransform {

  transform(value: string): string {
    if (!value || value.includes('/')) {
      return value;
    }

    const parsedDate = new Date(value);

    const day = parsedDate.getDate();
    const month = parsedDate.getMonth() + 1; 
    const year = parsedDate.getFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

    return formattedDate;
  }
}
