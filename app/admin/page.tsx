import type { Metadata } from "next";
import AdminRoom from "@/components/admin/admin-room";

// Private review room — never indexed, never linked from the site.
// Title resolves to "Admin — moe." via the layout's title template.
export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Server page (metadata) — the room itself is fully client-side: the key
// lives in localStorage and every request carries it as a Bearer header.
export default function AdminPage() {
  return <AdminRoom />;
}
