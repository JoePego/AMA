import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { User, Settings, LogOut, CreditCard } from "lucide-react";
import { CgProfile } from "react-icons/cg";

const ProfileDropdown = ({
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  onProfileClick,
  onSettingsClick,
  onBillingClick,
  onLogoutClick,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className="flex items-center p-1 rounded-full justify-center px-1 py-1 
         focus:outline-none focus:ring-0 focus:ring-offset-0 text-sm font-medium text-gray-800"
      >
        <button className="flex p-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-300">
          <CgProfile size={24} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[220px] bg-white dark:bg-zinc-700 dark:text-zinc-200 rounded-lg shadow-lg border 
          border-gray-200 p-1 space-y-1 text-sm"
          sideOffset={5}
        >
          <DropdownMenu.Label className="px-2 py-2 text-xs text-gray-500 dark:text-zinc-200 font-normal">
            {userName}
            <div className="text-xs text-gray-500 dark:text-zinc-200">{userEmail}</div>
          </DropdownMenu.Label>

          <DropdownMenu.Separator className="h-px dark:bg-zinc-200 bg-gray-200 my-1" />

          <DropdownMenu.Item
            onSelect={() => onProfileClick && onProfileClick()}
            className="relative flex select-none items-center px-2 py-2 
            rounded hover:bg-gray-100 dark:hover:bg-zinc-600 cursor-pointer outline-none"
          >
            <User className="mr-2 h-4 w-4 text-gray-600 dark:text-zinc-200" />
            Profile
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={() => onSettingsClick && onSettingsClick()}
            className="relative flex select-none items-center px-2 py-2 
            rounded hover:bg-gray-100 dark:hover:bg-zinc-600 cursor-pointer outline-none"
          >
            <Settings className="mr-2 h-4 w-4 text-gray-600 dark:text-zinc-200" />
            Settings
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={() => onBillingClick && onBillingClick()}
            className="relative flex select-none items-center px-2 py-2 
            rounded hover:bg-gray-100 dark:hover:bg-zinc-600 cursor-pointer outline-none"
          >
            <CreditCard className="mr-2 h-4 w-4 text-gray-600 dark:text-zinc-200" />
            Billing
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

          <DropdownMenu.Item
            onSelect={() => onLogoutClick && onLogoutClick()}
            className="relative flex select-none items-center px-2 py-2 
            rounded hover:bg-red-100 dark:hover:bg-red-500 cursor-pointer outline-none text-red-600 dark:text-red-500 dark:hover:text-red-100"
          >
            <LogOut className="mr-2 h-4 w-4 text-red-600 dark:text-red-500 dark:hover:text-red-100" />
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ProfileDropdown;
