import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { getDownloadURL, ref, uploadBytes,Storage } from '@angular/fire/storage';
import { UserCredential } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
  async login() {
    if (this.correo != "" && this.pass != "") {
      try {
        const user = await this.auth.login(this.correo, this.pass);
        console.log(user);
        const usuario:any = await this.verificarUsuario(user);
  
        if (usuario['tipo'] == "user" && !user.user.emailVerified) {
          Swal.fire({
            icon: "error",
            title: "Tu correo no fue verificado",
          });
        }else if (usuario['tipo'] == "especialista" && !usuario['habilitado']){
          Swal.fire({
            icon: "error",
            title: "Tu cuenta fue bloqueada",
            text: "Ponete en contacto con el administrador"
          });
        } else {
          this.router.navigateByUrl("main", { replaceUrl: true });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Algo salió mal!",
          text: "¿Quizás te equivocaste en algo?",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Algo salió mal!",
        text: "¿Quizás olvidaste algo?",
      });
    }
  }
  
  async verificarUsuario(user: UserCredential) {
    const placeref = collection(this.firestore, 'usuarios');
    return new Promise((resolve) => {
      collectionData(placeref).subscribe((data) => {
        console.log("Verificar");
        for (const x of data) {
          if (x['correo'] === user.user.email) {
            console.log(x);
            resolve(x); 
            return;
          }
        }
        resolve(null); 
      });
    });
  }


    onSelectChange() {
      if(this.selectedValue=="usuario") {
        this.imagenes="Elija 2 imagenes para su perfil"
        this.registrarUsuario = true}
      else {
        this.imagenes="Elija 1 imagen para su perfil"
        this.registrarUsuario = false}
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
    if(this.selectedValue=="usuario")
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
      obra: this.obraSeleccionada
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
        habilitado:true
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
      text: text
    })
  }

  registrar(){
    if(this.nombre!="" && this.apellido!="" && this.dni!=0 && (this.edad >18 && this.edad <100) && this.correo!="" && this.pass!=""){
      this.upload()
    }else{
      Swal.fire({
        icon:"warning",
        title:"Falto algun dato!",
        text:"Revisa bien todos los campos"
      })
    }
  }

  inicioRapido(user:string, password:string){
    this.correo=user;
    this.pass=password;
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
            title:"Se agrego correctamente!"
          })
        }
      })
    }
  }
}


