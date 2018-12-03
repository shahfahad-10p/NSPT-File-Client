import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileEditComponent } from './file-edit/file-edit.component'


const routes: Routes = [
  { path: 'edit', component: FileEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
