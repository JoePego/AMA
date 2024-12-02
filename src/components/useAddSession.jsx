import { useState } from "react";

const useAddSession = () => {
  const [sessions, setSessions] = useState([]);

  // Function to add a new session
  const addSession = () => {
    const randomName = `Session ${Math.floor(Math.random() * 1000)}`;
    setSessions([...sessions, { id: Date.now(), name: randomName }]);
  };

  // Function to remove a session (optional)
  const removeSession = (id) => {
    setSessions(sessions.filter((session) => session.id !== id));
  };

  return { sessions, addSession, removeSession };
};

export default useAddSession;
