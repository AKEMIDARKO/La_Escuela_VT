import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Escuela VT — Un mundo por compartir",
  description: "Conoce La Escuela VT, un grupo de creadores VTuber. Música, gaming y una comunidad donde la imaginación no tiene horario.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "(function(){try{var t=localStorage.getItem('escuela-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch(e){}})()" }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
