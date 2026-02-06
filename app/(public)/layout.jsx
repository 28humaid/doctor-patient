import UserNavbar from "@/components/nav/UserNavbar";

export default function PublicLayout({ children }) {
  return (
    <>
      <UserNavbar />
      <main>{children}</main>
      {/* Footer can be added later */}
    </>
  );
}