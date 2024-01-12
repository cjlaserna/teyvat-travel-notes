import React, { useCallback, useEffect, useState } from "react";
import { IoFolderOpenOutline } from "react-icons/io5";
import ToDoList, { Folder } from "./manager";
import localFont from "next/font/local";

const tahoma = localFont({ src: "../assets/tahoma.ttf" });

interface TaskModalProps {
  afterAddTaskCallback?: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ afterAddTaskCallback }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("Unorganized");
  const [folders, setFolders] = useState<Folder[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = useCallback(() => {
    if (!taskTitle) {
      setError("Task title cannot be empty");
      return;
    }
    const manager = new ToDoList();
    const folder =
      selectedFolder === "Unorganized" ? undefined : selectedFolder;

    manager.addTask(taskTitle, taskDescription, folder);
    // Reset form inputs after adding the task
    setTaskTitle("");
    setTaskDescription("");
    setError("");

    // Call the callback function if provided
    if (afterAddTaskCallback && typeof afterAddTaskCallback === "function") {
      afterAddTaskCallback();
    }
  }, [taskTitle, taskDescription, selectedFolder, afterAddTaskCallback]);

  const isFilled = useEffect(() => {
    const manager = new ToDoList();
    const folders = manager.getFolders();
    setFolders(folders);
  }, [handleAddTask]);

  return (
    <>
      <input type="checkbox" id="task_modal" className="modal-toggle" />
      <div
        className="modal rounded-none shadow-none bg-transparent p-0 m-0"
        role="dialog"
      >
        <div className="modal-box rounded-sm p-0 m-0 shadow-none taskModal bg-transparent overflow-clip p-[20px] ">
          <div className="bg-neutral h-full w-full p-5 flex flex-col gap-y-3">
            <h3 className="text-center text-lg"> Create a task </h3>
            <input
              type="text"
              placeholder="Kill Timmie's Birds"
              className="input input-bordered h-15 text-md"
              autoComplete="off"
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
                setError(""); // Clear the error when task title changes
              }}
              required
            />
            <textarea
              className={`textarea textarea-bordered resize-none text-sm font-light ${tahoma.className}`}
              placeholder="They must die.. for my sweet madames.."
              maxLength={80}
              rows={3}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            ></textarea>

            <div className="flex flex-row items-center justify-start w-full gap-x-5">
              <IoFolderOpenOutline />
              <p>Add to Folder</p>
            </div>
            <select
              className="select select-bordered w-full"
              defaultValue={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
            >
              <option value={undefined}>Unorganized</option>
              {/* Add other folders dynamically */}
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
            {error ? (
              <div role="alert" className="alert alert-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            ) : (
              ""
            )}
            <div className="modal-action flex justify-self-end h-full p-0 m-0">
              <label
                htmlFor={error ? "" : "task_modal"}
                className="btn btn-accent font-light btn-sm"
              >
                Cancel
              </label>
              <label
                htmlFor={error ? "" : "task_modal"}
                className="btn btn-warning font-light btn-sm"
                onClick={handleAddTask}
              >
                Add
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
