
export default function Resume() {
  return (
    <>
      <main className="h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-16 h-full flex flex-col items-center">
          <h1 className="text-4xl text-center font-theme mb-12 text-foreground"> My Resume </h1>
          <embed 
            src="/medias/john.pdf"
            type="application/pdf"
            className="w-full h-screen"
          />
        </div>
      </main>
    </>
  )
}