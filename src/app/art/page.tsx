
export default function Art() {
  return (
    <>
      <main className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-16 text-foreground">
          <h1 className="text-4xl font-bold mb-6">ART</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Art Cards */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4">PIECE 1</h3>
              <p className="text-gray-300">PIECE 1 DESCRIPTION...</p>
            </div>
            {/* More Art cards */}
          </div>
        </div>
      </main>
    </>
  )
}