import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {
  usuarios:any[]=[]
  turnos:any[]=[]
  usuariosMostrar:any[]=[]
  constructor(private firestore: Firestore, private auth: UserService){
    
  }


  ngOnInit(): void {
    collectionData(collection(this.firestore,"usuarios")).subscribe(data =>{
      this.usuarios=data.filter(u => u['tipo']=="user");
      collectionData(collection(this.firestore,"turnos")).subscribe(data =>{
        this.turnos=data.filter(u => u['doctor']==this.auth.userUsed['correo'] && u['estado']=="finalizado");
        const correos= this.turnos.map(x => x['paciente'])
        // this.usuariosMostrar= this.turnos.filter(user => correos.includes(user['paciente']))
        this.usuariosMostrar= this.usuarios.filter(user => correos.includes(user['correo']))
        console.log(this.usuariosMostrar)

      })
    })
   
  }
  getTurnos(idUsuario: any): any[] {
    return this.turnos.filter(turno => turno.paciente === idUsuario);
  }

  verificarExtra(turno:any){
    return turno['historial'] != undefined
  }
}
