import React, { useState, useRef, useEffect } from "react";
import { ArrowUpCircleIcon } from "lucide-react";

const ChatTextArea = ({ onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState("");
  const textareaRef = useRef(null);

  // Automatically adjust textarea height dynamically
  useEffect(() => {
    const adjustTextareaHeight = () => {
      if (textareaRef.current) {
        // Reset height to auto to calculate the correct scrollHeight
        textareaRef.current.style.height = "auto";

        // Set height based on scrollHeight, with a max height
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = `${Math.min(scrollHeight, 120)}px`;
      }
    };

    adjustTextareaHeight();
  }, [inputMessage]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    // Create a new message object
    const newMessage = {
      id: Date.now(), // unique id
      text: inputMessage,
      sender: "user", // could be 'user' or 'bot'
    };

    // Call the onSendMessage prop with the new message
    onSendMessage(newMessage);

    // Clear the input field and reset textarea height
    setInputMessage("");
  };

  const handleKeyPress = (event) => {
    // Allow sending message with Shift+Enter, prevent default newline
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex px-2 bottom-0 w-full dark:bg-zinc-800">
      <div className="flex bg-stone-200 m-2 dark:bg-dark-700 shadow w-full sm:w-4/5 lg:w-[50%] m-0 p-0.5 rounded-lg mx-auto">
        <div className="flex w-full">
          <textarea
            ref={textareaRef}
            name="text"
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
            }}
            onKeyPress={handleKeyPress}
            placeholder="Message..."
            rows={1}
            className="
                p-4 
                placeholder:select-none
                placeholder:text-slate-400 
                placeholder:dark:text-gray-50 
                dark:bg-dark-700 
                resize-none 
                w-full 
                border-none 
                rounded-lg 
                bg-stone-200 
                focus:outline-none 
                focus:border-indigo-500 
                focus:ring-indigo-500 
                focus:ring-none 
                sm:text-sm
                h-auto
                min-h-[40px]
                max-h-[120px]
                overflow-y-auto
              "
          />
        </div>
        <div className="p-1 flex items-center">
          <button
            onClick={handleSendMessage}
            className="
                text-stone-200 
                bg-stone-800 
                dark:text-stone-700 
                dark:bg-stone-200 
                m-0 
                duration-200 
                hover:bg-stone-500 
                dark:hover:bg-stone-50 
                rounded-full 
                focus:ring-none 
                focus-visible:ring-none 
                focus-visible:ring-blue-500
                flex items-center justify-center
              "
          >
            <ArrowUpCircleIcon size={40} />
          </button>
        </div>
      </div>
      <div className="p-1">
        <span>footer</span>
      </div>
    </div>
  );
};

export default ChatTextArea;
