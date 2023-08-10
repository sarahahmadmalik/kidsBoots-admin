"use client";
import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";
import { Input, message } from "antd";

import { useState, useEffect } from "react";
const Index = () => {
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [showPassword, setShowPassword] = useState(false);


  const admin = {
    name: "James William",
    first: "James",
    last: "Williams",
    email: "james@email.com",
    phone: "+91 65765767 6",
    country: "USA",
    city: "New York",
    postal: "5676877",
    address: "333 St Paun, New York , USA",
    password: "abcd123"
  };

  const [formData, setFormData] = useState({
    firstName: admin.first,
    lastName: admin.last,
    email: admin.email,
    phone: admin.phone,
    country: admin.country,
    city: admin.city,
    postal: admin.postal,
    address: admin.address,
    about: "",
    password: admin.password
  });
  

  const [isFormEdited, setIsFormEdited] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsFormEdited(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormEdited) {
      message.success("Information is up to date!");
      return;
    }
   

 
    admin.first = formData.firstName;
    admin.last = formData.lastName;
    admin.email = formData.email;
    admin.phone = formData.phone;
    admin.country = formData.country;
    admin.city = formData.city;
    admin.postal = formData.postal;
    admin.address = formData.address;
    admin.password = formData.password

    setFormData({
      firstName: admin.first,
      lastName: admin.last,
      email: admin.email,
      phone: admin.phone,
      country: admin.country,
      city: admin.city,
      postal: admin.postal,
      address: admin.address,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "repeatPassword") {
      setRepeatPassword(value);
    }
  };

  useEffect(() => {
    if (newPassword === repeatPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [newPassword, repeatPassword]);


  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (newPassword === repeatPassword ) {
        if((newPassword !== "" || repeatPassword !== "")){
            admin.password = newPassword;
            setNewPassword("");
            setRepeatPassword("");
          
            message.success("Password updated successfully!");
        }
        else{
            message.error("Please enter password to update")
            return;
        }

    } else {
    
      message.error("Passwords do not match. Please try again.");
    }
  };


  return (
    <div className="w-full bg-[F9F9F9]">
      <Head>
        <title>Profile</title>
      </Head>
      <div className="h-full w-full  my-4 overflow-hidden">
        <div className="w-full h-full flex md:flex-row flex-col items-start md:justify-start my-5 md:px-6 px-4 md:px-0 ">
          <div className=" w-full md:w-[50%] xl:md-[50%] flex md:flex-col flex-wrap  ">
            <div className="flex flex-col flex-grow  bg-[#FFFFFF] shadow-sm rounded-md px-5 py-5  md:w-full">
              <h2 className="font-[500] text-[18px]">My Profile</h2>
              <div className="mb-3 mt-5 flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image src="/images/admin.svg" width={64} height={64} alt="Admin Image" />
                </div>
                <div>
                  <p className="text-[18px] font-normal text-[#000000]">{admin.name}</p>
                  <p className="text-[16px] font-normal text-[#777777]">Admin</p>
                </div>
              </div>
              <div className="my-3">
                <div className="flex items-start my-4 pb-3 border-b border-[#DFDFDF]">
                  <p className="text-[15px] font-[400] text-[#777777] uppercase">Full Name:</p>
                  <p className="ml-2 text-[16px] font-normal">{admin.name}</p>
                </div>
                <div className="flex items-start my-4 pb-3 border-b border-[#DFDFDF]">
                  <p className="text-[15px] font-[400] text-[#777777] uppercase">Mobile:</p>
                  <p className="ml-2 text-[16px] font-normal">{admin.phone}</p>
                </div>
                <div className="flex items-start my-4 pb-3 border-b border-[#DFDFDF]">
                  <p className="text-[15px] font-[400] text-[#777777] uppercase">Email:</p>
                  <p className="ml-2 text-[16px] font-normal">{admin.email}</p>
                </div>
                <div className="flex items-start my-4 pb-3 border-b border-[#DFDFDF]">
                  <p className="text-[15px] font-[400] text-[#777777] uppercase">Location:</p>
                  <p className="ml-2 text-[16px] font-normal">{admin.city}, {admin.country}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:flex-row flex flex-col   my-5 md:my-0 mx-4 gap-4">
            <div className="w-full  bg-[#FFFFFF] shadow-sm rounded-md py-5">
                <div className="px-6">
                <h2 className="font-[500] text-[18px]">Edit Profile</h2>
                </div>
            
              <form className="my-3 border-b border-[#DFDFDF] px-6 pb-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="text-[16px] font-normal text-[#777777]"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-[#2668E81A] rounded transition duration-300 bg-[#2668E803] focus:outline-none focus:border-[#2668E855] hover:border-[#2668E855]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="text-[16px] font-normal text-[#777777]"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-[#2668E81A] rounded transition duration-300 bg-[#2668E803] focus:outline-none focus:border-[#2668E855] hover:border-[#2668E855]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-[16px] font-normal text-[#777777]"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-[#2668E81A] rounded transition duration-300 bg-[#2668E803] focus:outline-none focus:border-[#2668E855] hover:border-[#2668E855]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="text-[16px] font-normal text-[#777777]"
                    >
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-[#2668E81A] rounded transition duration-300 bg-[#2668E803] focus:outline-none focus:border-[#2668E855] hover:border-[#2668E855]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="text-[16px] font-normal text-[#777777]"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-[#2668E81A] rounded transition duration-300 bg-[#2668E803] focus:outline-none focus:border-[#2668E855] hover:border-[#2668E855]"
                    >
                      <option value="">Select Country</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="text-[16px] font-normal text-[#777777]"
                    >
                      City
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-[#2668E81A] rounded transition duration-300 bg-[#2668E803] focus:outline-none focus:border-[#2668E855] hover:border-[#2668E855]"
                    >
                      <option value="">Select City</option>
                      <option value="New York">New York</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="postal"
                      className="text-[16px] font-normal text-[#777777]"
                    >
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postal"
                      name="postal"
                      value={formData.postal}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-[#2668E81A] rounded transition duration-300 bg-[#2668E803] focus:outline-none focus:border-[#2668E855] hover:border-[#2668E855]"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="about"
                    className="text-[16px] font-normal text-[#777777]"
                  >
                    About Me
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    placeholder="Write here..."
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-[#2668E81A] rounded transition duration-300 bg-[#2668E803] focus:outline-none focus:border-[#2668E855] hover:border-[#2668E855]"
                    rows={4}
                    style={{ resize: "none" }}
                  />
                </div>
                <div className="w-full flex justify-end ">
                <button
                  type="submit"
                  className="mt-6 bg-[#A51F6C] text-white py-2 px-4 rounded transition duration-300 hover:bg-[#E82494]"
                >
                  Update Profile
                </button>

                </div>
                
              </form>
              <form className="my-3  px-6 pb-6" onSubmit={handlePasswordSubmit}>
                <div className="">
                  <h2 className="font-[500] text-[18px]">Change Password</h2>
                </div>
                <div className="mt-3">
                <div className="flex items-start mt-4 pb-3 w-full">
          <div className="w-[50%]">
            <label className="text-[16px] font-normal text-[#777777]">
              Current Password:
            </label>
            <input
              type="password"
              id="currentPassword"
              value={admin.password}
              name="currentPassword"
              className="w-full py-2 px-3 border border-[#2668E81A] rounded transition duration-300 bg-[#2668E803] focus:outline-none focus:border-[#2668E855] hover:border-[#2668E855]"
            />
          </div>
          <div className="w-[50%] ml-4">
            <label className="text-[16px] font-normal text-[#777777]">
              New Password:
            </label>
            <Input.Password
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={handlePasswordChange}
              className="w-full py-2 fontFamily px-3 border border-[#2668E81A] rounded transition duration-300 bg-[#2668E803] focus:outline-none focus:border-[#2668E855] hover:border-[#2668E855]"
              placeholder="New Password"
              />
          </div>
        </div>
        <div className="flex items-start pb-3">
          <div className="md:w-[50%] w-full">
            <label className="text-[16px] font-normal text-[#777777]">
              Repeat Password:
            </label>
            <Input.Password
              id="repeatPassword"
              name="repeatPassword"
              value={repeatPassword}
              onChange={handlePasswordChange}
              className={`w-full py-2 px-3 border fontFamily ${
                passwordMatch
                  ? "border-[#2668E81A]"
                  : "border-[#FF0000]"
              } rounded transition duration-300 bg-[#2668E803] focus:outline-none ${
                passwordMatch
                  ? "focus:border-[#2668E855] hover:border-[#2668E855]"
                  : "focus:border-[#FF0000] hover:border-[#FF0000]"
              }`}
              placeholder="Repeat Password"
            />
            {!passwordMatch && (
              <p className="text-red-600 mt-2">
                Passwords do not match. Please try again.
              </p>
            )}
          </div>
        </div>

                <div className="w-full flex justify-end">
                  <button
                    type="submit"
                    className=" bg-[#A51F6C] text-white py-2 px-4 rounded transition duration-300 hover:bg-[#E82494]"
                  >
                    Change Password
                  </button>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
