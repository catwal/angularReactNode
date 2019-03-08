const Rental = require("./models/rentalSchema");
const User = require("./models/userSchema");

class FakeDb {
  constructor() {
    this.rentals = [
      {
        title: "Nice view on ocean",
        city: "San Francisco",
        street: "Main street",
        category: "condo",
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 4,
        shared: true,
        description: "Very nice apartment in center of the city.",
        dailyRate: 43
      },
      {
        title: "Modern apartment in center",
        city: "New York",
        street: "Time Square",
        category: "apartment",
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 1,
        shared: false,
        description: "Very nice apartment in center of the city.",
        dailyRate: 11
      },
      {
        title: "Old house in nature",
        city: "Spisska Nova Ves",
        street: "Banicka 1",
        category: "house",
        image:
          "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
        bedrooms: 5,
        shared: true,
        description: "Very nice apartment in center of the city.",
        dailyRate: 23
      }
    ];
    this.users = [
      {
        username: "TestUser1",
        email: "test1@gmail.com",
        password: "testtest"
      }
    ];
  }

  /* éviter les doublons d'envoies automatiques */
  async cleanDb() {
    await User.remove({});
    await Rental.remove({});
  }

  /* préparation des données à la BDD */
  pushDataToDb() {
    const user = new User(this.users[0]);

    this.rentals.forEach(rental => {
      const newRental = new Rental(rental);
      newRental.user = user;
      user.rentals.push(newRental);
      newRental.save();
    });
    user.save();
  }
  /* action d'envoie des données */
 async seedDb() {
   await this.cleanDb();
    this.pushDataToDb();
  }
}

module.exports = FakeDb;
