import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private breakpointObserver = inject(BreakpointObserver);
  usuario:any={
    nombre: ''
  }
  admin:boolean = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(private service : UserService, private router: Router, private firestore: Firestore){
      this.Actualzar();
    }

    Actualzar(){
      const placeref= collection(this.firestore, 'usuarios');
      const retorno= collectionData(placeref);
      retorno.subscribe(data =>
      {
       for (const x of data){
         if(x['correo']=== this.service.retornarUsuario() ){
           this.usuario= x;
           if(this.usuario.tipo=='admin'){
            this.admin=false;
           }
         }
       }
      })
    }

    Salir(){
      this.service.logout()
      this.router.navigateByUrl('login',{replaceUrl:true})
    }
}
