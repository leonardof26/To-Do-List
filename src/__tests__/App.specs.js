// import 'react-native'
import React from 'react'
import { render, fireEvent } from 'react-native-testing-library'

import App from '../App'

describe('Main Page', () => {
  it('should contain task Input and Add Button', () => {
    const { getByTestId } = render(<App />)

    expect(getByTestId('taskInput')).toBeTruthy()
    expect(getByTestId('addButton')).toBeTruthy()
  })

  it('should add a task to the List', () => {
    const { getByTestId, getByText, getBy } = render(<App />)

    const taskInput = getByTestId('taskInput')
    const addButton = getByText('Adicionar')

    fireEvent.changeText(taskInput, 'A task')

    fireEvent.press(addButton)

    expect(getByTestId('toDoList')).toBeTruthy()
  })
})
