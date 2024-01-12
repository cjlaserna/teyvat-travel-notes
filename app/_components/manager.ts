// Define interfaces for Task and Folder
export interface Task {
  id: string;
  title: string;
  description: string;
  folderId?: string; // Making folderId optional
}

export interface Folder {
  id: string;
  name: string;
  iconUrl: string;
}

// Define the main ToDoList class
export default class ToDoList {
  private tasks: Task[] = [];
  private folders: Folder[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    try {
      const storedTasks = localStorage.getItem("tasks");
      const storedFolders = localStorage.getItem("folders");

      if (storedTasks) {
        this.tasks = JSON.parse(storedTasks);
      }

      if (storedFolders) {
        this.folders = JSON.parse(storedFolders);
      }
    } catch (error) {
      console.error("Error loading data from local storage:", error);
    }
  }

  // Add task to the to-do list
  addTask(title: string, description: string, folderId?: string): void {
    const task: Task = {
      id: this.generateUniqueId(),
      title,
      description,
      folderId,
    };
    this.tasks.push(task);
    this.saveToLocalStorage();
  }

  // Delete task from the to-do list by index
  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    this.saveToLocalStorage();
  }

  // Delete task from the to-do list by ID
  deleteTaskById(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveToLocalStorage();
  }

  // Add folder to the to-do list
  addFolder(name: string, iconUrl: string): void {
    const folder: Folder = { id: this.generateUniqueId(), name, iconUrl };
    this.folders.push(folder);
    this.saveToLocalStorage();
  }

  // Delete folder from the to-do list
  deleteFolder(folderId: string): void {
    // Delete tasks associated with the folder
    this.tasks = this.tasks.filter((task) => task.folderId !== folderId);

    // Delete the folder
    this.folders = this.folders.filter((folder) => folder.id !== folderId);

    this.saveToLocalStorage();
  }

  // Get all tasks in a specific folder
  getTasksInFolder(folderId?: string): Task[] {
    if (folderId === undefined) {
      // Return tasks without a specified folder
      return this.tasks.filter(
        (task) => task.folderId === undefined || task.folderId === null
      );
    } else {
      // Return tasks in the specified folder
      return this.tasks.filter((task) => task.folderId === folderId);
    }
  }

  // Get all folders
  getFolders(): Folder[] {
    return this.folders;
  }

  getFolderName(folderId: string): string | undefined {
    const folder = this.folders.find((folder) => folder.id === folderId);
    return folder ? folder.name : undefined;
  }

  // Save the current state to local storage
  private saveToLocalStorage(): void {
    try {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
      localStorage.setItem("folders", JSON.stringify(this.folders));
    } catch (error) {
      console.error("Error saving data to local storage:", error);
    }
  }

  // Generate a unique ID for tasks and folders
  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
