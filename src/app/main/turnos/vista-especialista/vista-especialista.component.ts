import { Component, Inject, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerIntl } from '@angular/material/datepicker';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { format, addDays, isBefore, isEqual } from 'date-fns';

@Component({
  selector: 'app-vista-especialista',
  templateUrl: './vista-especialista.component.html',
  styleUrls: ['./vista-especialista.component.scss'],
  
})
export class VistaEspecialistaComponent implements OnInit {
  selectedValue=""
  fechaInicial:any;
  fechaFinal:any;
  horarios=["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00","21:00", "22:00"]
  horariosFinales: any[ ]=[]
  horarioInicial:string ="";
  horarioFinal:string ="";
  duracion:string ="";
  totaldias:string=""
  horas:string="";
  fechaLimite: Date= new Date();
  firstFormGroup = this._formBuilder.group({
    start: ['', Validators.required],
    end: ['', Validators.required],
  });
  range = this._formBuilder.group({
    horarioInicial: [this.horarioInicial, Validators.required],
    horarioFinal: [this.horarioFinal, Validators.required],
    duracion: [this.duracion, Validators.required],
  });
  isLinear = false;
  especialidad: any;

  constructor(private _formBuilder: FormBuilder, private firestore: Firestore, private auth: UserService, private _adapter: DateAdapter<any>,
    private _intl: MatDatepickerIntl,
    @Inject(MAT_DATE_LOCALE) private _locale: string,) {}

  mostrar(){
   this.calcularDias()
   this.fechaInicial= this.firstFormGroup.value.start;
   this.fechaFinal= this.firstFormGroup.value.end;
   
  }

  calcularDias() {
    let dateInicial= new Date()
    let dateFinal= new Date()
    if(this.firstFormGroup.value.start && this.firstFormGroup.value.end){
      dateInicial= new Date(this.firstFormGroup.value.start)
      dateFinal= new Date(this.firstFormGroup.value.end)
    }
    if(dateFinal.getMonth() > dateInicial.getMonth()){
      const differenceInMilliseconds = dateFinal.getTime() - dateInicial.getTime();
      this.totaldias = ((differenceInMilliseconds / (1000 * 60 * 60 * 24))+1).toString();
    }else{
      const differenceInMilliseconds = dateFinal.getTime() - dateInicial.getTime();
      this.totaldias = ((differenceInMilliseconds / (1000 * 60 * 60 * 24))+1).toString();
    }
    
  }

  ngOnInit(): void {
    const ref= collection(this.firestore, "usuarios")
    collectionData(ref).subscribe(data => {
       this._locale= 'fr'
       this._adapter.setLocale(this._locale)
        data.forEach(x => {
          if(x['correo']== this.auth.retornarUsuario()){
            this.especialidad= x['especialidad']
          }
        } )
    })
    const today = new Date();
    this.fechaLimite = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
  }

  calcularHoras(){
    let contado=0
    this.horariosSeleccionados=[]
    for(const x of this.horarios){
      const inicio= this.horarioInicial.split(':')
      const final= this.horarioFinal.split(':')
      const recorrido= x.split(':')
      if (parseInt(recorrido[0]) == parseInt(final[0])){
        break
      }
      if(parseInt(recorrido[0]) >= parseInt(inicio[0]) ){
        contado++
        this.horariosSeleccionados.push(x)
      }
    }
    this.horas = contado.toString()
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    const hoy= new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate() )
    return day <= this.fechaLimite && day >= hoy ;
    
  };

  onSelectionChange(){
    this.horariosFinales=[]
    const horario= this.horarioInicial.split(':')
    this.horarios.forEach(x => {
      const y= x.split(':')
      if(parseInt(y[0]) > parseInt(horario[0])){
        this.horariosFinales.push(x)
      }
    })
  }
  subir(){
    
    let x=0
    switch(this.duracion){
      case "1":
        x=1
        break
      case "0.5":
        x=2
        break;
    }
    const ref=  collection(this.firestore,"turnos")
    this.conseguirDias()
    this.fechasSeleccionadas.forEach(fecha => {
      this.horariosSeleccionados.forEach(horario => {
          for(let i=0 ; i<x ; i++) {
            if(i==1){
              const h= horario.split(":");
              const hf= h[0]+":30"
              const data={
                doctor: this.auth.retornarUsuario(),
                especialidad: this.especialidad,
                horario: hf,
                fecha:fecha,
                estado: "libre",
              }
              console.log(data)
              addDoc(ref,data)
            }else{
              const data={
                doctor: this.auth.retornarUsuario(),
                especialidad: this.especialidad,
                horario: horario,
                fecha:fecha,
                estado: "libre",
              }
              console.log(data)
              addDoc(ref,data)
            }
          }
      })
    })
    console.log(this.fechasSeleccionadas)
  }


  fechasSeleccionadas: Date[] = [];
  horariosSeleccionados: any[] = [];
  conseguirDias(){
    this.fechasSeleccionadas = [];
      let fechaActual = new Date(this.fechaInicial);
      while (isBefore(fechaActual, new Date(this.fechaFinal)) || isEqual(fechaActual,  new Date(this.fechaFinal))) {
        this.fechasSeleccionadas.push(new Date(fechaActual));
        fechaActual = addDays(fechaActual, 1);
      }
  }
}
