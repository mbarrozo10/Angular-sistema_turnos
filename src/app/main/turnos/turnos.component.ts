import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {

  constructor(private router: Router, private auth: UserService){}


  ngOnInit(): void {
    if(this.auth.userUsed['tipo']== 'user'){
      this.router.navigateByUrl('main/turnos/paciente', {replaceUrl: true});
    }else if(this.auth.userUsed['tipo']== 'especialista'){
      this.router.navigateByUrl('main/turnos/especialista', {replaceUrl: true});
    }else {this.router.navigateByUrl('main/turnos/admin', {replaceUrl: true})};

  }

}
