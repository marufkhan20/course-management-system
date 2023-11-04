import React from "react";
import ProfileLayout from "../components/Layout/ProfileLayout";
import Sidebar from "../components/Sidebar";
import StudentsList from "../components/Students/StudentsList";

const Students = () => {
  return (
    <ProfileLayout notDefault>
      <div className="flex items-start sm:flex-row flex-col gap-8">
        <Sidebar />
        <div className="md:w-4/5 sm:w-3/5 w-full">
          <div className="p-5 border-b bg-white rounded-lg border">
            <h3 className="font-semibold text-lg mb-3">Students</h3>
            <p className="text-content text-sm">
              Meet people taking your course.
            </p>
            <div className="mt-4">
              <input
                className="block w-full border rounded py-2 px-4 text-sm outline-none"
                type="text"
                required
                placeholder="Search Student..."
              />
            </div>
          </div>
          <div className="mt-6">
            <StudentsList />
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Students;
