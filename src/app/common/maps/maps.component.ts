import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { MapService } from "./map.service";

@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.css"]
})
export class MapsComponent implements OnInit {
  @Input() location: string;

  public isPositionError: Boolean = false;
  public lat: number;
  public lng: number;

  constructor(private mapService: MapService, private ref: ChangeDetectorRef) {}

  ngOnInit() {}

  mapReadyHandler() {
    this.mapService.getGeolocation(this.location).subscribe(
      coordinates => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
        this.ref.detectChanges();
      },
      () => {
        this.isPositionError = true;
      }
    );
  }
}
