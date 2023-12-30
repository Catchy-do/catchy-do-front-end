import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBlogRoutingModule } from './add-blog-routing.module';
import { AddBlogComponent } from './add-blog.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [AddBlogComponent],
  imports: [
    CommonModule,
    AddBlogRoutingModule,
    NgxDropzoneModule,
    NgSelect2Module,
  ],
})
export class AddBlogModule {}
