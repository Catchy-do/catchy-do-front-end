import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonServiceService } from '../common-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  id:any;
  blogdetails: any = [];
  blogs: any = [];
  comments: any = [];
  tags: any = [];
  name = '';
  email = '';
  usercomment = '';
  constructor(
    private toastr: ToastrService,
    public commonService: CommonServiceService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];
    this.getBlogdetails();
    this.getBlogs();
    this.getComments();
    this.getTags();
    window.scrollTo(0, 0);
  }

  getBlogdetails() {
    if (!this.id) {
      this.id = 1;
    }
    this.commonService.getBlogsDetails(this.id).subscribe((res) => {
      this.blogdetails = res;
    });
  }

  getBlogs() {
    this.commonService.getBlogs().subscribe((result) => {
      this.blogs = result;
    });
  }

  getTags() {
    this.commonService.getTags().subscribe((res) => {
      this.tags = res;
    });
  }

  getComments() {
    this.commonService.getComments().subscribe((result) => {
      this.comments = result;
    });
  }

  navigate(blog:any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl('/blog-details?id=' + blog.id);
    });
  }

  comment() {
    if (this.name === '' || this.email === '' || this.usercomment === '') {
      this.toastr.error('', 'Please enter mandatory field');
    } else {
      let params = {
        id: this.comments.length + 1,
        name: this.name,
        email: this.email,
        comment: this.usercomment,
      };
      this.commonService.createComment(params).subscribe((res) => {
        this.toastr.success('', 'Comment successfully!');
        this.name = '';
        this.email = '';
        this.usercomment = '';
        this.getComments();
      });
    }
  }
}
