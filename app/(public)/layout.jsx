import Navbar from "../components/nav/Navbar";

export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* Footer can be added later */}
    </>
  );
}