import { Badge, Checkbox, ListItem, UnorderedList } from "@chakra-ui/react";
import React from "react";
import { Task } from "..";

type Props = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  filteredTasks: Task[];
};

export const TaskList: React.FC<Props> = ({
  tasks,
  setTasks,
  filteredTasks,
}) => {
  // Taskの状態を切り替える
  const handleCheckBox = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    // ミュータブル・イミュータブルの話？
    // indexでtasks[index]とかしてしまうと直接書き換えしてしまう
    const newTasks = tasks.map((task, _i) => {
      return _i === i ? { ...task, isDone: e.target.checked } : task;
    });
    setTasks(newTasks);
  };

  return (
    <div>
      <h1>category search</h1>
      <UnorderedList>
        {filteredTasks.map((task, index) => (
          <ListItem key={`todo-${index}`}>
            <Checkbox
              isChecked={task.isDone}
              onChange={(e) => handleCheckBox(e, index)}
            >
              {task.isDone ? <s>{task.label}</s> : task.label}
            </Checkbox>
            <Badge>{task.category}</Badge>
          </ListItem>
        ))}
      </UnorderedList>
      <h1>All</h1>
      <UnorderedList>
        {tasks.map((task, index) => (
          <ListItem key={`todo-${index}`}>
            <Checkbox
              isChecked={task.isDone}
              onChange={(e) => handleCheckBox(e, index)}
            >
              {task.isDone ? <s>{task.label}</s> : task.label}
            </Checkbox>
            <Badge>{task.category}</Badge>
          </ListItem>
        ))}
      </UnorderedList>
    </div>
  );
};
