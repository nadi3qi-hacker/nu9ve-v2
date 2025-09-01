// app/layout.tsx
export const metadata = {
  title: "Nu9ve",
  description: "Nu9ve — academia de habilidades blandas"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
