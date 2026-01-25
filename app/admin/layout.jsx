import Navbar from "../components/nav/Navbar";

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      {/* Future: sidebar can be added here */}
    </>
  );
}