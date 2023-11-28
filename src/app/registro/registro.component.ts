import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { getDownloadURL, ref, uploadBytes,Storage } from '@angular/fire/storage';
import Swal from 'sweetalert2';
import { animate, state, style, transition, trigger } from '@angular/animations';

const fadeIn= trigger('fadeIn',[
  state('void', style({
    transform: 'translateY(1000px)',
    opacity: 0
  })),
  transition('void => *', animate('0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)')),
  state('*', style({
    transform: 'translateY(0)',
    opacity: 1
  })),
])


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  animations: [fadeIn]
})
export class RegistroComponent {
  registrarUsuario:boolean = true;
  selectedValue: string="usuario";
  imagenes:string = "Elija 2 imagenes para su perfil";
  pass=""
  correo=""
  nombre=""
  apellido=""
  edad=0
  dni=0
  obraSeleccionada=""
  especialidad=""
  obras: any[] = [];
  especialidades:any[] = [];
  eleccion:boolean = false;
  constructor(private auth: UserService, private router: Router, private firestore: Firestore, private storage : Storage){
  }

  ngOnInit(): void {
    const placeRef =  collection(this.firestore, 'obraSocial');
    collectionData(placeRef).subscribe(data => {
      this.obras=[]
      data.forEach(d => {
        this.obras.push(d);
      });
    });
    const x =  collection(this.firestore, 'especialidades');
    collectionData(x).subscribe(data => {
      this.especialidades=[]
      data.forEach(d => {
        this.especialidades.push(d);
      });
    });
  }


  async newImage(event: any) {
    if(this.selectedValue=="usuario"){
     this.files= event.target.files;
     const imagenes: File[] = [];
    for (let i = 0; i < this.files.length; i++) {
      imagenes.push(this.files[i]);
    }
   console.log(imagenes);}
    else{
     this.files= event.target.files[0];
     console.log(this.files)
    }
  }
  files:any;

  upload(){
    if(this.selectedValue=="usuario"){
      const filePath="imagenesUsuarios/"+ this.correo + "-1" ;
      const filePath2="imagenesUsuarios/"+ this.correo + "-2" ;
      const reffile= ref(this.storage,filePath);
     uploadBytes(reffile, this.files[0]).then(async img =>{
       const test= ref(this.storage,filePath);
       const imgf= await getDownloadURL(test);
       const reff= ref(this.storage, filePath2);
       uploadBytes(reff, this.files[1]).then(async y =>{
        const x= ref(this.storage,filePath2);
        const img2= await getDownloadURL(x)
        const imagenes={
          imagen1: imgf,
          imagen2: img2
        }
        this.guardarInfo(imagenes);
       });
     }).catch(err => console.log(err)); 
    }else{
      const filePath="imagenesUsuarios/"+ this.correo + "-1" ;
      const reffile= ref(this.storage,filePath);
     uploadBytes(reffile, this.files).then(async img =>{
       const test= ref(this.storage,filePath);
       const imgf= await getDownloadURL(test);
        this.guardarInfo(imgf);
       }).catch(err => console.log(err)); 
    }
    
    
}
async guardarInfo(imagenes: any) {
  const placeRef = collection(this.firestore,"usuarios")
  let text;
  if(this.registrarUsuario)
  {
    const Data= {
    nombre: this.nombre,
    apellido: this.apellido,
    dni: this.dni,
    img1: imagenes['imagen1'],
    correo: this.correo,
    img2: imagenes['imagen2'],
    edad: this.edad,
    tipo: "user",
    obra: this.obraSeleccionada,
    pass:this.pass
  }
  addDoc(placeRef, Data)
  // this.auth.verificarCorreo()
  text="Se envio un mail de verificacion al correo: " + this.correo
}
  else{
    const Data= {
      nombre: this.nombre,
      apellido: this.apellido,
      dni: this.dni,
      img: imagenes,
      correo: this.correo,
      edad: this.edad,
      tipo: "especialista",
      especialidad: this.especialidad,
      habilitado:true,
      pass:this.pass
    }
    addDoc(placeRef, Data)
    text="Ya puede iniciar sesion"
  }
  this.auth.register(this.correo,this.pass,this.nombre)
  this.nombre=""
  this.apellido=""
  this.dni=0
  this.pass=""
  this.files=""
  this.edad=0;
  this.correo=""
  Swal.fire({
    icon: 'success',
    title: "El usuario se guardo ok",
    text: text,
    heightAuto: false,

  })
}

registrar(){
  console.log(this.captcha)
  if(this.nombre!="" && this.apellido!="" && this.dni!=0 && (this.edad >18 && this.edad <100) && this.correo!="" && this.pass!="" &&this.captcha!=""){
    this.upload()
  }else{
    Swal.fire({
      icon:"warning",
      title:"Falto algun dato!",
      text:"Revisa bien todos los campos",
      heightAuto: false,
    })
  }
}

  login(){
    this.router.navigateByUrl("login",{replaceUrl:true})
  }

  AgregarEspecialidad(){
    if(this.especialidad=='otro'){
      Swal.fire({
        title: 'Que especialidad queres agregar?',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          const x= collection(this.firestore,'especialidades');
          const data={nombre: login }
          addDoc(x,data);
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon:"success",
            title:"Se agrego correctamente!",
            heightAuto: false,
          })
        }
      })
    }
  }

  AbrirRegistro(tipo:string){
    console.log(tipo)
    if(tipo=="usuario") {
      this.imagenes="Elija 2 imagenes para su perfil"
      this.registrarUsuario = true}
    else {
      this.imagenes="Elija 1 imagen para su perfil"
      this.registrarUsuario = false}
    this.eleccion=true;
  }

  captcha:string=""
  resolved(captchaResponse:string){
    this.captcha=captchaResponse

  }
}
