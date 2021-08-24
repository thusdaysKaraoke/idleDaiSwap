import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaiSwapComponent } from './modules/idle/components/dai-swap/dai-swap.component';

const routes: Routes = [
  { path: '', component: DaiSwapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
