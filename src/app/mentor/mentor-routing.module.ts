import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentorComponent } from './mentor.component';

const routes: Routes = [
  {
    path: '',
    component: MentorComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'my-bookings',
        loadChildren: () =>
          import('./appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'mentees',
        loadChildren: () =>
          import('./mymentees/mymentees.module').then((m) => m.MymenteesModule),
      },
      {
        path: 'schedule-timing',
        loadChildren: () =>
          import('./scheduletiming/scheduletiming.module').then(
            (m) => m.ScheduletimingModule
          ),
      },
      {
        path: 'invoice',
        loadChildren: () =>
          import('./invoice/invoice.module').then((m) => m.InvoiceModule),
      },
      {
        path: 'reviews',
        loadChildren: () =>
          import('./reviews/reviews.module').then((m) => m.ReviewsModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('./blog/blog.module').then((m) => m.BlogModule),
      },
      {
        path: 'add-blog',
        loadChildren: () =>
          import('./add-blog/add-blog.module').then((m) => m.AddBlogModule),
      },
      {
        path: 'edit-blog',
        loadChildren: () =>
          import('./edit-blog/edit-blog.module').then((m) => m.EditBlogModule),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorRoutingModule {}
