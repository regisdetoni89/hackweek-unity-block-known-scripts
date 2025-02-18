export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto my-6 flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
