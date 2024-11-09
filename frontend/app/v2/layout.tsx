import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://elevenlabs.io/convai-widget/index.js" async type="text/javascript"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
