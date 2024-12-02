import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {Trash2, EllipsisVertical, Edit3, Share, Archive } from "lucide-react";

const ActionsDropdown = ({ onRename, onDelete }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button className="hover:bg-zinc-200 dark:hover:bg-zinc-600 py-0.5 rounded">
          <EllipsisVertical size={18} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-[125px] bg-white dark:bg-neutral-700 rounded-md shadow-lg border border-gray-200 dark:border-gray-500 p-1.5"
          sideOffset={5}
          align="start"
        >
          <DropdownMenu.Item
            onSelect={() => {
              onRename();
              setOpen(false);
            }}
            className="px-2.5 py-2 flex items-center cursor-pointer dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-600 hover:bg-gray-100 outline-none focus:bg-gray-100 rounded"
          >
            <Share className="mr-2 w-4 h-5" />
            Share
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => {
              onRename();
              setOpen(false);
            }}
            className="px-2.5 py-2 flex items-center cursor-pointer dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-600 hover:bg-gray-100 outline-none focus:bg-gray-100 rounded"
          >
            <Archive className="mr-2 w-4 h-5" />
            Archive
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={() => {
              onRename();
              setOpen(false);
            }}
            className="px-2.5 py-2 flex items-center cursor-pointer dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-600 hover:bg-gray-100 outline-none focus:bg-gray-100 rounded"
          >
            <Edit3 className="mr-2 w-4 h-5" />
            Rename
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-500 my-1" />

          <DropdownMenu.Item
            onSelect={() => {
              onDelete();
              setOpen(false);
            }}
            className="px-2.5 py-2 flex items-center cursor-pointer dark:hover:text-red-100 dark:text-red-500 dark:hover:bg-red-600 text-red-600 hover:bg-red-50 outline-none focus:bg-red-50 rounded"
          >
            <Trash2 className="mr-2 w-4 h-4 " />
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ActionsDropdown;
