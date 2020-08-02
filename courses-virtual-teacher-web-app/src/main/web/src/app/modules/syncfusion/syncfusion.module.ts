import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewModule, ContextMenuModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    TreeViewModule,
    ContextMenuModule
  ],
})
export class SyncfusionModule { }