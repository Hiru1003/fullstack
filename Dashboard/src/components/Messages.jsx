import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "https://fullstackmedicare-f7cdb2efe0fa.herokuapp.com/api/v1/message/getall",
          {
            withCredentials: true, // Ensure credentials are sent
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add JWT token if needed
            },
          }
        );

        // Assuming the data structure contains messages in the 'messages' key
        if (data && data.messages) {
          setMessages(data.messages);
        } else {
          console.error("No messages found in response data");
        }
      } catch (error) {
        // Better error handling
        if (error.response) {
          console.error("Error fetching messages:", error.response.data.message);
        } else {
          console.error("Network error or request failed:", error);
        }
      }
    };

    fetchMessages();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page messages">
      <h1>MESSAGE</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    First Name: <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;