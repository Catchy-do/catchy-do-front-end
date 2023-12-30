import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from './../../common-service.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogs:any;
  constructor(public commonService: CommonServiceService) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.commonService.getBlogs().subscribe((res) => {
      this.blogs = res;
    });
  }
}
