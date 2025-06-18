import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useCallback } from 'react'

function App () {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (numberAllowed) {
      string = string + '1234567890'
    }
    if (charAllowed) {
      string = string + '!@#$%^&*()'
    }
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length)
      pass += string.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='w-full bg-gray-700 pb-4 px-4 rounded-lg'>
        <h1 className='center text-[3rem] text-white'>Password Generator</h1>
        <div className='flex w-full rounded-xl mb-4'>
          <input
            type='text'
            value={password}
            placeholder='password'
            className='w-full  rounded-xl p-4'
            readOnly
            ref={passwordRef}
          />
          <button
            className='outline-none bg-blue-500 text-white px-4 rounded-xl hover:bg-blue-400'
            onClick={copyPasswordToClipboard}
          >
            copy
          </button>
        </div>
        <div className='flex gap-x-2'>
          <input
            type='range'
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={e => {
              setLength(e.target.value)
            }}
          />
          <label htmlFor='' className='text-white'>
            Length:{length}
          </label>
        </div>
        <div className='flex gap-x-2'>
          <input
            type='checkbox'
            defaultChecked={numberAllowed}
            id='inputNumber'
            onChange={() => {
              setNumberAllowed(prev => !prev)
            }}
          />
          <label htmlFor='inputNumber' className='text-white'>
            Number
          </label>
        </div>
        <div className='flex gap-x-2'>
          <input
            type='checkbox'
            defaultChecked={charAllowed}
            id='inputNumber'
            onChange={() => {
              setCharAllowed(prev => !prev)
            }}
          />
          <label htmlFor='inputNumber' className='text-white'>
            Character
          </label>
        </div>
      </div>
    </>
  )
}

export default App
