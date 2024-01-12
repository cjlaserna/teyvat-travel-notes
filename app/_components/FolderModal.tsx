import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import ToDoList from "./manager";
import { Image as ImageModel, fetchImages } from "./icons";
import Image from "next/image";

const FolderModal = ({
  afterAddFolderCallback,
}: {
  afterAddFolderCallback?: () => void;
}) => {
  const [folderName, setFolderName] = useState("");
  const [selectedIconType, setSelectedIconType] = useState<string | undefined>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBar, setSearchBar] = useState("");
  const [imageOptions, setImageOptions] = useState<ImageModel[]>([]);
  const [iconUrl, setIconUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddFolder = () => {
    if (!folderName) {
      setError("Folder name cannot be empty");
      return;
    }

    const manager = new ToDoList();
    const url = isStringInImageOptions(searchQuery) ? iconUrl : "";

    manager.addFolder(folderName, url);
    resetForm();
    if (afterAddFolderCallback) {
      afterAddFolderCallback();
    }
  };

  const handleIconTypeChange = async (iconType: string) => {
    setSelectedIconType(iconType);
    setIsLoading(true); // Set loading to true when fetching images
    try {
      const images = await fetchImages(iconType);
      setImageOptions(images);
      setIsLoading(false); // Set loading to false when images are fetched
    } catch (error) {
      setIsLoading(false); // Set loading to false in case of an error
      console.log("Error while icon type changed.");
    }
  };
  const handleCancel = () => {
    resetForm();
  };
  const handleImageOptionSelect = (imgPath: string) => {
    const selectedImage = imageOptions.find((image) => image.path === imgPath);
    if (selectedImage) {
      setSearchQuery(selectedImage.name);
      setIconUrl(imgPath);
    }
  };

  const isStringInImageOptions = (query: string): boolean => {
    return imageOptions.some((image) =>
      image.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const resetForm = () => {
    setFolderName("");
    setSelectedIconType(undefined);
    setSearchQuery("");
    setIconUrl("");
    setImageOptions([]);
    setError("");
  };

  return (
    <>
      <input type="checkbox" id="folder_modal" className="modal-toggle" />
      <div
        className="modal rounded-none shadow-none bg-transparent p-0 m-0"
        role="dialog"
      >
        <div className="modal-box rounded-sm p-0 m-0 shadow-none taskModal bg-transparent overflow-clip p-[20px] ">
          <div className="bg-neutral h-full w-full p-5 flex flex-col gap-y-3">
            <h3 className="text-center text-lg"> Create a folder </h3>
            <input
              type="text"
              placeholder="Folder Name"
              className={`input input-bordered h-15 text-md ${
                error ? "border-error" : ""
              }`}
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
                setError(""); // Clear the error when folder name changes
              }}
            />

            <select
              className="select select-bordered w-full"
              value={selectedIconType || ""}
              onChange={(e) => handleIconTypeChange(e.target.value)}
              required
            >
              <option value="" disabled>
                Icon Type
              </option>
              <option value="character-icons">Character Icons</option>
              <option value="emotes">Emotes</option>
              <option value="items">Items</option>
              <option value="elements">Elements</option>
              <option value="artifacts">Artifacts</option>
              <option value="weapon-icons">Weapon Icons</option>
              <option value="food">Food</option>
            </select>
            <div className="flex flex-row items-center justify-start w-full gap-x-5">
              <IoSearchOutline />
              <p>Search for an Icon</p>
            </div>
            <input
              type="text"
              placeholder={
                !selectedIconType || isLoading
                  ? "Select an Icon Type.."
                  : "Search for Icons.."
              }
              className={`input input-bordered text-sm `}
              onChange={(e) => handleImageOptionSelect(e.target.value)}
              list="images"
              disabled={!selectedIconType || isLoading} // Disable the input if icon type isn't selected or if loading
            />
            {selectedIconType &&
              (isLoading ? (
                <p>Loading image options...</p>
              ) : (
                <>
                  {imageOptions.length > 0 && (
                    <datalist id="images">
                      <option value="" disabled>
                        Select an Image
                      </option>
                      {imageOptions.map((image) => (
                        <option key={image.name} value={image.path}>
                          {image.name}
                        </option>
                      ))}
                    </datalist>
                  )}
                  <p>Icon Preview</p>
                  {isStringInImageOptions(searchQuery) && (
                    <Image
                      src={iconUrl}
                      width={100}
                      height={100}
                      alt={iconUrl}
                    />
                  )}
                </>
              ))}

            {error && (
              <div role="alert" className="alert alert-error">
                {error}
              </div>
            )}
            <div className="modal-action flex justify-self-end h-full p-0 m-0">
              <label
                htmlFor={error ? "" : "folder_modal"}
                className="btn btn-accent font-light btn-sm"
                onClick={() => {
                  if (!error) {
                    resetForm();
                  }
                }}
              >
                Cancel
              </label>
              <label
                htmlFor={error ? "" : "folder_modal"}
                className="btn btn-warning font-light btn-sm"
                onClick={handleAddFolder}
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

export default FolderModal;
