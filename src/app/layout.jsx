import { Pixelify_Sans } from "next/font/google";
import "@styles/globals.css"

const Pixelify_Sans_font = Pixelify_Sans({ subsets: ["latin"]});

export const metadata = {
  title: "Startup Expo 2024",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={Pixelify_Sans_font.className}>
        {children}
        </body>
    </html>
  );
}
