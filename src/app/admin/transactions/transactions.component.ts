import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonServiceService } from '../../common-service.service';
import * as $ from 'jquery';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  modalRef!: BsModalRef;
  transactionsList: any = [];
  errorMessage!: string;
  name:any;
  id:any;
  key:any;

  dtOptions: DataTables.Settings = {};

  public dtTrigger: Subject<any> = new Subject();
  constructor(
    public commonService: CommonServiceService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: 'lrtip',
    };
    this.getTransactions();
  }

  deleteModal(template: TemplateRef<any>, trans:any) {
    this.id = trans.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-centered',
    });
  }

  editModal(template: TemplateRef<any>, trans:any) {
    this.id = trans.id;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog modal-dialog-centered',
    });
  }

  update() {
    let params = {
      id: this.id,
      key: this.key,
      speciality: this.name,
    };
    this.modalRef.hide();
  }

  deleteTrans() {
    this.transactionsList = this.transactionsList.filter(
      (a:any) => a.id !== this.id
    );
    this.modalRef.hide();
    // this.commonService.deleteTransaction(this.id).subscribe((data : any[])=>{
    //   this.getTransactions();
    // });
  }

  decline() {
    this.modalRef.hide();
  }
  getTransactions() {
    this.commonService.getTransactions().subscribe(
      (res) => {
        this.transactionsList = res;
        // $(function () {
        //   $('table').DataTable();
        // });

        this.dtTrigger.next(this.dtOptions);
      },
      (error) => (this.errorMessage = <any>error)
    );
  }
    // destroy data table when leaving
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
}
