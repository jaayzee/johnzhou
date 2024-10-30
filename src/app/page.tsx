import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'

const Scene = dynamic(() => import('@/components/Scene/index'), {
    ssr: false,
})

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <div className="h-screen w-full">
          <Scene />
        </div>
        <section className="absolute top-[100vh] w-full bg-black">
          <div className="container mx-auto px-4 py-16 text-white">
            <h2 className="text-4xl font-bold mb-6">
              ABOUT ME ABOUT ME ABOUT ME
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">THIS IS ABOUT ME</h3>
                <p className="text-gray-300 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex 
                  ea commodo consequat.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">WHAT I LIKE</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• ART</li>
                  <li>• GAMES</li>
                  <li>• STORIES</li>
                  <li>• DEEP SEA</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}