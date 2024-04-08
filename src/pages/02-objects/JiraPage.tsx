import { JiraTasks } from "../../components";
import { useTaskStore } from "../../stores";

export const JiraPage = () => {
  const pendingTasks = useTaskStore((state) => state.getTaskByStatus("Open"));
  const inProgressTasks = useTaskStore((state) =>
    state.getTaskByStatus("In-progress")
  );
  const doneTasks = useTaskStore((state) => state.getTaskByStatus("Done"));

  // console.log({
  //   pendingTasks,
  //   inProgressTasks,
  //   doneTasks,
  // });

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title="Pendientes" tasks={pendingTasks} value="Open" />

        <JiraTasks
          title="En Progreso"
          tasks={inProgressTasks}
          value="In-progress"
        />

        <JiraTasks title="Terminadas" tasks={doneTasks} value="Done" />
      </div>
    </>
  );
};
