import React from 'react';
import ProgressBar from '@/components/ProgressBar';

export default function Work() {
  return (
    <>
      <main className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex">
            <div className="w-[200px] relative">
              <div className="fixed w-[200px] h-[calc(100vh-200px)]">
              <h1 className="text-3xl font-theme mb-8 text-foreground">Work ✦</h1>
                <ProgressBar />
              </div>
            </div>
            <div className="flex-1 pl-8">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="mb-16">
                  <h2 className="text-2xl mb-4">Project {i + 1}</h2>
                  <div className="h-64 bg-gray-100 rounded-lg"></div>
                  <p className="mt-4 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}