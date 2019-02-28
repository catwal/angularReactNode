import { Component, OnInit } from "@angular/core";
import { RentalService} from '../shared/rental.service';
import { Rental } from '../shared/rental.model';

@Component({
  selector: "app-rental-list",
  templateUrl: "./rental-list.component.html",
  styleUrls: ["./rental-list.component.css"]
})

export class RentalListComponent implements OnInit {

  public rentals: Array<Rental> = new Array<Rental>();

  constructor(private rentalService: RentalService) {}

  ngOnInit() {
  const rentalObservable = this.rentalService.getRentals();

  rentalObservable.subscribe(
    (data: Array<Rental>) => {
      this.rentals = data;7
      /* this.rentals[0].bedrooms; */
    },
    (error) => {

    },
    () => {

    }
  );
  }
}
