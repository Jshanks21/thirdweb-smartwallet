import 'server-only'
import '@/styles/globals.css'
import Nav from '@/components/Nav';
import Web3Provider from '@/components/Web3Provider';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Web3Provider>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Web3Provider>
      </body>
    </html>
  )
}