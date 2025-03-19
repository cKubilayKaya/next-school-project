import React, { useState } from "react";
import Modal from "../Modal";
import { Input } from "../ui/input";
import resetState from "@/lib/resetState";
import moment from "moment";
import { createCourseService } from "@/services/courseService";

export default function CategoryModal({ isModalOpen, closeModal, currentCategory, getCategories }) {
  const [createCourse, setCreateCourse] = useState({
    slug: "",
    name: "",
    description: "",
    level: "",
    startDate: "",
    startDateText: "",
    endDate: "",
    endDateText: "",
    bannerImage: "",
  });

  const dateFormat = (date) => {
    const parsedDate = moment(date, "YYYY-MM-DD'T'HH:mm");
    return parsedDate.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setCreateCourse({ ...createCourse, ["startDate"]: dateFormat(value), ["startDateText"]: value });
    } else if (name === "endDate") {
      setCreateCourse({ ...createCourse, ["endDate"]: dateFormat(value), ["endDateText"]: value });
    } else {
      setCreateCourse({ ...createCourse, [name]: value });
    }
  };

  const createCourseHandle = async () => {
    const { startDateText, endDateText, ...courseData } = createCourse;
    courseData.categoryId = currentCategory?.id;
    const res = await createCourseService(courseData);

    if (res.success) {
      closeModal();
      getCategories();
      resetState(createCourse, setCreateCourse);
    }
  };

  return (
    <Modal isOpen={isModalOpen} closeModal={closeModal}>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Create Course</h2>
        <p className="text-sm">You can create course in this section!</p>
      </div>
      <div className="flex flex-col w-full gap-4">
        <Input placeholder="Slug" value={createCourse?.slug} name="slug" labelText="Slug" onChange={handleChange} />
        <Input placeholder="Name" value={createCourse?.name} name="name" labelText="Name" onChange={handleChange} />
        <Input placeholder="Description" value={createCourse?.description} name="description" labelText="Description" onChange={handleChange} />
        <Input placeholder="Level" value={createCourse?.level} name="level" labelText="Level" onChange={handleChange} />
        <Input
          placeholder="Start Date"
          value={createCourse?.startDateText}
          name="startDate"
          labelText="Start Date"
          onChange={handleChange}
          type="datetime-local"
        />
        <Input placeholder="End Date" value={createCourse?.endDateText} name="endDate" labelText="End Date" onChange={handleChange} type="datetime-local" />
        <Input placeholder="Banner Image" value={createCourse?.bannerImage} name="bannerImage" labelText="Banner Image" onChange={handleChange} />
        <button className="p-8 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold cursor-pointer" onClick={createCourseHandle}>
          Create
        </button>
      </div>
    </Modal>
  );
}
