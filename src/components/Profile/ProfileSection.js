import React, { useRef, useState } from "react";
import Modal from "../Modal";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { EditIcon, LocationIcon, PhoneIcon } from "../Icons/Icons";
import { updateProfileService } from "@/services/authService";

export default function ProfileSection({ user, profile, setProfile, getProfile }) {
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedFields, setUpdatedFields] = useState({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDivClick = () => {
    fileInputRef.current.click(); // input file'ı tetikle
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfile((prevProfile) => ({
        ...prevProfile,
        profileImage: file,
      }));
      setUpdatedFields((prevUpdatedFields) => ({
        ...prevUpdatedFields,
        profileImage: file,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });

    if (profile[name] !== value) {
      setUpdatedFields((prev) => ({ ...prev, [name]: value }));
    } else {
      const { [name]: _, ...rest } = updatedFields;
      setUpdatedFields(rest);
    }
  };

  const updateHandle = async () => {
    const formData = new FormData();

    for (let key in updatedFields) {
      if (updatedFields.hasOwnProperty(key)) {
        formData.append(key, profile[key]);
      }
    }

    console.log(updatedFields);

    try {
      const res = await updateProfileService(profile?.id, formData);

      if (res?.success) {
        getProfile();
        closeModal();
      } else {
        console.error("Profile update failed:", res?.message || "Unknown error");
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return (
    <div className="border-b border-gray-700 pb-12">
      <h3 className="font-quando text-3xl mb-8">Profile</h3>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Edit Your Profile</h2>
          <p className="text-sm">You can edit your profile in this section!</p>
        </div>
        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center gap-4 cursor-pointer" onClick={handleDivClick}>
            <img src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}${user?.profileImage}`} className="w-12 h-12 rounded-full object-cover" alt="Profile" />
            <p>Profile Resmini değiştir</p>

            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
          </div>
          <Input placeholder="Username" value={profile?.userName} name="userName" labelText="Username" onChange={handleChange} />
          <Input placeholder="Email" value={profile?.email} name="email" labelText="Email" onChange={handleChange} disabled />
          <Input placeholder="Full Name" value={profile?.fullName} name="fullName" labelText="Full Name" onChange={handleChange} />
          <Input placeholder="Address" value={profile?.address} name="address" labelText="Address" onChange={handleChange} />
          <Input placeholder="Phone Number" value={profile?.phoneNumber} name="phoneNumber" labelText="Phone Number" onChange={handleChange} />
          <textarea
            rows={3}
            className={cn({
              "border border-transparent file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 rounded-md bg-[#312f2f] px-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm overflow-hidden py-3": true,
              "focus:border focus:border-[#4e4e4e] transition duration-300 ": true,
            })}
            placeholder="Bio"
            value={profile?.bio}
            name="bio"
            labelText="Bio"
            onChange={handleChange}
          ></textarea>
          <button className="p-8 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold cursor-pointer" onClick={updateHandle}>
            Update
          </button>
        </div>
      </Modal>
      <div className="flex flex-col gap-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={`http://localhost:5000${user?.profileImage}`} className="w-32 h-32 rounded-full object-cover" alt="" />
            <div>
              <p>{user?.fullName}</p>
              <p>{user?.userName}</p>
              <p>{user?.email}</p>
            </div>
          </div>
          <button onClick={openModal} className="text-white px-5 py-3 rounded-xl flex items-center gap-4 bg-[#303030] cursor-pointer">
            <EditIcon size={18} color={"#fff"} /> <span className="text-sm">Edit Profile</span>
          </button>
        </div>
        <p>{user?.bio}</p>
        <div className="flex items-center gap-6">
          <p className="flex items-center gap-4">
            <PhoneIcon size={16} color="#fff" />
            {user?.phoneNumber}
          </p>
          <div className="w-[1px] h-full min-h-6 bg-gray-600"></div>
          <p className="flex items-center gap-4">
            <LocationIcon size={16} color="#fff" />
            {user?.address}
          </p>
        </div>
      </div>
    </div>
  );
}
