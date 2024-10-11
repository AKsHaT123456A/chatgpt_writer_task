import React, { useState, useEffect } from "react";
import Icon from "@/assets/message_icon.png";
import "./App.module.css";
import "../../assets/main.css";
import PromptModal from "./promptModal";

// Style definition
const styles = `
  .sticky-icon {
    width: 32px;
    height: 32px;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 5px;
    background-color: transparent;
    padding: 0px;
    border-radius: 8px;
    user-select: none; 
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const StickyIconComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // Debugging and checking modal visibility state
  useEffect(() => {
  }, [modalVisible]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleIconClick = () => {
    setModalVisible(true);
  };

  const displayStickyIcon = () => {
    const img = document.createElement("img");

    img.addEventListener("click", handleIconClick);
    img.src = Icon;
    img.width = 50;
    img.height = 50;
    img.className = "sticky-icon";
    img.style.userSelect = "none";
    img.setAttribute("draggable", "false");

    // Get all matching text areas and select the last one
    const messageTextAreas = document.querySelectorAll(
      ".msg-form__contenteditable"
    );
    const messageTextArea = messageTextAreas[messageTextAreas.length - 1];

    if (messageTextArea) {
      messageTextArea.appendChild(img);
    } else {
      console.log("Message text area not found");
    }
  };

  const removeImageFromMessageTextArea = () => {
    const img = document.querySelector(".sticky-icon");
    if (img) {
      img.remove();
    }
  };

  useEffect(() => {
    const displayStickyIconIfActive = () => {
      const messageTextAreas = document.querySelectorAll(
        ".msg-form__contenteditable"
      );
      const messageContainers = document.querySelectorAll(
        ".msg-form__msg-content-container"
      );


      // Get the last element of the matching elements
      const messageTextArea = messageTextAreas[messageTextAreas.length - 1];
      const messageContainer = messageContainers[messageContainers.length - 1];

      // Check if either the message text area is focused or the container has the active class
      if (
        (messageTextArea && document.activeElement === messageTextArea) ||
        (messageContainer &&
          messageContainer.classList.contains(
            "msg-form__msg-content-container--is-active"
          ))
      ) {
        displayStickyIcon(); // Display the Sticky icon
      }
    };

    // Delay the event listeners until the page is fully loaded
    const timeoutId = setTimeout(() => {
      const handleFocusIn = (event: { target: any; }) => {
        const focusedElement = event.target;
        if (
          focusedElement.matches(".msg-form__contenteditable") ||
          focusedElement.matches(".msg-form__msg-content-container")
        ) {
          displayStickyIcon();
        }
      };

      const handleFocusOut = (event: { relatedTarget: any; }) => {
        const focusedElement = event.relatedTarget;
        if (!focusedElement || !focusedElement.matches(".sticky-icon")) {
          removeImageFromMessageTextArea();
        }
      };

      document.addEventListener("focusin", handleFocusIn);
      document.addEventListener("focusout", handleFocusOut);
      displayStickyIconIfActive();

      // Cleanup
      return () => {
        document.removeEventListener("focusin", handleFocusIn);
        document.removeEventListener("focusout", handleFocusOut);
      };
    }, 1000); // Delay for page to load

    // Cleanup
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <PromptModal
        modalVisible={modalVisible}
        handleCloseModal={handleCloseModal}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default StickyIconComponent;
