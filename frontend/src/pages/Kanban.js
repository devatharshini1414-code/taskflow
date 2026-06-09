import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProjects } from "../api/project";
import { getTasks, updateTaskStatus } from "../api/task";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import "../App.css";

function Kanban() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadTasks = async (projectId) => {
    setSelectedProject(projectId);

    try {
      const res = await getTasks(projectId);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filterTasks = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    try {
      await updateTaskStatus(
        draggableId,
        destination.droppableId
      );

      loadTasks(selectedProject);
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    {
      id: "todo",
      title: "🟡 To Do",
    },
    {
      id: "inprogress",
      title: "🔵 In Progress",
    },
    {
      id: "done",
      title: "🟢 Done",
    },
  ];

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>Kanban Board</h2>

        <div style={{ marginBottom: "20px" }}>
          <select
            value={selectedProject}
            onChange={(e) =>
              loadTasks(e.target.value)
            }
            style={{
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <option value="">
              Select Project
            </option>

            {projects.map((project) => (
              <option
                key={project._id}
                value={project._id}
              >
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <DragDropContext
          onDragEnd={onDragEnd}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "flex-start",
            }}
          >
            {columns.map((column) => (
              <Droppable
                droppableId={column.id}
                key={column.id}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="kanban-column"
                  >
                    <h3>{column.title}</h3>

                    {filterTasks(
                      column.id
                    ).map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={
                          task._id
                        }
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={
                              provided.innerRef
                            }
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="kanban-card"
                          >
                            <h4>
                              {task.title}
                            </h4>

                            <p>
                              {
                                task.description
                              }
                            </p>

                            <small>
                              Deadline:{" "}
                              {
                                task.deadline
                              }
                            </small>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {
                      provided.placeholder
                    }
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Kanban;