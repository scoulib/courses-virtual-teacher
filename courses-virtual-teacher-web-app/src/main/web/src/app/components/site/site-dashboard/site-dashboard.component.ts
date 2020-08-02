import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Role} from "../../../models/user/role.enum";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-site-dashboard',
  templateUrl: './site-dashboard.component.html',
  styleUrls: ['./site-dashboard.component.css']
})
export class SiteDashboardComponent implements OnInit {

  constructor(private router: Router,
              public tokenStorageService: TokenStorageService) { }

  public ngOnInit(): void {

  }

  RedirectToCourses(){
    this.router.navigate(['/courses']);
  }

  RedirectToTasks(){
    this.router.navigate(['/tasks']);
  }

  RedirectToStructures(){
    this.router.navigate(['/structures']);
  }

  RedirectToMails(){
    this.router.navigate(['/mails']);
  }

  public RedirectToAccounts(){

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
