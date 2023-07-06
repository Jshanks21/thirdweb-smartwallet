import 'server-only'
import NFTDisplay from '@/components/NFTDisplay'

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">      
      <NFTDisplay />
    </section>
  )
}