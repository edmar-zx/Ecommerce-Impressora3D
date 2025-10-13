import GlobalStyle from "../styles/globalStyles";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
         <GlobalStyle />
        {children}
      </body>
    </html>
  );
}
