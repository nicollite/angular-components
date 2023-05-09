import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TesterComponent } from "./pages/tester/tester.component";

const routes: Routes = [
  {
    path: "test",
    component: TesterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
