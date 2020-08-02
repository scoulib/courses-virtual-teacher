import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailsService } from 'src/app/services/mails.service';

@Component({
  selector: 'app-mails-section',
  templateUrl: './mails-section.component.html',
  styleUrls: ['./mails-section.component.css']
})
export class MailsSectionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mailsService: MailsService) { }

  public ngOnInit(): void {
    
  }
}
