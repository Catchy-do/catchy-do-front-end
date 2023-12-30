import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBlogComponent } from './add-blog.component';
import { AddBlogRoutingModule } from './add-blog-routing.module';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [AddBlogComponent],
  imports: [CommonModule, AddBlogRoutingModule, NgSelect2Module],
})
export class AddBlogModule {}
