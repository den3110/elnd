'use client';
import React from 'react';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import CreateCourse from '@/app/components/Admin/Course/CreateCourse';
import Heading from '@/app/utils/Heading';
import AdminSidebar from '@/app/components/Admin/sidebar/AdminSidebar';

const page = (props) => {
  return (
    <div>
        <Heading
         title="Elearning - Admin"
         description="ELearning is a platform for students to learn and get help from teachers"
         keywords="Prograaming,MERN,Redux,Machine Learning"
        />
        <div className="flex">
            <div className="1500px:w-[16%] w-1/5">
                <AdminSidebar />
            </div>
            <div className="w-[85%]">
               <DashboardHeader />
               <CreateCourse /> 
            </div>
        </div>
    </div>
  );
}

export default page;


