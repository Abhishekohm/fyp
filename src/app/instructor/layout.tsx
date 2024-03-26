import RequireLogin from "@/components/component/RequireLogin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RequireLogin>{children}</RequireLogin>;
}
