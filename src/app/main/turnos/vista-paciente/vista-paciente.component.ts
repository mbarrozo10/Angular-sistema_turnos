import { Component, OnInit, ViewChild } from '@angular/core';
import { Firestore, collection, collectionData, doc, getFirestore, onSnapshot, query, updateDoc, where } from '@angular/fire/firestore';
import { MatDialog  } from '@angular/material/dialog';
import { MatPaginator  } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-paciente',
  templateUrl: './vista-paciente.component.html',
  styleUrls: ['./vista-paciente.component.scss'],
})
export class VistaPacienteComponent implements OnInit {
  displayedColumns: string[] = ['doctor', 'especialidad', 'estado', 'fecha','horario', 'paciente','comentario','altura','peso','presion','temperatura','clave','cantidad' ,'cancelar','encuesta'];
  turnos:any[]=[]
  dataSource:any=new MatTableDataSource<ITurnos>(this.turnos);
  selected:string=""
  selectedEs:any=""
  especialidades:any[]=[]
  especialistas:any[]=[]
  @ViewChild(MatPaginator) paginator: any;
  fil: string;
  filA: string;
  filPe: string;
  filT: string;
  filP: string;
  filC: string;
  filCant: string;

  constructor(private firestore: Firestore, private auth: UserService, public router:Router){}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    const ref= collection(this.firestore, "turnos")
    collectionData(ref).subscribe(data =>{
      this.turnos=[]
      this.dataSource=null;
      data.forEach(turno => {
          if(this.auth.retornarUsuario()==turno['paciente']  ){
            this.turnos.push(turno)
          }
      })
      console.log(this.turnos)
      this.dataSource=new MatTableDataSource<ITurnos>(this.turnos)
      this.dataSource.paginator = this.paginator;
      if(this.p)this.p()
    })
    collectionData(collection(this.firestore,"especialidades")).subscribe(data =>{
      this.especialidades=[]
      data.forEach(e => { this.especialidades.push(e['nombre'])})
    })
    collectionData(collection(this.firestore,"usuarios")).subscribe(data =>{
      this.especialistas=[]
      data.forEach(e => { 
        if(e['tipo']=="especialista")
        this.especialistas.push(e)})
    })
  }
  p:any


  tomarTurnos(row:any){
    if(this.auth.userUsed['tipo']=="user"){
      this.inscribirseTurno(row)
    }
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
            paciente: this.auth.retornarUsuario()
          }
             const docref= doc(db,"turnos",borrables[0]);
             updateDoc(docref,data)
         })
        Swal.fire('Turno a espera de confirmacion!', '', 'success').then(()=>{this.p()})
      } else if (result.dismiss) {
        Swal.fire('Busca otro!', '', 'info')}
      })}
  }

  nuevoTurno(){
    // this.dialog.open(DialogElementsExampleDialog);
    this.router.navigateByUrl('/main/turnos/nuevo', {replaceUrl: true})
  }

  onSelectionChange(){
    this.selectedEs=""
    this.dataSource=[]
    const array:any=[]
    this.turnos.forEach((turno) =>{
      if(turno.especialidad==this.selected)
      array.push(turno)})
    this.dataSource=new MatTableDataSource<ITurnos>(array)
    this.dataSource.paginator = this.paginator;

  }
  onSelectionChangeEspecialista(){
    this.selected=""
    this.dataSource=[]
    const array:any=[]
    this.turnos.forEach((turno) =>{
      if(turno.doctor==this.selectedEs['correo'])
      array.push(turno)})
    this.dataSource=new MatTableDataSource<ITurnos>(array)
    this.dataSource.paginator = this.paginator;
  }

  Mostrar(elemento:any){
    if(elemento['estado']!="Terminado" && elemento['estado']!="Cancelado"){
      Swal.fire({
        title: "Seguro que quieres cancelar el turno?",
        text: "Ingrese el motivo",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText:"Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: async (test) => {
          try {
            const borrables:any[]=[]
            const t= collection(this.firestore, 'turnos');
            let q= query(t,where("doctor", "==",elemento['doctor']),where("fecha", "==",elemento['fecha']),where("horario","==",elemento['horario']), where("paciente","==",elemento['paciente'])); ;
            this.p= onSnapshot(q, (snapshot)=>{
              snapshot.docs.forEach((x) =>{
               borrables.push(x.id);
              })
              const db= getFirestore();
              const data={
                estado: "Cancelado",
                comentario: test
              }
                 const docref= doc(db,"turnos",borrables[0]);
                 updateDoc(docref,data)
             })
          } catch (error) {
            Swal.showValidationMessage(`
              Request failed: ${error}
            `);
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      })
    }else{
      Swal.fire({
        icon: "error",
        title: "No podes cancelar un turno "+ elemento['estado']+"!",
        heightAuto: false
      })
    }
  }

  Encuesta(elemento:any){
    if(elemento['estado']!="Terminado"){
      Swal.fire({
        title: "Que le parecio la atencion?",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText:"Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: async (test) => {
          try {
            const borrables:any[]=[]
            const t= collection(this.firestore, 'turnos');
            let q= query(t,where("doctor", "==",elemento['doctor']),where("fecha", "==",elemento['fecha']),where("horario","==",elemento['horario']), where("paciente","==",elemento['paciente'])); ;
            this.p= onSnapshot(q, (snapshot)=>{
              snapshot.docs.forEach((x) =>{
               borrables.push(x.id);
              })
              const db= getFirestore();
              const data={
                nota: test
              }
                 const docref= doc(db,"turnos",borrables[0]);
                 updateDoc(docref,data)
             })
          } catch (error) {
            Swal.showValidationMessage(`
              Request failed: ${error}
            `);
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      })
    }else{
      Swal.fire({
        icon: "error",
        title: "No podes cancelar un turno "+ elemento['estado']+"!",
        heightAuto: false
      })
    }
  }

  VerificarCancelar(elemento: any){
    return elemento['estado']!="Cancelado" && elemento['estado'] !="finalizado"
  }

  VerificarEncuesta(elemento: any){
    return elemento['estado'] !="finalizado"
  }

  filtro(filtro:string){
    switch(filtro){
      case 'estado':
        if(this.fil==""){
          this.dataSource=new MatTableDataSource<ITurnos>(this.turnos)
        }else{
          this.dataSource=new MatTableDataSource<ITurnos>(this.turnos.filter(x => x['estado']==this.fil))
        }
      break;
      case 'altura':
        if(this.filA==""){
          this.dataSource=new MatTableDataSource<ITurnos>(this.turnos)
        }else{
        this.dataSource=new MatTableDataSource<ITurnos>(this.turnos.filter(x => x['altura']==this.filA))}
        break;
      case 'peso':
        if(this.filPe==""){
          this.dataSource=new MatTableDataSource<ITurnos>(this.turnos)
        }else{
        this.dataSource=new MatTableDataSource<ITurnos>(this.turnos.filter(x => x['peso']==this.filPe))}
        break;
      case 'temperatura':
        if(this.filT==""){
          this.dataSource=new MatTableDataSource<ITurnos>(this.turnos)
        }else{
        this.dataSource=new MatTableDataSource<ITurnos>(this.turnos.filter(x => x['temperatura']==this.filT))}
        break;
      case 'presion':
        if(this.filP==""){
          this.dataSource=new MatTableDataSource<ITurnos>(this.turnos)
        }else{
        this.dataSource=new MatTableDataSource<ITurnos>(this.turnos.filter(x => x['presion']==this.filP))}
        break;
      case 'clave':
        if(this.filC==""){
          this.dataSource=new MatTableDataSource<ITurnos>(this.turnos)
        }else{
        this.dataSource=new MatTableDataSource<ITurnos>(this.turnos.filter(x => x['clave']==this.filC))}
        break;
      case 'cantidad':
        if(this.filCant==""){
          this.dataSource=new MatTableDataSource<ITurnos>(this.turnos)
        }else{
        this.dataSource=new MatTableDataSource<ITurnos>(this.turnos.filter(x => x['cantidad']==this.filCant))}
        break
    }
    this.dataSource.paginator = this.paginator;
  }
}
export interface ITurnos {
  doctor: string;
  especialidad: string;
  estado: string;
  fecha: string;
  horario:string;
  paciente: string;
}

