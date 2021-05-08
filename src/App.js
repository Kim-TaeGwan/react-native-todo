import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { Dimensions, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { theme } from "./theme";
import Input from "./components/Input";
import Task from "./components/Task";
import AppLoading from "expo-app-loading";

/*
 * 리액트 네이티브에서는 AsyncStorage 를 이용해 로컬에 데이터를 저장하고 불러오는 기능을 구현할 수 있다.
 * AsyncStorage 는 비동기로 동작하여 문자열로 된 키-값(key-value) 형태의 데이터를 기기에 저장하고 불러올 수 있는 기능을 제공한다.
 */

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState({
    // 1: { id: "1", text: "Hanbit", completed: false },
    // 2: { id: "2", text: "React Native", completed: true },
    // 3: { id: "3", text: "React Native Sample", completed: false },
    // 4: { id: "4", text: "Edit TODO Item", completed: false },
    // 5: { id: "5", text: "테스트한다", completed: false },
    // 6: { id: "6", text: "스크롤 테스트", completed: false },
    // 7: { id: "7", text: "테스트 7번째", completed: false },
    // 8: { id: "8", text: "많아진다", completed: false },
    // 9: { id: "9", text: "또 있다", completed: false },
    // 10: { id: "10", text: "스크롤 생긴다", completed: false },
    // 11: { id: "11", text: "스크롤 보인다", completed: false },
    // 12: { id: "12", text: "보였다", completed: false },
    // 13: { id: "13", text: "또 있지롱", completed: false },
    // 14: { id: "14", text: "요 것은 완료", completed: true },
    // 15: { id: "15", text: "힘을내", completed: false },
    // 16: { id: "16", text: "요것도 완료하자", completed: true },
    // 17: { id: "17", text: "얼마 안남았았어", completed: false },
    // 18: { id: "18", text: "끝이 보인다", completed: false },
    // 19: { id: "19", text: "이거 다음 끝이다", completed: false },
    // 20: { id: "20", text: "마지막이다", completed: false },
  });

  const width = Dimensions.get("window").width;

  const _saveTasks = async (tasks) => {
    // AsyncStorage 를 이용해 tasks 라는 문자열을 키로 하여 전달된 항목들을 문자열로 변환해서 저장하는 _saveTasks 함수를 만듬
    // task 의 값이 변경될 때마다 저장해야 하므로 setTasks 세터 함수를 이용하는 곳에서 _saveTasks 함수를 호출
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.error(e);
    }
  };

  const _loadTasks = async () => {
    // 항목을 저장할 때 사용했던 키와 동일 한 키로 데이터를 불러오고 객체로 변환하여 tasks에 입력하는 함수.
    const loadedTasks = await AsyncStorage.getItem("tasks");
    setTasks(JSON.parse(loadedTasks || "{}"));
  };

  const _updateTask = (item) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    // setTasks(currentTasks);
    _saveTasks(currentTasks);
  };

  const _toggleTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]["completed"] = !currentTasks[id]["completed"];
    // setTasks(currentTasks);
    _saveTasks(currentTasks);
  };

  const _deleteTask = (id) => {
    // 삭제 버튼을 클릭했을 때 항목의 id를 이용하여 tasks에서 해당 항목을 삭제하는 함수.
    // Task 컴포넌트에 생성된 항목 삭제 함수와 함께 항목 내용 전체를 전달해 자식 컴포넌트에서도 항목의 id를 확인할 수 있도록 수정
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    // setTasks(currentTasks);
    _saveTasks(currentTasks);
  };

  const _addTask = () => {
    // id는 할 일 항목이 추가되는 시간의 타임스태프를 이용
    // 내용을 나타내는 text는 Input 컴포넌트에 입력된 값을 지정.
    // completed는 새로 입렵되는 항목이므로 항상 false가 된다.
    setNewTask("");
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    // setTasks({ ...tasks, ...newTaskObject });
    _saveTasks({ ...tasks, ...newTaskObject });
  };

  const _handleTextChange = (text) => {
    setNewTask(text);
  };

  const _onBlur = () => {
    setNewTask("");
  };

  return isReady ? (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title>TODO List</Title>
        <Input
          placeholder="+ Add a Task"
          value={newTask}
          onSubmitEditing={_addTask}
          onChangeText={_handleTextChange}
          onBlur={_onBlur}
        />
        <List width={width}>
          {Object.values(tasks) // json 이 객체형식임
            .reverse()
            .map((item) => (
              <Task
                key={item.id}
                item={item}
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))}
        </List>
      </Container>
    </ThemeProvider>
  ) : (
    <AppLoading
      startAsync={_loadTasks} // AppLoading 컴포넌트가 동작되는 동안 실행될 함수
      onFinish={() => setIsReady(true)} // startAsync 가 완료되면 실핼할 함수
      onError={console.error} // startAsync 에서 오류가 발생하면 실행할 함수
    />
  );
};
// ios에서 아이폰 11처럼 노치 디자인이 있는 기기는 컨텐츠가 일부 가려지는 경우가 있다.
// react-native 에서는 자동으로 padding값이 적용되어 노치 디자인 문제를 해결할 수 있는 SafeAreaView 컴포넌트를 제공한다.

// 안드로이드는 status bar 로 인해 컨텐츠가 가려지는 경우가 있다.
// 배경색을 어두운 색으로 설정하면 상태 바의 내용도 눈에 잘 들어오지 않는다는 문제가 있다.
// react-native 에서는 상태 바를 제어할 수 있는 StatusBar 컴포넌트를 제공한다.
// StatusBar 컴포넌트를 이용하면 상태 바의 스타일을 변경할 수 있고, 안드로이드 기기에서 상태 바가 컴포넌트를 가리는 문제를 해결할 수 있다.
const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  align-self: flex-start;
  margin: 0px 20px;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

export default App;
