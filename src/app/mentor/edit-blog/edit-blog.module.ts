import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBlogRoutingModule } from './edit-blog-routing.module';
import { EditBlogComponent } from './edit-blog.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [EditBlogComponent],
  imports: [
    CommonModule,
    EditBlogRoutingModule,
    NgxDropzoneModule,
    NgSelect2Module,
  ],
})
export class EditBlogModule {}
