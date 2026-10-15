import { redirect } from "next/navigation";

// The old Work page showed electronics-only content that now lives on
// the Experience and Projects pages.
export default function WorkPage() {
  redirect("/projects");
}
