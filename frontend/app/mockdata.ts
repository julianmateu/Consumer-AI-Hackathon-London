export const userData = {
  name: "John Doe",
  address: "123 Main St, Springfield",
  policyNumber: "SS-456789",
};

interface Vehicle {
  registrationNumber: string;
  make: string;
  model: string;
}

export const vehicles: Vehicle[] = [
  { registrationNumber: "AB123CD", make: "Toyota", model: "Camry" },
  { registrationNumber: "EF456GH", make: "Honda", model: "Civic" },
  { registrationNumber: "IJ789KL", make: "Ford", model: "Focus" },
];

export const reportData = {
  policyNumber: "SS-456789",
  userName: "John Doe",
  vehicle: "Toyota Camry (AB123CD)",
  vehicleType: "Sedan",
  photosAttached: 1,
  pohtoUrl: "/crash_pic.png",
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
