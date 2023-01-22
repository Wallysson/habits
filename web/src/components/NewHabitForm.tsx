import { Check } from 'phosphor-react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { FormEvent, useState } from 'react'
import { api } from '../lib/axios'
import { ToastContainer, toast, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
]

export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  function notificationSucess(title: string) {
    toast.success(`${title}`, {
      icon: '📋',
      position: 'top-right',
      theme: 'dark',
      autoClose: 2000,
      progressStyle: {
        background: '#8B5CF6'
      }
    })
  }

  function notificationError(title: string) {
    toast.error(`${title}`, {
      icon: '🛑',
      position: 'top-right',
      theme: 'dark',
      autoClose: 2000,
      progressStyle: {
        background: 'red'
      }
    })
  }

  function createNewHabit(event: FormEvent) {
    event.preventDefault()

    if (!title || weekDays.length === 0) {
      return notificationError('Todos os campos precisam ser preenchidos.')
    }

    api.post('habits', {
      title,
      weekDays
    })

    setTitle('')
    setWeekDays([])

    notificationSucess('Hábito criado com sucesso.')
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDayWithRemovedOne = weekDays.filter(day => day !== weekDay)

      setWeekDays(weekDayWithRemovedOne)
    } else {
      setWeekDays([...weekDays, weekDay])
    }
  }

  return (
    <form className="w-full flex flex-col mt-6" onSubmit={createNewHabit}>
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: Exercicios, dormir bem, etc..."
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        onChange={event => setTitle(event.target.value)}
        value={title}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root
              className="flex items-center gap-3 group"
              checked={weekDays.includes(index)}
              key={weekDay}
              onCheckedChange={() => {
                handleToggleWeekDay(index)
              }}
            >
              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                <Checkbox.Indicator>
                  <Check size={20} className="text-white" />
                </Checkbox.Indicator>
              </div>

              <span className=" text-white leading-tight ">{weekDay}</span>
            </Checkbox.Root>
          )
        })}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center gap-3 font-semibold bg-green-600 justify-center hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
