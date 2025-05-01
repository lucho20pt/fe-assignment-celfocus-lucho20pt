import Companies from '@/components/companies/Companies'

function App() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-10">
      <h1 className="text-3xl font-bold underline">Celfocus Companies</h1>
      <Companies />
    </main>
  )
}

export default App
