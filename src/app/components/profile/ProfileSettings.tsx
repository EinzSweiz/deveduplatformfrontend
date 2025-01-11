import React from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "../auth/Button";

type ProfileSettingsProps = {
    updatedUser: any;
    dataImage: File | null;
    handleInputChange: (field: any, value: any) => void;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSaveChanges: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isLoading: boolean;
  };
const ProfileSettingsTab: React.FC<ProfileSettingsProps> = ({
  updatedUser,
  dataImage,
  handleInputChange,
  handleImageChange,
  handleSaveChanges,
  isLoading,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Profile Settings</CardTitle>
      <CardDescription>
        Update your profile information and avatar.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="w-[200px] h-[200px] relative mx-auto">
        {dataImage ? (
          <Image
            src={URL.createObjectURL(dataImage)}
            alt="Selected Avatar"
            className="rounded-full object-cover"
            fill
          />
        ) : updatedUser.avatar_url ? (
          <Image
            src={updatedUser.avatar_url}
            alt="Current Avatar"
            className="rounded-full object-cover"
            fill
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="avatar">Profile Image</Label>
        <Input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <div className="space-y-4">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={updatedUser.email} disabled />
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={updatedUser.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>
      <div className="space-y-4">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={updatedUser.location || ""}
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      </div>
    </CardContent>
    <CardFooter>
    <Button
        label={isLoading ? "Saving..." : "Save Changes"}
        onClick={handleSaveChanges}
        isLoading={isLoading}
        disabled={isLoading}
        color="green" // Use the default or customize
      />
    </CardFooter>
  </Card>
);

export default ProfileSettingsTab;
