import type { Metadata } from "next";
import ThankYouClient from "./ThankYouClient";

// This is a post-conversion / receipt page reached only via redirect after a
// form submission or payment. It must stay out of search results: indexing
// it would create thin/duplicate content, leak order data into search, and
// let people land on it directly from Google — which would corrupt Google
// Ads / Meta conversion tracking that relies on this page only being hit
// as a genuine post-purchase redirect.
export const metadata: Metadata = {
  title: "Thank You",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function ThankYouPage() {
  return <ThankYouClient />;
}
