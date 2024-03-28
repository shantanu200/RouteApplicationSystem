import AWS from "aws-sdk";

export async function sendBookingDetails(phoneNumber: string) {
  const params = {
    Message: "Your booking details",
    PhoneNumber: phoneNumber,
  };

  return null;
}
