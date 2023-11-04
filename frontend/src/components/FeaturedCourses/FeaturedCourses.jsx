import { useGetCoursesQuery } from "../../features/course/courseApi";
import FeaturedCourseItem from "./FeaturedCourseItem";

const FeaturedCourses = () => {
  const { data: courses, isLoading, isError } = useGetCoursesQuery();

  // decide what to render
  let content;

  if (isLoading) content = <span>Loading...</span>;

  if (!isLoading && isError) content = <span>Server Error Occurred!!</span>;

  if (!isLoading && !isError && courses?.length === 0)
    content = <span>No Course Available at this Moment!!</span>;

  if (!isLoading && !isError && courses?.length > 0) {
    content = courses?.map((course) => (
      <FeaturedCourseItem key={course._id} course={course} />
    ));
  }
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">{content}</div>
  );
};

export default FeaturedCourses;
