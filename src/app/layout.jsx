import '@/app/globals.css';
import ConditionalNavbar from '@/components/ConditionalNavbar';
import ConditionalFooter from '@/components/ConditionalFooter';

export const metadata = {
  title: 'sagasa online store',
  description: 'Premium Denim and Apparel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ConditionalNavbar />
        <main style={{ minHeight: '100vh' }}>
          {children}
        </main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
