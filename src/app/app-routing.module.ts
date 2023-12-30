import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
//import { AuthGuardService } from './services/auth/auth-guard.service';
import { RoleGuardGuard } from './services/core/guards/role-guard.guard';
import { AuthGuardGuard } from './services/core/guards/auth-guard.guard';


const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    canActivate: [AuthGuardGuard,],
    path: 'mentor',
    loadChildren: () =>
      import('./mentor/mentor.module').then((m) => m.MentorModule),
  },
  {
    canActivate: [AuthGuardGuard,],
    path: 'mentee',
    loadChildren: () =>
      import('./mentee/mentee.module').then((m) => m.MenteeModule),
  },
  {
    path: 'blank',
    loadChildren: () =>
      import('./blank/blank.module').then((m) => m.BlankModule),
  },
  {
    path: 'component',
    loadChildren: () =>
      import('./component/component.module').then((m) => m.ComponentModule),
  },
  {
    path: 'map-grid',
    loadChildren: () =>
      import('./map-grid/map-grid.module').then((m) => m.MapGridModule),
  },
  {
    path: 'map-list',
    loadChildren: () =>
      import('./map-list/map-list.module').then((m) => m.MapListModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'blog-grid',
    loadChildren: () =>
      import('./blog-grid/blog-grid.module').then((m) => m.BlogGridModule),
  },
  {
    path: 'search-mentor',
    loadChildren: () =>
      import('./search-mentor/search-mentor.module').then(
        (m) => m.SearchMentorModule
      ),
  },
  {
    path: 'mentor-profile',
    loadChildren: () =>
      import('./mentor-profile/mentor-profile.module').then(
        (m) => m.MentorProfileModule
      ),
  },
  {
    path: 'mentee-profile',
    loadChildren: () =>
      import('./mentor-profile/mentor-profile.module').then(
        (m) => m.MentorProfileModule
      ),
  },
  {
    path: 'blank',
    loadChildren: () =>
      import('./blank/blank.module').then((m) => m.BlankModule),
  },
  {
    path: 'message',
    loadChildren: () =>
      import('./messages/messages.module').then((m) => m.MessagesModule),
  },
  {
    path: 'success',
    loadChildren: () =>
      import('./success/success.module').then((m) => m.SuccessModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'blog-details',
    loadChildren: () =>
      import('./blog-details/blog-details.module').then(
        (m) => m.BlogDetailsModule
      ),
  },
  {
    path: 'login-page',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('./change-password/change-password.module').then(
        (m) => m.ChangePasswordModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: 'book-now',
    loadChildren: () =>
      import('./book-now/book-now.module').then((m) => m.BookNowModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'video-call',
    loadChildren: () =>
      import('./videocall/videocall.module').then((m) => m.VideocallModule),
  },
  {
    path: 'voice-call',
    loadChildren: () =>
      import('./voicecall/voicecall.module').then((m) => m.VoicecallModule),
  },
  {
    path: 'invoice-details',
    loadChildren: () =>
      import('./invoice-details/invoice-details.module').then(
        (m) => m.InvoiceDetailsModule
      ),
  },
  {
    path: 'privacy-policy',
    loadChildren: () =>
      import('./privacy-policy/privacy-policy.module').then(
        (m) => m.PrivacyPolicyModule
      ),
  },
  {
    path: 'terms-conditions',
    loadChildren: () =>
      import('./terms-conditions/terms-conditions.module').then(
        (m) => m.TermsConditionsModule
      ),
  },
  {
    path: 'admin',
    canActivate: [AuthGuardGuard,],
    // data:{
    //   expectedRoles: ['ADMIN']
    // },
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
      
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    preloadingStrategy: PreloadAllModules
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
