import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditBlogComponent } from './edit-blog.component';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: EditBlogComponent, canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditBlogRoutingModule {}
