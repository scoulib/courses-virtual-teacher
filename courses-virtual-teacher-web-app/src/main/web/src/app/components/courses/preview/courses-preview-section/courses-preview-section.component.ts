import {Component, OnInit, Input, ViewChild , ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Course } from 'src/app/models/course/course.model';

/**
 * Composant qui permet d'exporter le cours en PDF ou HTML
 */
@Component({
  selector: 'app-courses-preview-section',
  templateUrl: './courses-preview-section.component.html',
  styleUrls: ['./courses-preview-section.component.css']
})
export class CoursesPreviewSectionComponent implements OnInit {

  @Input()
  public course: Course;

  @ViewChild('htmlData')
  public htmlData: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService) { }

  public ngOnInit(): void {
    this.course.sort();
  }

 /* Exporter une template en pdf with JSPDF */

  /*
 public openPDF(): void {
    const DATA = this.htmlData.nativeElement;
    const doc = new jsPDF('p','pt', 'a4');
    doc.fromHTML(DATA.innerHTML,15,15);
    doc.output('dataurlnewwindow');
  }


  public downloadPDF():void {
    const DATA = this.htmlData.nativeElement;
    console.log(DATA )
    const doc = new jsPDF('p','pt', 'a4');

    const handleElement = {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML,15,15,{
      'width': 200,
      'elementHandlers': handleElement
    });

    doc.save('angular-demo.pdf');
  }
*/

  /**
   * Exporter une template en pdf avec jspdf and html2canvas
   */
  public downloadPDF(): void {
    const title = this.course.title;
    const element = document.getElementById('content');

    html2canvas(element).then((canvas) => {

      console.log(canvas);
      const imgData = canvas.toDataURL('image/png');
      const margin = 2;
      const imgWidth = 210 - 2 * margin;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const doc = new jsPDF('p', 'mm');
      const position = 0;
      // const imgHeight = canvas.height * 208 / canvas.width;
      doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);

      doc.save(title + '.pdf');
    });
  }


  downloadHtml() {
    const title = this.course.title;
    const elHtml = document.getElementById('content').innerHTML;
    const link = document.createElement('a');
    const mimeType = 'text/html' ;



    link.setAttribute('download', title + '.html');
    link.setAttribute('href', 'data:' + mimeType  +  ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
  }

}
