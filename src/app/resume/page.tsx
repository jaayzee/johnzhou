export default function Resume() {
  return (
    <main className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-theme mb-8 text-foreground">
          Resume ✦
        </h1>
        <iframe 
          className="w-full h-screen rounded-lg"
          src="https://embed.figma.com/design/NMTE3sGj88ML8MhYQKGwQi/Resume?node-id=1-190&embed-host=share"
          allowFullScreen
        />
      </div>
    </main>
  )
}