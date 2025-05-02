import Header from '@/components/layout/header'
import Companies from '@/components/companies/Companies'

function App() {
  return (
    <div className="flex flex-col items-center justify-start h-screen gap-10 text-accent-foreground">
      <Header />
      <main className="flex flex-col items-center justify-center gap-10">
        <Companies />
      </main>
    </div>
  )
}

export default App
