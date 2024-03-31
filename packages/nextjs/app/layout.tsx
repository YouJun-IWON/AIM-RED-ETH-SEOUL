import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import QueryProvider from "~~/components/QueryProvider";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${process.env.PORT || 3000}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "AIM RED",
    template: "%s | Scaffold-ETH 2",
  },
  description: "B2C RED TEAM GAME",
  openGraph: {
    title: {
      default: "AIM RED",
      template: "%s | Scaffold-ETH 2",
    },
    description: "B2C RED TEAM GAME",
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [imageUrl],
    title: {
      default: "AIM RED",
      template: "%s | Scaffold-ETH 2",
    },
    description: "B2C RED TEAM GAME",
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
  },
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {

 


  return (
    <html suppressHydrationWarning>
      <body className='min-w-[1500px]'>
        <ThemeProvider defaultTheme="dark">
          <ScaffoldEthAppWithProviders>
            <QueryProvider>{children}</QueryProvider>
          </ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
