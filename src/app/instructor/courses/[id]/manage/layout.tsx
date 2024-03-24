import { Button } from "@/components/ui/button";
import Sidebar from "./components/sidebar";
import { ManageNavbar } from "@/components/component/manage-navbar";
import { CogIcon } from "./utils/utilities";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ManageNavbar />
      <div className="flex bg-gray-100 h-auto">
        <Sidebar />
        <main className="flex-1 px-8 py-8">
          <header className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Teaching Blockchain</h1>
            <div className="flex items-center space-x-4">
              <span className="px-2 py-1 text-xs font-semibold text-purple-600 bg-purple-100 rounded-full">
                DRAFT
              </span>
              <Button variant="outline">Preview</Button>
              <CogIcon className="w-6 h-6 text-gray-600" />
            </div>
          </header>
          <section className="mt-8">{children}</section>
        </main>
      </div>
    </div>
  );
}
