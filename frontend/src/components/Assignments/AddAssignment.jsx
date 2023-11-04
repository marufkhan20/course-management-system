import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useCreateAssignmentMutation } from "../../features/assignment/assignmentApi";
import {
  useGetCoursesQuery,
  useGetEnrollStudentsByCourseIdQuery,
} from "../../features/course/courseApi";
import Button from "../ui/Button";

const AddAssignment = ({ setState }) => {
  const editorRef = useRef(null);
  const [name, setName] = useState();
  const [course, setCourse] = useState();
  const [number, setNumber] = useState();
  const [deadline, setDeadline] = useState();
  const [student, setStudent] = useState();
  const [hints, setHints] = useState();
  const [getStudents, setGetStudents] = useState(false);
  const [error, setError] = useState({});

  // get all courses
  const { data: courses, isLoading, isError } = useGetCoursesQuery();

  // get all students
  const { data: students } = useGetEnrollStudentsByCourseIdQuery(course, {
    skip: !getStudents,
  });

  const getAllStudents = (courseId) => {
    setCourse(courseId);
    setGetStudents(true);
  };

  // create assignment
  const [createAssignment, { data: assignment }] =
    useCreateAssignmentMutation();

  // decide what to render
  let content;

  if (isLoading) content = <option>Loading...</option>;

  if (!isLoading && isError) content = <option>Server Error Occurred!!</option>;

  if (!isLoading && !isError && courses?.length === 0)
    content = <option value="ksjfdsf0255fd">No Course Found!!</option>;

  if (!isLoading && !isError && courses?.length > 0)
    content = courses?.map((course) => (
      <option key={course._id} value={course._id}>
        {course.title}
      </option>
    ));

  useEffect(() => {
    if (assignment?._id) {
      toast.success("Assignment Created Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setError({});
      setState("show");
    }
  }, [assignment, setState]);

  // check validation
  const checkValidation = () => {
    const validationError = {};

    if (!name) {
      validationError.name = "Assignment Name is Required!!";
    }

    if (!course) {
      validationError.course = "Please Select Course!!";
    }

    if (!number) {
      validationError.number = "Assignment Number is Required!!";
    }

    if (!deadline) {
      validationError.deadline = "Assignment Deadline is Required!!";
    }

    if (!student) {
      validationError.student = "Please Select Student!!";
    }

    if (!editorRef.current.getContent()) {
      validationError.brief = "Assignment Brief is Required!!";
    }

    return validationError;
  };

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    // validation
    const validationError = checkValidation();

    if (Object.keys(validationError).length > 0) {
      return setError(validationError);
    }

    createAssignment({
      name,
      course,
      number,
      deadline,
      student,
      hints,
      brief: editorRef.current.getContent(),
    });
  };
  return (
    <div className="mt-12 p-5 border bg-white rounded-lg">
      <form onSubmit={submitHandler}>
        <div className="mb-5">
          <div>
            <label
              className="font-semibold block mb-2 text-content text-sm"
              htmlFor="name"
            >
              Assignment Name
            </label>
            <input
              className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
              type="text"
              id="name"
              placeholder="Enter your assignment name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {error?.name && (
            <div className="mt-3 text-xs text-red-400">
              <span>{error?.name}</span>
            </div>
          )}
        </div>
        <div className="mb-5">
          <div>
            <label
              className="font-semibold block mb-2 text-content text-sm"
              htmlFor="course"
            >
              Select Course
            </label>
            <select
              id="course"
              className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
              onChange={(e) => getAllStudents(e.target.value)}
            >
              <option>Select Course</option>
              {content}
            </select>
          </div>
          {error?.course && (
            <div className="mt-3 text-xs text-red-400">
              <span>{error?.course}</span>
            </div>
          )}
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          <div>
            <div>
              <label
                className="font-semibold block mb-2 text-content text-sm"
                htmlFor="number"
              >
                Assignment Number
              </label>
              <input
                className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                type="number"
                id="number"
                placeholder="Enter assignment number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            {error?.number && (
              <div className="mt-3 text-xs text-red-400">
                <span>{error?.number}</span>
              </div>
            )}
          </div>
          <div>
            <div>
              <label
                className="font-semibold block mb-2 text-content text-sm"
                htmlFor="date"
              >
                Due Date
              </label>
              <input
                className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                type="date"
                id="date"
                placeholder="Enter assignment submitted last date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            {error?.deadline && (
              <div className="mt-3 text-xs text-red-400">
                <span>{error?.deadline}</span>
              </div>
            )}
          </div>
        </div>
        <div className="my-5">
          <div>
            <label
              className="font-semibold block mb-2 text-content text-sm"
              htmlFor="student"
            >
              Select Student
            </label>
            <select
              id="student"
              className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
              onChange={(e) => setStudent(e.target.value)}
            >
              <option>Select Student</option>
              <option value="all-student">All Student</option>
              {students?.map((student) => {
                console.log("student", student);
                const { _id, profileId: profile, userId } = student || {};
                const { firstName, lastName } = profile || {};
                return (
                  <option
                    key={_id}
                    value={userId}
                  >{`${firstName} ${lastName}`}</option>
                );
              })}
            </select>
          </div>
          {error?.student && (
            <div className="mt-3 text-xs text-red-400">
              <span>{error?.student}</span>
            </div>
          )}
        </div>
        <div className="mb-5">
          <div>
            <label
              className="font-semibold block mb-2 text-content text-sm"
              htmlFor="hints"
            >
              Assignment Hints/Resources
            </label>
            <textarea
              className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600 h-32"
              type="text"
              id="hints"
              placeholder="Describe assignment hints/resources"
              value={hints}
              onChange={(e) => setHints(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5">
          <div>
            <label
              className="font-semibold block mb-2 text-content text-sm"
              htmlFor="brief"
            >
              Assignment Brief
            </label>
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
          {error?.brief && (
            <div className="mt-3 text-xs text-red-400">
              <span>{error?.brief}</span>
            </div>
          )}
        </div>
        <div className="mt-5">
          <Button type="submit-hover">Create Assignment</Button>
        </div>
      </form>
    </div>
  );
};

export default AddAssignment;
