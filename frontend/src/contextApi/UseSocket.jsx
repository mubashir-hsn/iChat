import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthProvider.jsx';
import io from 'socket.io-client';

const socketContext = createContext();

// Custom hook to access the socket context
export const useSocketContext = () => {
    return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [authUser] = useAuth(); // Assuming useAuth returns an object with user details

    useEffect(() => {
        if (authUser?.user?._id) {  // Check if the user is authenticated
            const newSocket = io('http://localhost:4001', {
                query: {
                    userId: authUser.user._id // Send userId in query params
                }
            });

            setSocket(newSocket);

            // Listen for online users event from the server
            newSocket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users);
            });

            // Clean up the socket connection when the component unmounts or authUser changes
            return () => {
                if (newSocket) {
                    newSocket.close(); // Close the socket connection
                }
            };
        } else {
            // If no authUser, ensure the socket is closed
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]); // Re-run if authUser changes

    return (
        <socketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </socketContext.Provider>
    );
};
