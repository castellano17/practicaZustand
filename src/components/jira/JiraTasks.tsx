import { IoAddOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { Task, TaskStatus } from "../../interfaces";
import { SingleTask } from "./SingleTask";
import { DragEvent, useState } from "react";
import { useTaskStore } from "../../stores/tasks/task.store";
import classNames from "classnames";
import swall from "sweetalert2";

interface Props {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}

export const JiraTasks = ({ title, status, tasks }: Props) => {
  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddTask = async () => {
    const { isConfirmed, value } = await swall.fire({
      title: "Nueva tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputPlaceholder: "Escribe el nombre de la tarea",
      showCancelButton: true,
      confirmButtonText: "Crear",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debes escribir el nombre de la tarea";
        }
      },
    });

    if (!isConfirmed) return;

    addTask(value, status);
  };

  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  };
  const handleLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleLeave}
      onDrop={handleDrop}
      className={classNames(
        "!text-black border-4 relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",
        {
          "border-blue-500 border-dotted": isDragging,
          "border-green-500 border-dotted": onDragOver && isDragging,
        }
      )}
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button onClick={handleAddTask}>
          <IoAddOutline />
        </button>
      </div>

      {/* {onDragOver && (
        <div
          className={`bg-green-200 text-center py-2 px-4 rounded ${
            onDragOver ? "visible" : "hidden"
          }`}
        >
          Soltar aquí
        </div>
      )} */}
      {/* Task Items */}
      <div className="h-full w-full">
        {tasks.length > 0 ? (
          tasks.map((task) => <SingleTask key={task.id} task={task} />)
        ) : (
          <p>No hay tareas {title.toLowerCase()}</p>
        )}
      </div>
    </div>
  );
};
