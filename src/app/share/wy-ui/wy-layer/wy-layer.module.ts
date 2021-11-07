import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAlertModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzIconModule, NzInputModule, NzListModule, NzSpinModule } from 'ng-zorro-antd';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WyLayerDefaultComponent } from './wy-layer-default/wy-layer-default.component';
import { WyLayerModalComponent } from './wy-layer-modal/wy-layer-modal.component';
import { WyLayerLoginComponent } from './wy-layer-login/wy-layer-login.component';
import { WyLayerLikeComponent } from './wy-layer-like/wy-layer-like.component';
import { WyLayerShareComponent } from './wy-layer-share/wy-layer-share.component';
import { WyLayerRegisterComponent } from './wy-layer-register/wy-layer-register.component';

@NgModule({
  declarations: [WyLayerModalComponent, WyLayerDefaultComponent, WyLayerLoginComponent, WyLayerLikeComponent, WyLayerShareComponent, WyLayerRegisterComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    DragDropModule,
    ReactiveFormsModule,
    NzInputModule,
    NzCheckboxModule,
    NzSpinModule,
    NzAlertModule,
    NzListModule,
    NzIconModule,
    NzFormModule,
    FormsModule
  ],
  exports: [WyLayerModalComponent, WyLayerDefaultComponent, WyLayerLoginComponent, WyLayerLikeComponent, WyLayerShareComponent, WyLayerRegisterComponent]
})
export class WyLayerModule { }
