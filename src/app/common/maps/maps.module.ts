import { NgModule } from "@angular/core";
import { MapsComponent } from "./maps.component";
import { AgmCoreModule } from '@agm/core';
import { MapService } from './map.service';
import { CamelizePipe } from "ngx-pipes";

@NgModule({
  declarations: [MapsComponent],
  exports: [MapsComponent],
  imports: [AgmCoreModule.forRoot({
    apiKey: 'AIzaSyClFwwrEu9xB8g1_5qkSuiHVCYvWFt7huI'
  })],
  providers: [MapService, CamelizePipe],
})

export class MapsModule {}
