import {
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState,
} from 'react'

import style from '@/styles/modal.module.css'

type Props = {
  children?: ReactNode
  onCloseModal: MouseEventHandler
}

export default function Modal({ children, onCloseModal }: Props) {
  const [modalClassName, setModalClassName] = useState([
    'fixed',
    'p-4',
    'inset-0',
    'z-100',
    'top-[100px]',
    'pointer-events-auto',
    'opacity-0',
  ])

  useEffect(() => {
    setModalClassName((previousClassName) => {
      return [...previousClassName, style['u-fade-in']]
    })

    return () => {
      setModalClassName((previousClassName) => {
        return [...previousClassName, 'pointer-events-auto']
      })
    }
  }, [])

  const handleCloseModal = (event: MouseEvent): void => {
    event.preventDefault()

    setModalClassName([...modalClassName, style['u-fade-out']])

    setTimeout(() => {
      onCloseModal(event)
    }, 450)
  }

  return (
    <div className={modalClassName.join(' ')}>
      <div className="absolute inset-0 bg-slate-500 opacity-50"></div>

      <button
        onClick={handleCloseModal}
        className="absolute top-0 right-0 text-7xl flex items-center justify-center leading-10 w-16 h-16 text-white hover:text-teal-400 transition-colors"
      >
        &times;
      </button>

      <section className="max-w-modal w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-slate-500 rounded-md w-full max-h-modal overflow-auto">
        {children}
      </section>
    </div>
  )
}
