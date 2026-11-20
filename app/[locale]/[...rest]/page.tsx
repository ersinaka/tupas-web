import { notFound } from "next/navigation";

// Routes any unknown path under /tr or /en to the localized not-found page.
export default function CatchAll() {
  notFound();
}
