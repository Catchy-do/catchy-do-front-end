import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonServiceService } from '../../../../common-service.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  blogdetails: any = [];
  id:any;
  constructor(
    public commonService: CommonServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];
    this.getBlogdetails();
  }

  getBlogdetails() {
    if (!this.id) {
      this.id = 1;
    }
    this.commonService.getBlogsDetails(this.id).subscribe((res) => {
      this.blogdetails = res;
    });
  }
}
