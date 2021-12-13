import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";
import { request } from "./server";
import { ChakraProvider } from "@chakra-ui/react";

// TODOタスクの型
export type Task = {
  label: string;
  isDone: boolean;
  category: string;
};

const App: React.VFC = () => {
  // タスクリストを格納する
  const [tasks, setTasks] = useState<Task[]>([]);

  // 追加前のタスクを格納する
  // この状態ではlabelのみの管理
  const [newTaskLabel, setNewTaskLabel] = useState<string>("");

  // 追加前のカテゴリを登録する
  const [newTaskCategory, setNewTaskCategory] = useState<string>("");

  // ページマウント時にモックAPIからデータを取得
  useEffect(() => {
    request.fetchTasks((payload: Task[]) => {
      setTasks(payload);
      setFilteredTask(tasks);
    });
  }, []);

  // フィルターされたタスクを格納する
  const [filteredTasks, setFilteredTask] = useState<Task[]>([]);

  // カテゴリでフィルタ
  const handleFilterValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredTask(tasks.filter((task) => task.category === e.target.value));
  };

  return (
    <ChakraProvider>
      {/* ヘッダー */}
      <h1>Tutorial Works</h1>
      <h2>React Todo List</h2>
      <input
        onChange={(e) => handleFilterValue(e)}
        type="text"
        placeholder="filter category"
      />

      {/* 一覧表示 */}
      <TaskList {...{ tasks, setTasks, filteredTasks }} />

      {/* タスク追加、削除 */}
      <TaskForm
        {...{
          tasks,
          setTasks,
          newTaskLabel,
          setNewTaskLabel,
          newTaskCategory,
          setNewTaskCategory,
        }}
      />
    </ChakraProvider>
  );
};

ReactDOM.render(<App />, document.querySelector("#app"));
