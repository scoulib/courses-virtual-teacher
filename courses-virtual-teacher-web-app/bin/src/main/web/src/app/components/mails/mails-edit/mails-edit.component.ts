import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailsService } from 'src/app/services/mails.service';

@Component({
  selector: 'app-mails-edit',
  templateUrl: './mails-edit.component.html',
  styleUrls: ['./mails-edit.component.css']
})
export class MailsEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mailsService: MailsService) { }

  public ngOnInit(): void {

  }
}
