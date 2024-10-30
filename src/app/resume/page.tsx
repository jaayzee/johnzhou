import Navbar from '@/components/Navbar'

export default function Resume() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-16">
        <div className="container mx-auto px-4 py-16 text-white">
          <h1 className="text-4xl font-bold mb-6"> My Resume </h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed">
              THIS IS MY RESUME PAGE!
            </p>
            {/* CONTENT */}
          </div>
        </div>
      </main>
    </>
  )
}