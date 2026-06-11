import { Inter } from "next/font/google";
import { GridBackground } from "@/components/GridBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Inter lives here, not in the root layout: the blog is the only surface
// using it, and a root-level preload would drag its woff2 into the home's
// pre-LCP critical graph for nothing.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "optional",
});

// The blog keeps the v1 visual system (glass, Inter, dark/light theming)
// while the home moved on to the v2 art direction.
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.variable}>
      <GridBackground />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
