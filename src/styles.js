import styled from 'styled-components/native'

import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  background: #f1f1f1;
  padding: 30px;
`

export const Logo = styled.View`
  margin-top: 15%;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  font-size: 21px;
  color: #7159c1;
`

export const Form = styled.View`
  flex-direction: row;
  margin-top: 15%;
  width: 100%;
  align-items: center;
  align-content: center;
  justify-content: space-between;
`

export const AddButton = styled.TouchableOpacity`
  height: 36px;
  background: #7159c1;
  border-radius: 4px;
  width: ${props => (props.isEditing ? '20%' : '30%')};

  align-items: center;
  justify-content: center;
`

export const CancelButton = styled.TouchableOpacity`
  height: 36px;
  background: #ff3b30;
  border-radius: 4px;
  width: 36px;

  align-items: center;
  justify-content: center;
`

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  font-size: 15px;
  padding: 0 15px;
  height: 36px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  align-items: center;
  width: 65%;
`

export const ToDoList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10%;
  border: 1px solid #b1b1b1;
  padding: 15px;
  padding-top: 5px;
  flex-grow: 0;
  border-radius: 4px;
`

export const ToDoItem = styled.View`
  border-bottom-color: #b1b1b1;
  padding-bottom: 13px;
  padding-top: 13px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const TaskDescription = styled(RectButton)`
  width: 90%;
  height: 100%;
`

export const DeleteButton = styled.TouchableOpacity`
  border: 1px solid;
  border-color: ${props => (props.isEditing ? '#b1b1b1' : '#ff3b30')};
  border-radius: 50px;
  height: 20px;
  width: 20px;

  align-items: center;
  justify-content: center;
`

export const DeleteText = styled.Text`
  color: ${props => (props.isEditing ? '#b1b1b1' : '#ff3b30')};
  font-weight: 600;
`
