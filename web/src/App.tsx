import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'
import './lib/dayjs'
import { ToastContainer, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ToastContainer transition={Flip} />

      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}
