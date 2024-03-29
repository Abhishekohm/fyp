"use client";
import Sidebar from "./components/sidebar";
import { ManageNavbar } from "@/components/component/manage-navbar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ManageNavbar />
      <div className="flex bg-gray-100 " style={{ minHeight: "100vh" }}>
        <Sidebar />
        <main className="flex-1 px-8 py-8">
          <section className="mt-8">{children}</section>
        </main>
      </div>
    </div>
  );
}
