import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "../auth/Button"; // Import your Button component

type ProfileDetailsProps = {
  updatedUser: any;
  handleInputChange: (field: any, value: string) => void;
  handleSaveChanges: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
  handleChangePassword: () => void;
  handleDeleteAccount: () => void;
  handleSubscription: () => void;
};

const ProfileDetailsTab: React.FC<ProfileDetailsProps> = ({
  updatedUser,
  handleInputChange,
  handleSaveChanges,
  isLoading,
  handleChangePassword,
  handleDeleteAccount,
  handleSubscription,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Profile Details</CardTitle>
      <CardDescription>
        View and update your professional and subscription details.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {/* GitHub Profile */}
      <div className="space-y-2">
        <Label htmlFor="github">GitHub Profile</Label>
        <Input
          id="github"
          type="url"
          value={updatedUser.github || ""}
          placeholder="Enter your GitHub profile URL"
          onChange={(e) => handleInputChange("github", e.target.value)}
        />
      </div>
      {/* LinkedIn Profile */}
      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn Profile</Label>
        <Input
          id="linkedin"
          type="url"
          value={updatedUser.linkedin || ""}
          placeholder="https://linkedin.com/in/username"
          onChange={(e) => handleInputChange("linkedin", e.target.value)}
        />
      </div>
      {/* Phone Number */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={updatedUser.phone_number || ""}
          placeholder="Enter your Phone Number"
          onChange={(e) => handleInputChange("phone_number", e.target.value)}
        />
      </div>
      {/* Subscription Plan */}
      <div className="space-y-2">
        <Label htmlFor="subscription_plan">Subscription Plan</Label>
        <Input
          id="subscription_plan"
          value={updatedUser.subscription_plan || "No active plan"}
          disabled
        />
      </div>
    </CardContent>
    <CardFooter className="flex flex-col space-y-2">
      {/* Save Changes Button */}
      <Button
        label={isLoading ? "Saving..." : "Save Changes"}
        onClick={handleSaveChanges}
        isLoading={isLoading}
        disabled={isLoading}
        color="green"
      />

        <div className="flex flex-row space-x-4">
        {/* Change Password Button */}
        <button
            type="button"
            onClick={handleChangePassword}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Change Password
            </span>
        </button>

        {/* Delete Account Button */}
        <button
            type="button"
            onClick={handleDeleteAccount}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
        >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Delete Account
            </span>
        </button>

        {/* Manage Subscription Button */}
        <button
            type="button"
            onClick={handleSubscription}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
        >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Manage Subscription
            </span>
        </button>
        </div>

    </CardFooter>
  </Card>
);

export default ProfileDetailsTab;
