"use client";
import CategoryContentCourses from "@/components/Category/CategoryContentCourses";
import ProfileSection from "@/components/Profile/ProfileSection";
import withAuth from "@/lib/withAuth";
import { getProfileService } from "@/services/authService";
import { loginSuccess } from "@/store/slices/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(user || {});
  const [coursesCreatedByMe, setCoursesCreatedByMe] = useState([]);
  const [taughtCourses, setTaughtCourses] = useState([]);
  const dispatch = useDispatch();

  const getProfile = () => {
    const getProfileData = async () => {
      const res = await getProfileService(user?.id);
      if (res?.success) {
        setCoursesCreatedByMe(res?.data?.coursesCreated);
        setTaughtCourses(res?.data?.taughtCourses);
        dispatch(loginSuccess({ user: res?.data, token: localStorage.getItem("token") }));
        setProfile(res?.data);
      }
    };
    getProfileData();
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="container mx-auto py-8 flex flex-col gap-12">
      <ProfileSection user={user} profile={profile} setProfile={setProfile} getProfile={getProfile} />
      <div className="border-b border-gray-700 pb-12">
        <h3 className="font-quando text-3xl mb-8">Courses created by me</h3>
        <CategoryContentCourses courses={coursesCreatedByMe} cols={3} />
      </div>
      <div>
        <h3 className="font-quando text-3xl mb-8">Taught Courses</h3>
        <CategoryContentCourses courses={taughtCourses} cols={3} />
      </div>
    </div>
  );
}

export default withAuth(Profile);
