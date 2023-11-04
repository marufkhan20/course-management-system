import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addCourseInfo } from "../../features/course/courseSlice";

const Information = ({ onStage, setOnStage }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [error, setError] = useState({});
  const editorRef = useRef(null);
  const dispatch = useDispatch();

  const checkValidation = () => {
    const validationError = {};

    // validation
    if (!title) {
      validationError.title = "Title is Required!!";
    }

    if (!category) {
      validationError.category = "Category is Required!!";
    }

    if (!level) {
      validationError.level = "Level is Required!!";
    }

    if (!editorRef.current.getContent()) {
      validationError.description = "Description is Required!!";
    }

    return validationError;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    // form validation
    const validationError = checkValidation();

    if (Object.keys(validationError).length > 0) {
      return setError(validationError);
    }

    dispatch(
      addCourseInfo({
        title,
        category,
        level,
        description: editorRef.current.getContent(),
      })
    );

    setOnStage((prevState) => prevState + 1);
  };

  return (
    <div>
      <div className="py-6 px-8 border-b">
        <h2 className="font-semibold text-lg text-primary">
          Basic Information
        </h2>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-y-5">
          <div>
            <label className="block mb-2 text-content text-sm" htmlFor="title">
              Course Title
            </label>
            <input
              className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
              type="text"
              id="title"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {error?.title && (
            <div className="text-xs text-red-400">
              <span>{error?.title}</span>
            </div>
          )}
          <div>
            <label
              className="block mb-2 text-content text-sm"
              htmlFor="category"
            >
              Courses Category
            </label>
            <select
              name="category"
              id="category"
              className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select Category</option>
              <option value="web design">Web Design</option>
              <option value="programming">Programming</option>
              <option value="graphic design">Graphic Design</option>
            </select>
          </div>
          {error?.category && (
            <div className="text-xs text-red-400">
              <span>{error?.category}</span>
            </div>
          )}
          <div>
            <label className="block mb-2 text-content text-sm" htmlFor="level">
              Courses Level
            </label>
            <select
              name="level"
              id="level"
              className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
              onChange={(e) => setLevel(e.target.value)}
            >
              <option>Select Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          {error?.level && (
            <div className="text-xs text-red-400">
              <span>{error?.level}</span>
            </div>
          )}
          <div>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>
          {error?.description && (
            <div className="text-xs text-red-400">
              <span>{error?.description}</span>
            </div>
          )}
        </form>
      </div>
      {onStage !== 4 && (
        <div className="p-8 flex flex-wrap gap-2 items-center justify-between">
          <button
            className={`block py-2 px-12 border border-transparent rounded text-sm font-medium hover:text-black hover:bg-transparent transition-all bg-black text-white hover:border-black`}
            disabled={onStage === 1}
            onClick={() => setOnStage((prevState) => prevState - 1)}
          >
            Back
          </button>
          <button
            className={`block py-2 px-12 border border-transparent rounded text-sm font-medium hover:text-[#1d9cfd] hover:bg-transparent transition-all bg-[#1d9cfd] text-white hover:border-[#1d9cfd]`}
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default Information;
