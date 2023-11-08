import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-vista-especialista',
  templateUrl: './vista-especialista.component.html',
  styleUrls: ['./vista-especialista.component.scss'],
})
export class VistaEspecialistaComponent implements OnInit {
  selectedValue=""
  especialidades:any[] = [];
  fechaInicio:any;
  fechaFinal:any;
  horarios=["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00","21:00", "22:00"]
  horarioInicial:string ="";
  horarioFinal:string ="";
  duracion:string ="";

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  range = this._formBuilder.group({
    start: ['', Validators.required],
    end: ['', Validators.required],
    horarioInicial: [this.horarioInicial, Validators.required],
    horarioFinal: [this.horarioFinal, Validators.required],
    duracion: [this.duracion, Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private firestore: Firestore) {}

  mostrar(){
    console.log(this.range.value)
  }

  ngOnInit(): void {
    const ref= collection(this.firestore, "especialidades")
    collectionData(ref).subscribe(data => {
        this.especialidades=[]
        data.forEach(x => {this.especialidades.push(x)} )
    })
  }
}
