import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProfileLayout from "../components/Layout/ProfileLayout";
import Button from "../components/ui/Button";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../features/profile/profileApi";

const Profile = () => {
  const { user } = useSelector((state) => state.auth) || {};
  const { data: profile } = useGetProfileQuery(user?.userid);

  const [profileImage, setProfileImage] = useState(profile?.profileImage);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [education, setEducation] = useState("");
  const [id, setId] = useState("");
  const [resume, setResume] = useState("");
  const [error, setError] = useState({});

  // update profile state
  useEffect(() => {
    if (profile?._id) {
      if (profile?.profileImage) {
        setProfileImage(
          `${process.env.REACT_APP_API_BASE_URL}${profile?.profileImage}`
        );
      }
      setFirstName(profile?.firstName);
      setLastName(profile?.lastName);
      setBirthday(profile?.birthday);
      setCountry(profile?.country);
      setAddress1(profile?.address1);
      setAddress2(profile?.address2);
      setCity(profile?.city);
      setZipCode(profile?.zipCode);
      setEducation(profile?.education);
    }
  }, [profile]);

  const [
    updateProfile,
    { data: updatedProfile, isError, error: responseError },
  ] = useUpdateProfileMutation();

  // capture profile image funciton
  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
  };

  // capture profile image funciton
  const captureIdImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setId(reader.result);
    };
  };

  // capture profile image funciton
  const captureResumeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setResume(reader.result);
    };
  };

  useEffect(() => {
    if (isError) {
      toast.error(responseError, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }

    if (updatedProfile?._id) {
      toast.success("Profile Update Successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setError({});
    }
  }, [updatedProfile, isError, responseError]);

  // handle profile pic update
  const handleProfilePicUpdate = () => {
    if (profileImage) {
      updateProfile({
        data: {
          profileImage,
        },
        userId: user?.userid,
      });
    }
  };

  // check validation
  const checkValidation = () => {
    const validationError = {};

    if (!firstName) {
      validationError.firstName = "First Name is Required!";
    }

    if (!lastName) {
      validationError.lastName = "Last Name is Required!";
    }

    if (!birthday) {
      validationError.birthday = "Birthday is Required!";
    }

    if (!country) {
      validationError.country = "Country Name is Required!";
    }

    if (!address1) {
      validationError.address = "Address is Required!";
    }

    if (!city) {
      validationError.city = "City Name is Required!";
    }

    if (!zipCode) {
      validationError.zipCode = "ZipCode is Required!";
    }

    return validationError;
  };

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    // data validation
    const validationError = checkValidation();
    if (Object.keys(validationError).length > 0) {
      return setError(validationError);
    }

    updateProfile({
      data: {
        firstName,
        lastName,
        birthday,
        country,
        address1,
        address2,
        city,
        zipCode,
        education,
        id,
        resume,
      },
      userId: user?.userid,
    });
  };
  return (
    <ProfileLayout
      title="Profile Details"
      description="You have full control to manage your own account setting."
    >
      <div className="p-5 border-b">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                className="w-20 h-20 rounded-full"
                src={profileImage || "/images/user.jpg"}
                alt="user"
              />
              <div>
                <label
                  className="absolute bottom-2 right-3 cursor-pointer p-[6px] rounded-full bg-gray-600/75 inline-block"
                  htmlFor="profileImage"
                >
                  <FaPen className="text-primary text-sm" />
                </label>
                <input
                  id="profileImage"
                  className="hidden"
                  type="file"
                  onChange={captureImage}
                />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Md Maruf</h4>
              <span className="text-content text-xs">
                PNG or JPG no bigger than 800px wide and tall.
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleProfilePicUpdate} type="hover">
              Update
            </Button>
            <Button>Delete</Button>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h5 className="font-semibold mb-1">Personal Details</h5>
        <span className="text-content text-xs">
          Edit your personal information and address.
        </span>
        <div className="mt-3">
          <form onSubmit={submitHandler}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <div>
                <div>
                  <label
                    className="font-semibold block mb-1 text-content text-sm"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="text"
                    id="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                {error?.firstName && (
                  <div className="mt-3 text-xs text-red-400">
                    <span>{error?.firstName}</span>
                  </div>
                )}
              </div>
              <div>
                <div>
                  <label
                    className="font-semibold block mb-1 text-content text-sm"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="text"
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                {error?.lastName && (
                  <div className="mt-3 text-xs text-red-400">
                    <span>{error?.lastName}</span>
                  </div>
                )}
              </div>
              <div>
                <div>
                  <label
                    className="font-semibold block mb-1 text-content text-sm"
                    htmlFor="birthday"
                  >
                    Birthday
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="text"
                    id="birthday"
                    placeholder="Date of Birth"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </div>
                {error?.birthday && (
                  <div className="mt-3 text-xs text-red-400">
                    <span>{error?.birthday}</span>
                  </div>
                )}
              </div>
              <div>
                <div>
                  <label
                    className="font-semibold block mb-1 text-content text-sm"
                    htmlFor="country"
                  >
                    Country
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="text"
                    id="country"
                    placeholder="Enter your country name"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                {error?.country && (
                  <div className="mt-3 text-xs text-red-400">
                    <span>{error?.country}</span>
                  </div>
                )}
              </div>
              <div>
                <div>
                  <label
                    className="font-semibold block mb-1 text-content text-sm"
                    htmlFor="address1"
                  >
                    Address Line 1
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="text"
                    id="address1"
                    placeholder="Address"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                {error?.address && (
                  <div className="mt-3 text-xs text-red-400">
                    <span>{error?.address}</span>
                  </div>
                )}
              </div>
              <div>
                <div>
                  <label
                    className="font-semibold block mb-1 text-content text-sm"
                    htmlFor="address2"
                  >
                    Address Line 2 (Optional)
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="text"
                    id="address2"
                    placeholder="Address"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label
                    className="font-semibold block mb-1 text-content text-sm"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="text"
                    id="city"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                {error?.city && (
                  <div className="mt-3 text-xs text-red-400">
                    <span>{error?.city}</span>
                  </div>
                )}
              </div>
              <div>
                <div>
                  <label
                    className="font-semibold block mb-1 text-content text-sm"
                    htmlFor="zipCode"
                  >
                    ZipCode
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="text"
                    id="zipCode"
                    placeholder="Enter your ZipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                </div>
                {error?.zipCode && (
                  <div className="mt-3 text-xs text-red-400">
                    <span>{error?.zipCode}</span>
                  </div>
                )}
              </div>
              <div>
                <div>
                  <label
                    className="font-semibold block mb-1 text-content text-sm"
                    htmlFor="id"
                  >
                    Upload ID
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="file"
                    id="id"
                    onChange={captureIdImage}
                  />
                </div>
                {error?.id && (
                  <div className="mt-3 text-xs text-red-400">
                    <span>{error?.id}</span>
                  </div>
                )}
              </div>
              <div>
                <div>
                  <label
                    className="font-semibold block mb-1 text-content text-sm"
                    htmlFor="resume"
                  >
                    Upload Resume
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="file"
                    id="resume"
                    onChange={captureResumeImage}
                  />
                </div>
                {error?.resume && (
                  <div className="mt-3 text-xs text-red-400">
                    <span>{error?.resume}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6">
              <div>
                <label
                  className="font-semibold block mb-1 text-content text-sm"
                  htmlFor="education"
                >
                  Education Details
                </label>
                <textarea
                  className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600 h-24"
                  id="education"
                  placeholder="Details of Educational Qualification"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
              </div>
              {error?.education && (
                <div className="mt-3 text-xs text-red-400">
                  <span>{error?.education}</span>
                </div>
              )}
            </div>
            <div className="mt-5">
              <Button type="submit-hover">Update Profile</Button>
            </div>
          </form>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Profile;
