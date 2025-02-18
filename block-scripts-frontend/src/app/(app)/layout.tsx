import { Header } from "@/components/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-1 flex-col">
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
