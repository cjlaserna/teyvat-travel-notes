import React from "react";
import localFont from "next/font/local";
import ToDoList from "./manager";

const tahoma = localFont({ src: "../assets/tahoma.ttf" });

interface TaskProps {
  id: string;
  name: string;
  desc: string;
  onSelect?: () => void;
  showCheckbox: boolean;
  refresh: () => void;
}

const Task: React.FC<TaskProps> = ({
  id,
  name,
  desc,
  onSelect,
  showCheckbox,
  refresh,
}) => {
  const handleMarkButtonClick = () => {
    // Perform any necessary logic here
    handleDeleteButtonClick();
    refresh();
  };

  const handleDeleteButtonClick = () => {
    const manager = new ToDoList();
    manager.deleteTaskById(id);
  };

  const renderCheckbox = () => (
    <label className="swap" onChange={onSelect}>
      <input type="checkbox" />
      <div className="btn btn-sm btn-warning rounded-full text-sm font-light swap-off">
        Delete
      </div>
      <div className="btn btn-sm btn-success rounded-full text-sm font-light swap-on">
        Selected
      </div>
    </label>
  );

  return (
    <div
      className={`task flex w-full min-h-20 p-5 justify-between items-center justify-center bg-[#fdf8ef] rounded-sm`}
    >
      <div className="flex items-center h-full">
        <div className="flex flex-col">
          <h3 className={`text-md`}>{name}</h3>
          <p className={`text-sm ${tahoma.className}`}>{desc}</p>
        </div>
      </div>

      <div className="flex items-center h-full">
        {showCheckbox ? (
          renderCheckbox()
        ) : (
          <label
            className="btn btn-sm btn-warning rounded-full text-sm font-light"
            onClick={handleMarkButtonClick}
          >
            Mark
          </label>
        )}
      </div>
    </div>
  );
};

export default Task;
