'use client';
import React, { useState } from "react";
import apiService from "@/app/services/apiService";
import CourseCreateForm from "../components/courses/CourseForm";

const CreateCourse = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle form submission
    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            const response = await apiService.postWithImage('/api/courses/create/', formData);
            console.log('Course created successfully:', response);
            alert('Course created successfully!');
        } catch (error) {
            console.error('Error creating course:', error);
            alert('Failed to create course. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <CourseCreateForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
    );
};

export default CreateCourse;
