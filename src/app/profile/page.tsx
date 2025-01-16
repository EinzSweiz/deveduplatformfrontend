'use client';

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileDetailsTab from "../components/profile/ProfileDetails";
import ProfileSettingsTab from "../components/profile/ProfileSettings";
import apiService from "../services/apiService";
import { resetCookies } from "../lib/actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmDialog from "../components/profile/AlterDeleteConfirmDialog";
import { useRouter } from "next/navigation";

type UserProps = {
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  subscription_plan?: string;
  linkedin?: string;
  github?: string;
  phone_number?: string;
  subscription_start_date?: string;
  subscription_end_date?: string;
  is_subscription_active?: boolean;
  is_deleted?: boolean;
};

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [updatedUser, setUpdatedUser] = useState<UserProps | null>(null);
  const [dataImage, setDataImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiService.get("/api/user/accounts/profile/detail/");
        if (response) {
          setUser(response);
          setUpdatedUser(response);
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (field: keyof UserProps, value: string) => {
    if (updatedUser) {
      setUpdatedUser({ ...updatedUser, [field]: value });
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setDataImage(event.target.files[0]);
    }
  };

  const handleSaveChanges = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!updatedUser) return;

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", updatedUser.name);
      if (updatedUser.bio) formData.append("bio", updatedUser.bio);
      if (updatedUser.location) formData.append("location", updatedUser.location);
      if (updatedUser.github) formData.append("github", updatedUser.github);
      if (updatedUser.linkedin) formData.append("linkedin", updatedUser.linkedin);
      if (updatedUser.phone_number) formData.append("phone_number", updatedUser.phone_number);
      if (dataImage) formData.append("avatar", dataImage);

      const response = await apiService.put(
        "/api/user/accounts/profile/detail/",
        formData,
        true
      );

      if (response) {
        setUser(response);
        setUpdatedUser(response);
        setDataImage(null);
        toast.success("You successfully updated the profile.");
      } else {
        throw new Error("Failed to update user.");
      }
    } catch (err: any) {
      console.error("Error updating user:", err);
      toast.error("Failed to update user.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!updatedUser) return;

    try {
      setIsDialogOpen(false);
      setIsLoading(true);


      const response = await apiService.put(
        "/api/user/accounts/profile/detail/",
        {'is_deleted': true},
        false
      );

      if (response) {
        toast.error(
          "Your account has been deactivated :(, you can activate it again during login.",
          { autoClose: 5000 }
        );
        await resetCookies();
        setTimeout(() => router.push("/auth/login"), 5000);
      }
    } catch (err) {
      console.error("Failed to delete account:", err);
      toast.error("Failed to delete account.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !updatedUser) {
    return (
      <div className="w-full max-w-[800px] mx-auto p-4">
        <p>Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[800px] mx-auto p-4">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          <TabsTrigger value="details">Profile Details</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSettingsTab
            updatedUser={updatedUser}
            dataImage={dataImage}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            handleSaveChanges={handleSaveChanges}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="details">
          <ProfileDetailsTab
            updatedUser={updatedUser}
            handleInputChange={handleInputChange}
            handleSaveChanges={handleSaveChanges}
            isLoading={isLoading}
            handleChangePassword={() => router.push("/auth/password-reset")}
            handleDeleteAccount={() => setIsDialogOpen(true)}
            handleSubscription={() => console.log("Manage Subscription triggered")}
          />
          <ConfirmDialog
            isOpen={isDialogOpen}
            title="Are you sure you want to delete your account?"
            description="This action is irreversible. Your account will be deactivated."
            onConfirm={handleDeleteAccount}
            onCancel={() => setIsDialogOpen(false)}
            onOpenChange={() => setIsDialogOpen(false)}
          />
        </TabsContent>
      </Tabs>

      <ToastContainer />
    </div>
  );
};

export default UserProfile;
