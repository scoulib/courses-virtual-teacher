import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from 'src/app/services/token-storage.service';
import {Router} from "@angular/router";
import {Role} from "../../../models/user/role.enum";

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {

  constructor(public tokenStorageService: TokenStorageService,
              private router: Router) { }

  public ngOnInit(): void {
    console.log('user role: ' , this.tokenStorageService.getUser().role );

  }


  public goToAccount(){

    if (this.tokenStorageService.getUser() != null){

        if (this.tokenStorageService.getUser().role === Role.ADMIN ){

          this.router.navigate(['/account']);

        }else if ( this.tokenStorageService.getUser().role === Role.STUDENT || this.tokenStorageService.getUser().role === Role.TEACHER  ){

          this.router.navigate(['/account-edit', this.tokenStorageService.getUser().id] );

        }else{

          this.router.navigate(['/account']);
        }

    }else{

      this.router.navigate(['/account']);

    }


  }
}
