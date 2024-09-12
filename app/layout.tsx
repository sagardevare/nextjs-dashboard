import '@/app/ui/global.css';
import {inter} from '@/app/ui/fonts';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <UserProvider>
        <body className={`${inter.className} antialiased`}>{children}</body>
      </UserProvider>
    </html>
  );
}
