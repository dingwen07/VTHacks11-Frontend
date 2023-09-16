import type { Metadata } from 'next'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'

export const metadata: Metadata = {
  title: 'Chatroom',
  description: 'For VTHacks-11',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
	<Container maxWidth="sm">{children}</Container>
	<Divider />
      </body>
    </html>
  )
}
