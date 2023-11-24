import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hora'
})
export class HoraPipe implements PipeTransform {
  transform(hora24: string): string {
    const fecha = new Date(`2000-01-01T${hora24}`);

    let horas = fecha.getHours() % 12;
    horas = horas === 0 ? 12 : horas;
    const minutos = fecha.getMinutes();

    const periodo = fecha.getHours() < 12 ? 'AM' : 'PM';

    const hora12 = `${horas}:${minutos < 10 ? '0' : ''}${minutos} ${periodo}`;

    return hora12;
  }
}
