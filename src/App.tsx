import { Button } from '@/components/ui/button'

function App() {
  const HandleButtonClick = () => {
    console.log('Button clicked')
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen gap-10">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button onClick={HandleButtonClick} className="cursor-pointer">
        Click me
      </Button>
    </section>
  )
}

export default App
