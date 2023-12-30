import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonServiceService } from '../common-service.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  @ViewChild('stickyMenu') menuElement!: ElementRef;
  sticky: boolean = false;
  elementPosition: any;
  blogs: any = [];
  firstBlock: any = [];
  tags: any = [];

  constructor(public commonService: CommonServiceService) {}

  ngOnInit(): void {
    this.getBlogs();
    this.getTags();
    this.getBlogdetails();
    window.scrollTo(0, 0);
  }

  getBlogs() {
    this.commonService.getBlogs().subscribe((result) => {
      this.blogs = result;
    });
  }

  getBlogdetails() {
    this.commonService.getBlogsDetails(1).subscribe((res) => {
      this.firstBlock = res;
    });
  }

  getTags() {
    this.commonService.getTags().subscribe((res) => {
      this.tags = res;
    });
  }
}
