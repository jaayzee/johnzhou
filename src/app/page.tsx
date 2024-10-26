import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/Scene/index'), {
    ssr: false,
})

export default function Home() {
  return (
    <main className="flex h-screen bg-black">
        <Scene />
    </main>
  )
}