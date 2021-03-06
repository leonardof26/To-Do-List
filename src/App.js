import React, { useState, useEffect } from 'react'

import { Text, Alert, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  Container,
  Logo,
  Title,
  Form,
  AddButton,
  CancelButton,
  ButtonText,
  Input,
  ToDoList,
  ToDoItem,
  DeleteButton,
  DeleteText,
  TaskDescription,
} from './styles'

const App = () => {
  const [toDolist, setTodoList] = useState([])
  const [toDoInput, setToDoInput] = useState('')
  const [firstLoad, setFirstLoad] = useState(true)
  const [taskBeingEdited, setTaskBeingEdited] = useState()

  function updateTask() {
    const newTodoList = [...toDolist]
    newTodoList[taskBeingEdited.index].task = toDoInput

    setTodoList(newTodoList)
    setTaskBeingEdited(null)
    setToDoInput('')
  }

  function createNewTask() {
    const maxId = toDolist.length ? toDolist[toDolist.length - 1].id : 0
    const newId = maxId + 1
    const newTodo = { id: newId, task: toDoInput }
    const oldTodoList = toDolist
    const newTodoList = oldTodoList.concat(newTodo)

    setTodoList(newTodoList)
    setToDoInput('')
  }

  function handleSubmit() {
    if (!toDoInput) return

    if (taskBeingEdited) {
      updateTask()
      return
    }

    createNewTask()
  }

  function handleDeleteTask(task) {
    const oldTodoList = [...toDolist]
    oldTodoList.splice(task, 1)

    setTodoList(oldTodoList)
  }

  function handleDeleteButton(index) {
    Alert.alert(
      'Exclusão de Tarefa',
      'Tem certeza que deseja excluir essa tarefa',
      [
        {
          text: 'Sim',
          onPress: () => handleDeleteTask(index),
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    )
  }

  useEffect(() => {
    if (firstLoad) return

    async function saveDataToLocalStorage() {
      await AsyncStorage.setItem('@ToDoList', JSON.stringify(toDolist))
    }

    saveDataToLocalStorage()
  }, [toDolist])

  useEffect(() => {
    async function getDataFromLocalStorage() {
      const list = await AsyncStorage.getItem('@ToDoList')
      if (list) {
        setTodoList(JSON.parse(list))
      }
    }

    getDataFromLocalStorage()
    setFirstLoad(false)
  }, [])

  useEffect(() => {
    if (!taskBeingEdited) return

    setToDoInput(taskBeingEdited.task)
  }, [taskBeingEdited])

  return (
    <Container>
      <Logo>
        <Title>Lista To Do</Title>
      </Logo>

      <Form>
        <Input
          value={toDoInput}
          onChangeText={setToDoInput}
          onSubmitEditing={handleSubmit}
          testID="taskInput"
          placeholder="Digite a sua tarefa"
        />
        <AddButton
          testID="addButton"
          onPress={handleSubmit}
          isEditing={taskBeingEdited}
        >
          <ButtonText>{taskBeingEdited ? 'Editar' : 'Adicionar'}</ButtonText>
        </AddButton>
        {taskBeingEdited ? (
          <CancelButton onPress={() => setTaskBeingEdited(null)}>
            <ButtonText>X</ButtonText>
          </CancelButton>
        ) : null}
      </Form>

      {toDolist.length ? (
        <ToDoList
          data={toDolist}
          testID="toDoList"
          keyExtractor={item => String(item.id)}
          renderItem={({ item: toDo, index }) => (
            <ToDoItem
              style={{
                borderBottomWidth: index !== toDolist.length - 1 ? 1 : 0,
              }}
            >
              <TaskDescription
                onPress={() => setTaskBeingEdited({ ...toDo, index })}
              >
                <Text>{toDo.task}</Text>
              </TaskDescription>

              <DeleteButton
                onPress={() => handleDeleteButton(index)}
                disabled={taskBeingEdited}
                isEditing={taskBeingEdited}
              >
                <DeleteText isEditing={taskBeingEdited}>-</DeleteText>
              </DeleteButton>
            </ToDoItem>
          )}
        />
      ) : (
        <View />
      )}
    </Container>
  )
}

export default App
