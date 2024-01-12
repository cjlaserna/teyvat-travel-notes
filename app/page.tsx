"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ImPlus } from "react-icons/im";
import { FaCheck, FaFolderPlus } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import Task from "./_components/Task";
import TaskModal from "./_components/TaskModal";
import FolderModal from "./_components/FolderModal";
import ToDoList, { Folder, Task as TaskModel } from "./_components/manager";
import LoadingScreen from "./_components/LoadingScreen";
import FolderC from "./Folder";

const Home = () => {
  const [unorganizedTasks, setUnorganizedTasks] = useState<TaskModel[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<TaskModel[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [folderId, setfolderId] = useState<undefined | string>();
  const [folderName, setFolderName] = useState<string>("Unorganized");

  const fetchData = useCallback(async (folderId?: string) => {
    setLoading(true);
    try {
      const manager = new ToDoList();
      const tasks = folderId
        ? manager.getTasksInFolder(folderId)
        : manager.getTasksInFolder();
      const folders = manager.getFolders();
      const folderName = folderId
        ? manager.getFolderName(folderId) || "Unorganized"
        : "Unorganized";
      setFolderName(folderName);
      setUnorganizedTasks(tasks);
      setFolders(folders);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTaskSelection = (task: TaskModel) => {
    if (deleteMode) {
      const isSelected = selectedTasks.some(
        (selectedTask) => selectedTask.id === task.id
      );
      const updatedSelection = isSelected
        ? selectedTasks.filter((selectedTask) => selectedTask.id !== task.id)
        : [...selectedTasks, task];
      setSelectedTasks(updatedSelection);
    }
  };

  const handleDeleteSelectedTasks = async () => {
    const manager = new ToDoList();
    await Promise.all(
      selectedTasks.map((task) => manager.deleteTaskById(task.id))
    );
    const updatedTasks = manager.getTasksInFolder();
    setUnorganizedTasks(updatedTasks);
    setSelectedTasks([]);
    setDeleteMode(false);
    handleFolderSelection(folderId);
  };

  const toggleDeleteMode = () => {
    setDeleteMode((prevDeleteMode) => !prevDeleteMode);
    setSelectedTasks([]);
  };

  const handleFolderSelection = (folderId?: string) => {
    fetchData(folderId);
    setSelectedTasks([]);
    setfolderId(folderId);
  };

  const handleDeleteFolder = async () => {
    if (folderId) {
      const manager = new ToDoList();
      manager.deleteFolder(folderId);
      handleFolderSelection();
    }
  };

  const renderTasks = () => {
    if (unorganizedTasks.length > 0) {
      return unorganizedTasks.map((task, index) => (
        <Task
          key={index}
          name={task.title}
          desc={task.description}
          onSelect={() => handleTaskSelection(task)}
          showCheckbox={deleteMode}
          id={task.id}
          refresh={() => handleFolderSelection(folderId)}
        />
      ));
    } else {
      return (
        <div className="relative flex items-center justify-center">
          <div className="absolute text-center">
            <div>
              <Image
                src="/imgs/half-emblem.png"
                width={500}
                height={500}
                alt="emblem"
              />
              <p>You have no tasks.</p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="card rounded-md w-full max-w-screen-lg min-h-96 bg-neutral md:bg-transparent mt-5 mx-5 book overflow-clip">
        <h1 className="text-lg title text-accent"> Teyvat Travel Notes</h1>

        {loading ? (
          <div className="relative flex items-center justify-center">
            <div className="absolute text-center">
              <div>
                <Image
                  src="/imgs/half-emblem.png"
                  width={500}
                  height={500}
                  alt="emblem"
                />
                <LoadingScreen />
              </div>
            </div>
          </div>
        ) : (
          <div className="card-body overflow-auto overflow-x-clip">
            {renderTasks()}
          </div>
        )}

        <div className="px-6 py-2 w-full">
          {/* Folder Name */}
          <p className="float-left">
            {folderName !== "Unorganized" && (
              <>
                <button
                  className="btn-warning btn btn-xs btn-circle mr-2 mt-2"
                  onClick={handleDeleteFolder}
                >
                  <IoTrash />
                </button>
                {folderName}
              </>
            )}
            {folderName === "Unorganized" && folderName}
          </p>

          <div className="float-right flex gap-x-2">
            <label
              htmlFor="task_modal"
              className="btn btn-sm btn-circle btn-accent"
            >
              <ImPlus />
            </label>
            <label
              htmlFor="folder_modal"
              className="btn btn-sm btn-circle btn-accent"
            >
              <FaFolderPlus />
            </label>
            <button
              className={`btn btn-sm btn-circle btn-accent ${
                deleteMode ? "btn-danger" : ""
              }`}
              onClick={toggleDeleteMode}
            >
              <IoTrash />
            </button>
            {deleteMode && (
              <button
                className="btn btn-sm btn-circle btn-accent"
                onClick={handleDeleteSelectedTasks}
              >
                <FaCheck />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Folders */}
      <div className="flex flex-row gap-x-3 max-w-screen-lg w-full items-start justify-start ml-[150px]">
        <div
          className="tag hover:cursor-pointer hover:contrast-125"
          onClick={() => handleFolderSelection()}
        >
          <Image
            src="/imgs/uoicon.png"
            width={50}
            height={50}
            alt="unorganized"
          />
        </div>
        {folders.map((folder) => (
          <FolderC
            key={folder.id}
            folder={folder}
            handleFolderSelection={handleFolderSelection}
          />
        ))}
      </div>

      <h3 className="text-sm">All changes are saved locally</h3>

      <TaskModal afterAddTaskCallback={() => handleFolderSelection(folderId)} />
      <FolderModal
        afterAddFolderCallback={() => handleFolderSelection(folderId)}
      />
    </>
  );
};

export default Home;
