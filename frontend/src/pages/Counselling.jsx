import React from "react";
import { toast } from "react-toastify";
import Button from "../components/ui/Button";

const Counselling = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    toast.success("Free Counselling Submitted!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  return (
    <div className="pt-36 bg-primary-bg min-h-screen px-4 sm:px-0 pb-20">
      <div className="container">
        <h2 className="font-semibold text-center text-xl mb-5">
          Book a Free Counselling Session Now !!
        </h2>
        <div className="w-3/5 mx-auto">
          <div className="border rounded-lg bg-white">
            <div className="border-b p-4">
              <h5 className="font-medium">Your Details</h5>
            </div>
            <form onSubmit={submitHandler} className="p-4">
              <div className="flex justify-between gap-5 mb-4">
                <div className="w-full">
                  <div>
                    <label
                      className="font-semibold block mb-2 text-content text-sm"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <input
                      className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                      type="text"
                      id="firstName"
                      placeholder="Enter your first name"
                      required
                      //   value={firstName}
                      //   onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div>
                    <label
                      className="font-semibold block mb-2 text-content text-sm"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <input
                      className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                      type="text"
                      id="lastName"
                      placeholder="Enter your last name"
                      required
                      //   value={lastName}
                      //   onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full mb-4">
                <div>
                  <label
                    className="font-semibold block mb-1 text-content text-sm"
                    htmlFor="number"
                  >
                    Phone Number
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="number"
                    id="number"
                    placeholder="Phone Number"
                    required
                    // value={number}
                    // onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full mb-4">
                <div>
                  <label
                    className="font-semibold block mb-1 text-content text-sm"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="email"
                    id="email"
                    placeholder="Enter Your Email"
                    required
                    // value={number}
                    // onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full mb-4">
                <div>
                  <label
                    className="font-semibold block mb-2 text-content text-sm"
                    htmlFor="address1"
                  >
                    Address Line 1
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="text"
                    id="address1"
                    placeholder="Address"
                    required
                    // value={address1}
                    // onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full mb-4">
                <div>
                  <label
                    className="font-semibold block mb-2 text-content text-sm"
                    htmlFor="address2"
                  >
                    Address Line 2 (Optional)
                  </label>
                  <input
                    className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                    type="text"
                    id="address2"
                    placeholder="Address"
                    // value={address2}
                    // onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-between gap-5 mb-4">
                <div className="w-full">
                  <div>
                    <label
                      className="font-semibold block mb-2 text-content text-sm"
                      htmlFor="city"
                    >
                      City
                    </label>
                    <input
                      className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                      type="text"
                      id="city"
                      placeholder="City"
                      required
                      //   value={city}
                      //   onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div>
                    <label
                      className="font-semibold block mb-2 text-content text-sm"
                      htmlFor="country"
                    >
                      Country
                    </label>
                    <input
                      className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                      type="text"
                      id="country"
                      placeholder="Country"
                      required
                      //   value={country}
                      //   onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div>
                    <label
                      className="font-semibold block mb-2 text-content text-sm"
                      htmlFor="zipCode"
                    >
                      Zip/Postal Code
                    </label>
                    <input
                      className="block w-full border rounded outline-none py-2 px-3 text-xs focus:border-purple-600"
                      type="text"
                      id="zipCode"
                      placeholder="Zip/Postal Code"
                      required
                      //   value={zipCode}
                      //   onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Button type="submit-hover">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counselling;
