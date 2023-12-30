import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonServiceService } from '../../common-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as $ from 'jquery';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: any = [];
  errorMessage!: string;
  modalRef!: BsModalRef;
  id:any;

  @ViewChild(DataTableDirective)
  public dtElement!: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();
  constructor(public commonService: CommonServiceService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: 'lrtip',
    };
    this.getReviews();
  }

  deleteModal(template: TemplateRef<any>, special:any) {
    let data = this.reviews.filter((a:any) => a.id === special.id);
    this.id = data[0].id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm modal-dialog-centered' });
  }

  getReviews() {
    this.commonService.getReviews()
      .subscribe(res => {
        this.reviews = res;
        this.dtTrigger.next(this.dtOptions);
      },
        error => this.errorMessage = <any>error);
  }
  deleteReview() {
    this.commonService.deleteReview(this.id).subscribe((data: any) => {
      this.modalRef.hide();
      this.getReviews();
    });
  }

  decline() {
    this.modalRef.hide();
  }
     // destroy data table when leaving
     ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }

}
