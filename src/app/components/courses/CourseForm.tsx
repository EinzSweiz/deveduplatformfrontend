'use client';
import React, { useState } from "react";

interface CourseCreateFormProps {
    onSubmit: (formData: FormData) => void;
    isSubmitting: boolean;
}

const CourseCreateForm: React.FC<CourseCreateFormProps> = ({ onSubmit, isSubmitting }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [video, setVideo] = useState<File | null>(null);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
    const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        if (image) formData.append('preview_image', image);
        if (video) formData.append('preview_video', video);
        onSubmit(formData);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImage(file);
            const imageUrl = URL.createObjectURL(file);
            setPreviewImageUrl(imageUrl);
        }
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setVideo(file);
            const videoUrl = URL.createObjectURL(file);
            setPreviewVideoUrl(videoUrl);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6">
            <form onSubmit={handleFormSubmit}>
                {/* Image and Video Preview */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    {/* Image Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Image
                        </label>
                        {previewImageUrl ? (
                            <img
                                className="rounded-lg w-full h-40 object-cover"
                                src={previewImageUrl}
                                alt="Course Preview"
                            />
                        ) : (
                            <div className="rounded-lg bg-gray-200 h-40 flex items-center justify-center text-gray-500">
                                No Image Selected
                            </div>
                        )}
                        <input
                            id="preview_image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400"
                        />
                    </div>

                    {/* Video Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Video
                        </label>
                        {previewVideoUrl ? (
                            <video className="rounded-lg w-full h-40 object-cover" controls>
                                <source src={previewVideoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div className="rounded-lg bg-gray-200 h-40 flex items-center justify-center text-gray-500">
                                No Video Selected
                            </div>
                        )}
                        <input
                            id="preview_video"
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                            className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400"
                        />
                    </div>
                </div>

                {/* Title Field */}
                <div className="mb-6">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter course title"
                        required
                        className="block w-full p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>

                {/* Description Field */}
                <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter course description"
                        required
                        className="block w-full p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>

                {/* Category Field */}
                <div className="mb-6">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="block w-full p-2 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    >
                        <option value="">Select a category</option>
                        <option value="Programming">Programming</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Business">Business</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Course'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CourseCreateForm;
