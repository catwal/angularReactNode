import { NgModule } from "@angular/core";
import { MapsComponent } from "./maps.component";
import { AgmCoreModule } from '@agm/core';
import { MapService } from './map.service';
import { CamelizePipe } from "ngx-pipes";
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MapsComponent],
  exports: [MapsComponent],
  imports: [AgmCoreModule.forRoot({
    
  }),
  CommonModule],
  providers: [MapService, CamelizePipe],
})

export class MapsModule {}
