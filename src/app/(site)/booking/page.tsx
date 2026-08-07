import { redirect } from "next/navigation";

/** Booking is not offered on this site — send visitors to contact. */
export default function BookingRemoved() {
  redirect("/contact");
}
