import '../styles/globals.css'

export const metadata = {
  title: 'Parkinson\'s Detection',
  description: 'Upload your 3D SPECT image for Parkinson\'s detection analysis',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 