import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProfileLayout from "../components/Layout/ProfileLayout";
import Sidebar from "../components/Sidebar";
import Button from "../components/ui/Button";
import { useGetEnrollCoursesByStudentIdQuery } from "../features/course/courseApi";
import { useCreateReviewMutation } from "../features/review/reviewApi";

const Review = () => {
  const editorRef = useRef(null);
  const [profession, setProfession] = useState();
  const [course, setCourse] = useState();
  const [error, setError] = useState({});

  // get role
  const { user } = useSelector((state) => state.auth);
  const { role, userid: userId } = user || {};

  // get enroll course
  const {
    data: enrollCourses,
    isError,
    isLoading,
  } = useGetEnrollCoursesByStudentIdQuery(userId);

  // create new review
  const [createReview, { data: newCreatedReview, error: reviewError }] =
    useCreateReviewMutation();

  useEffect(() => {
    if (reviewError?.data) {
      console.log(reviewError?.data?.error);
    }

    if (newCreatedReview?._id) {
      toast.success(
        "Review Submitted Successfully! You can see homepage review section.",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      setError({});
      setProfession("");
    }
  }, [newCreatedReview, reviewError]);

  // decide what to render
  let content;

  if (isLoading) content = <span>Loading...</span>;

  if (!isLoading && isError) content = <span>Server Error Occcurred!!</span>;

  if (!isLoading && !isError && enrollCourses?.length > 0)
    content = enrollCourses?.map((course) => {
      const { courseId } = course || {};
      const { _id, title } = courseId || {};

      return <option value={_id}>{title}</option>;
    });

  // error validation
  const checkValidation = () => {
    const validationError = {};

    if (role === "user" && !profession) {
      validationError.profession = "Profession is Required!!";
    }

    if (role === "admin" || (role === "student" && !course)) {
      validationError.course = "Please Select Course!!";
    }

    if (!editorRef.current.getContent()) {
      validationError.review = "Review is Required!!";
    }

    return validationError;
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    const validationError = checkValidation();

    if (Object.keys(validationError)?.length > 0) {
      return setError(validationError);
    }

    createReview({
      id: userId,
      courseId: course,
      profession,
      review: editorRef.current.getContent(),
    });
  };
  return (
    <ProfileLayout notDefault>
      <div className="flex items-start sm:flex-row flex-col gap-8">
        <Sidebar />
        <div className="md:w-4/5 sm:w-3/5 w-full">
          <div className="p-5 border-b bg-white rounded-lg border">
            <h3 className="font-semibold text-lg mb-3">Review</h3>
            <p className="text-content text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              mollitia, molestiae quas vel sint commodi repudiandae consequuntur
              voluptatum laborum
            </p>
          </div>

          <div className="mt-12 p-5 border bg-white rounded-lg">
            <form onSubmit={handleSubmit}>
              {role === "student" || role === "admin" ? (
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
                      onChange={(e) => setCourse(e.target.value)}
                    >
                      <option value="">Select Course</option>
                      {content}
                    </select>
                  </div>
                  {error?.course && (
                    <div className="mt-3 text-xs text-red-400">
                      <span>{error?.course}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-5">
                  <div>
                    <label
                      className="font-semibold block mb-2 text-content text-sm"
                      htmlFor="name"
                    >
                      Your Profession
                    </label>
                    <input
                      className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                      type="text"
                      id="name"
                      placeholder="Enter your company name or profession"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                    />
                  </div>
                  {error?.profession && (
                    <div className="mt-3 text-xs text-red-400">
                      <span>{error?.name}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-5">
                <div>
                  <label
                    className="font-semibold block mb-2 text-content text-sm"
                    htmlFor="brief"
                  >
                    Your Review
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
                {error?.review && (
                  <div className="mt-3 text-xs text-red-400">
                    <span>{error?.review}</span>
                  </div>
                )}
              </div>
              <div className="mt-5">
                <Button type="submit-hover">Create Assignment</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Review;
