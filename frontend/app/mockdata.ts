export const userData = {
  name: "John Doe",
  address: "123 Main St, Springfield",
  policyNumber: "SS-456789",
};

interface Vehicle {
  registrationNumber: string;
  make: string;
  model: string;
  image: string
}

export const vehicles: Vehicle[] = [
  { registrationNumber: "AB123CD", make: "Tesla", model: "Cybertruck", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/2024_Tesla_Cybertruck_Foundation_Series%2C_front_left_%28Greenwich%29.jpg/640px-2024_Tesla_Cybertruck_Foundation_Series%2C_front_left_%28Greenwich%29.jpg" },
  { registrationNumber: "EF456GH", make: "Honda", model: "Civic", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX6dtM__iBXujBpDosob3AcYFV1nX4dfZ8ow&s" },
];

export const reportData = {
  policyNumber: "SS-456789",
  userName: "John Doe",
  vehicle: "Tesla Cybertruck (AB123CD)",
  vehicleType: "Pickup Truck",
  photosAttached: "1",
  photoUrl: "/crash_pic.png",
  status: "Submitted",
  damageLevel: "Medium",
  damageDescription:
    "The vehicle has significant damage to the front bumper and hood. The airbags were deployed, and the windshield is cracked. The car is not driveable.",
  timeOfDay: "Daytime",
  location: "Parking lot",
  numberOfParties: "2",
  additionalInfo:
    "The other party only suffered minor damages. No one was injured in the accident. The vehicle crashed into a tree.",
};
