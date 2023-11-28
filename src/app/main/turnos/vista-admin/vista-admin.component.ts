import { Component, ViewChild } from '@angular/core';
import { Firestore, collection, collectionData, doc, getFirestore, onSnapshot, query, updateDoc, where } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { ITurnos } from '../vista-paciente/vista-paciente.component';

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.component.html',
  styleUrls: ['./vista-admin.component.scss']
})
export class VistaAdminComponent {
  pacientes:any[]=[]
  especialistas:any[]= [];
  turnos:any[]= [];
  especialidades:any[]= [];
  horarios=["08:00","08:30", "09:00","09:30", "10:00", "10:30","11:00", "11:30","12:00","12:30" ,"13:00","13:30" ,"14:00", "14:30","15:00","15:30" ,"16:00","16:30", 
  "17:00","17:30" ,"18:00","18:30" ,"19:00","19:30" ,"20:00","20:30","21:00", "21:30","22:00"]
  fechas: any[]=[]
  textoEspecialidad="Especialidad"
  textoEspecialista:any={nombre: "Especialista"}
  textoHorario="Horario"
  textoFecha="Fecha"
  usuario:any
  p:any
  seleccion:any
  dataSource:any=new MatTableDataSource<ITurnos>(this.turnos);
  @ViewChild(MatPaginator) paginator: any;
  displayedColumns: string[] = ['doctor', 'especialidad', 'fecha','horario','estado','tomar'];
  turno:boolean = true;
  constructor(public firestore: Firestore, private auth: UserService){
    this.dataSource.paginator= this.paginator;
  }
  
  ngOnInit(): void {
    for (let i = 0; i < 15; i++) {
      const fecha = new Date();
      fecha.setDate(new Date().getDate() + i);
      fecha.setHours(0)
      fecha.setMinutes(0)
      fecha.setSeconds(0)
      this.fechas.push(fecha);
    }
    collectionData(collection(this.firestore,"usuarios")).subscribe(data =>{
      this.especialistas = data.filter(item => item['tipo']=="especialista")
    });

    collectionData(collection(this.firestore,"usuarios")).subscribe(data =>{
     this.pacientes = data.filter(item => item['tipo']=="user")
    });
    
    collectionData(collection(this.firestore,"especialidades")).subscribe(data =>{
      this.especialidades = data
    });

    collectionData(collection(this.firestore,"turnos")).subscribe(data =>{
      this.turnos = data.filter(item => item['estado']=="libre")
      this.Buscar()
    });
  }

  cambiarValorEspecialista(valor:any){
    this.textoEspecialista=valor
    this.stepper?.next()
  }
  cambiarValorEspecialidad(valor: string){
    this.textoEspecialidad=valor
    if(this.textoEspecialidad!="Especialidad"){
      this.stepper?.next()
    }
  }
  cambiarValorFecha(valor: string){
    this.textoFecha=valor
    this.stepper?.next()
  }
  cambiarValorHorario(valor: string){
    this.textoHorario=valor
    this.stepper?.next()
  }

  VerificarAgregar(elemento:any){
    return elemento['estado']=="libre"
  }

  inscribirseTurno(row:any){
    if(row['estado']=="libre")
    {Swal.fire({
      icon:"warning",
      title:"Estas seguro que queres tomar este turno?",
      showCancelButton:true,
      cancelButtonText:"No",
      confirmButtonText:"Si!",
      heightAuto:false
    }).then((result) => {
      if (result.isConfirmed) {
        let borrables:any []=[]
        const t= collection(this.firestore, 'turnos');
        let q= query(t,where("doctor", "==",row['doctor']),where("fecha", "==",row['fecha']),where("horario","==",row['horario'])); ;
        this.p= onSnapshot(q, (snapshot)=>{
          snapshot.docs.forEach((x) =>{
           borrables.push(x.id);
          })
          console.log(borrables)
          const db= getFirestore();
          const data={
            estado: "a confirmar",
            paciente: this.usuario['correo']
          }
             const docref= doc(db,"turnos",borrables[0]);
             updateDoc(docref,data)
         })
        Swal.fire('Turno a espera de confirmacion!', '', 'success').then(()=>{this.p()})
      } else if (result.dismiss) {
        Swal.fire('Busca otro!', '', 'info')}
      })}
  }


  @ViewChild('stepper') stepper?: MatStepper;
  VerificarSiguiente(){
  
  }

  Buscar(){
    console.log(this.turnos)
    console.log(this.textoEspecialidad,this.textoEspecialista,this.textoHorario,this.textoFecha)
    const array= this.turnos.filter(turno => turno['doctor']==this.textoEspecialista['correo'] &&  turno['fecha']==this.textoFecha 
    &&  turno['horario']==this.textoHorario &&  turno['especialidad']==this.textoEspecialidad)
    console.log(array)
    this.dataSource=new MatTableDataSource<ITurnos>(array)
    this.turno=false
  }

  seleccionar(){
    this.usuario=this.seleccion
  }
}
