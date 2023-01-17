import { Habit } from './components/Habit'

export function App() {
  return (
    <div>
      <Habit completed={5} />
      <Habit completed={10} />
      <Habit completed={2} />
      <Habit completed={15} />
    </div>
  )
}
