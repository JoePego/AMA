import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import ChatTextArea from "./ChatTextArea";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import Tooltip from "./Tooltip";
import { CopyOutlined } from "@ant-design/icons";
import BotMessageLoader from "./Loader";

// Custom hook for window height (unchanged)
const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowHeight;
};

// Custom hook for text typing effect
const useTypewriterEffect = (text, speed = 5, scrollToBottom) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
        if (scrollToBottom) {
          scrollToBottom();
        }
      } else {
        clearInterval(typingInterval);
        setIsComplete(true);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed, scrollToBottom]);

  return { displayedText, isComplete };
};

const useBotMessages = () => {
  const [botMessages, setBotMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const loadBotMessages = async () => {
      try {
        // Dynamically import messages from JSON file
        const messagesModule = await import("./assets/messages.json");

        // Handle different possible JSON structures with more robust parsing
        let importedMessages = [];

        // Check different possible message formats
        if (Array.isArray(messagesModule.default)) {
          importedMessages = messagesModule.default;
        } else if (
          messagesModule.default?.messages &&
          Array.isArray(messagesModule.default.messages)
        ) {
          importedMessages = messagesModule.default.messages;
        } else if (
          typeof messagesModule.default === "object" &&
          Object.keys(messagesModule.default).length > 0
        ) {
          // If it's an object, try to extract message-like properties
          importedMessages = Object.values(messagesModule.default).filter(
            (item) => item && typeof item === "object" && "text" in item
          );
        }

        // Validate and process messages
        const processedMessages = importedMessages
          .map((msg, index) => ({
            id: msg.id ?? index + 1,
            text: msg.text ?? "",
            keywords: msg.keywords ?? [],
          }))
          .filter((msg) => msg.text.trim() !== "");

        // Set messages and trigger scroll
        setBotMessages(processedMessages);
        setIsLoading(false);

        // Scroll to bottom after messages are loaded
        scrollToBottom();
      } catch (err) {
        console.error("Error loading bot messages:", err);
        setError(
          err instanceof Error ? err : new Error("Unknown error occurred")
        );
        setIsLoading(false);
      }
    };

    loadBotMessages();
  }, [scrollToBottom()]);

  // Function to add a new message and scroll to bottom
  const addMessage = useCallback(
    (newMessage) => {
      setBotMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];

        // Use setTimeout to ensure DOM update before scrolling
        setTimeout(scrollToBottom, 100);

        return updatedMessages;
      });
    },
    [scrollToBottom]
  );

  // Function to clear all messages
  const clearMessages = useCallback(() => {
    setBotMessages([]);
  }, []);

  return {
    botMessages,
    isLoading,
    error,
    messagesEndRef,
    addMessage,
    clearMessages,
    scrollToBottom,
  };
};

const BotMessageWithFooter = React.memo(
  ({ message, isTyping = false, scrollToBottom }) => {
    // If it's a typing indicator, show the loader
    if (isTyping) {
      return <BotMessageLoader />;
    }

    const { displayedText, isComplete } = useTypewriterEffect(
      message.text,
      5,
      scrollToBottom
    );
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
      if (isComplete) {
        const timer = setTimeout(() => {
          setShowFooter(true);
          scrollToBottom();
        }, 750); // Small delay after text is fully typed

        return () => clearTimeout(timer);
      }
    }, [isComplete, scrollToBottom]);

    return (
      <div className="flex justify-start">
        <div className="bot-bubble text-black dark:text-white p-1 break-words">
          <div className="bot-header mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-stars"
              viewBox="0 0 16 16"
            >
              <defs>
                <linearGradient
                  id="gradient-fill"
                  x1="20%"
                  y1="50%"
                  x2="100%"
                  y2="75%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "#bda0de", stopOpacity: 1 }}
                  />
                  <stop
                    offset="50%"
                    style={{ stopColor: "#867fea", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#5272f2", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <path
                fill="url(#gradient-fill)"
                d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"
              />
            </svg>
          </div>
          <div className="bot-message p-1 lg:text-base sm:text-sm">
            {displayedText}
          </div>
          {showFooter && (
            <div className="bot-footer pt-2 flex items-center animate-fade-in">
              <Tooltip content="Copy" placement="bottom">
                <div className="msg-opt hover:bg-zinc-200 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-600 p-1 rounded cursor-pointer">
                  <CopyOutlined size={20} />
                </div>
              </Tooltip>
              <Tooltip content="Good Response" placement="bottom">
                <div className="like-btn hover:bg-zinc-200 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-600 p-1 rounded cursor-pointer">
                  <ThumbsUp size={20} />
                </div>
              </Tooltip>
              <Tooltip content="Bad Response" placement="bottom">
                <div className="dislike-btn hover:bg-zinc-200 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-600 p-1 rounded cursor-pointer">
                  <ThumbsDown size={20} />
                </div>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    );
  }
);

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const windowHeight = useWindowHeight();
  const { botMessages, isLoading, error } = useBotMessages();
  const messagesEndRef = useRef(null);

  // Improved bot response finding logic
  const findBotResponse = useCallback(
    (userMessage) => {
      if (!botMessages || botMessages.length === 0) return null;

      // Find a response based on keywords
      const lowercaseUserMessage = userMessage.text.toLowerCase();

      return (
        botMessages.find((botMsg) =>
          botMsg.keywords.some((keyword) =>
            lowercaseUserMessage.includes(keyword.toLowerCase())
          )
        ) || botMessages[0]
      ); // Default to first message if no match
    },
    [botMessages]
  );

  // Scroll to bottom whenever messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(
    (newMessage) => {
      if (isLoading) {
        console.warn("Messages are still loading. Please wait.");
        return;
      }

      const userMessageWithSender = {
        ...newMessage,
        sender: "user",
      };

      setMessages((prevMessages) => [...prevMessages, userMessageWithSender]);

      // Show typing indicator
      const typingIndicator = {
        id: Date.now() + 1,
        text: "typing...",
        sender: "bot",
        isTyping: true,
      };

      setMessages((prevMessages) => [...prevMessages, typingIndicator]);

      const botResponse = findBotResponse(newMessage);

      if (botResponse) {
        setTimeout(() => {
          // Replace typing indicator with the actual message
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages.pop(); // Remove typing indicator
            updatedMessages.push({
              id: Date.now() + 2,
              text: botResponse.text,
              sender: "bot",
            });
            scrollToBottom();
            return updatedMessages;
          });
        }, 5000); // Simulate delay for typing effect
      }
    },
    [findBotResponse, isLoading, scrollToBottom]
  );

  // Memoize message rendering for performance
  const renderedMessages = useMemo(
    () =>
      messages.map((message) => {
        if (message.sender === "user") {
          // Render user message
          return (
            <div key={message.id} className="flex justify-end">
              <div className="bg-stone-600 text-white p-3 rounded-lg max-w-[80%] break-words shadow-sm">
                {message.text}
              </div>
            </div>
          );
        } else {
          // Render bot message with typing effect
          return (
            <BotMessageWithFooter
              key={message.id}
              message={message}
              isTyping={message.isTyping}
              scrollToBottom={scrollToBottom}
            />
          );
        }
      }),
    [messages, scrollToBottom]
  );

  // Render loading or error states
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        Loading messages...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Error loading chat: {error.message}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ height: `${windowHeight}px` }}
    >
      {/* Messages container with scrolling */}
      <div className="flex-grow overflow-y-auto bg-stone-50 dark:bg-zinc-800 pl-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        <div className="max-w-lg w-4/5 mx-auto">
          <div className="flex flex-col gap-2">
            {/* Messages area */}
            {renderedMessages}
            {/* Dummy div to scroll to bottom */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Separated ChatTextArea component */}
      <ChatTextArea onSendMessage={handleSendMessage} />
    </div>
  );
};

export default React.memo(ChatInterface);
