import { useState } from "react";
import ButtonComponent from "./button";
import Input from "@/assets/input.png";
import Reload from "@/assets/reload.png";
import Generate from "@/assets/Vector.png";
import { generateAIContent } from "../services/apiServices";
import getLatestContentAndName from "../services/content";

interface PromptModalProps {
  modalVisible: boolean;
  handleCloseModal: () => void;
  setModalVisible: (visible: boolean) => void;
}

const Loader = () => (
  <div className="loader flex justify-center items-center">
    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const PromptModal = ({ modalVisible, handleCloseModal, setModalVisible }: PromptModalProps) => {
  const [inputValue, setInputValue] = useState("");
  const [generated, setGenerated] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [promptModalVisible, setPromptModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(
    "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
  );

  const handleGenerateClick = async () => {
    if (inputValue.length !== 0) {
      setLoading(true);
      let response = await generateAIContent(inputValue);
      setContent(response);
      setLoading(false);
      setGenerated(true);
      setPromptModalVisible(true);
      setPrompt(inputValue);
      setInputValue("");
    }
  };

  const handleRegenerateClick = async () => {
    if (prompt.length !== 0) {
      setLoading(true);
      let response = await generateAIContent(`$you gave ${content} for ${prompt},regenerate a better one`);
      setContent(response);
      setLoading(false);
    }
  };

  const handleInsertClick = () => {
    setModalVisible(false);
    const replyText: string = content ?? "";

    const messageElements: NodeListOf<Element> = document.querySelectorAll(".msg-form__contenteditable");
    const messageElement: HTMLElement | null =
      messageElements.length > 0 ? (messageElements[messageElements.length - 1] as HTMLElement) : null;

    if (messageElement) {
      const paragraph: HTMLParagraphElement = document.createElement("p");
      paragraph.textContent = replyText;
      messageElement.textContent = "";
      messageElement.appendChild(paragraph);

      const inputEvent = new Event("input", { bubbles: true });
      messageElement.dispatchEvent(inputEvent);

      const label: HTMLElement | null = document.querySelector(".msg-form__placeholder");
      if (label) {
        label.removeAttribute("data-placeholder");
      }

      const sendButton: HTMLElement | null = document.querySelector(".msg-form__send-button");
      if (sendButton) {
        sendButton.removeAttribute("disabled");
      }
      setGenerated(false);
    }
  };

  return (
    <>
      <div
        className="modal flex flex-col bg-white p-4 rounded-[15px] shadow-2xl font-custom1 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999999]"
        style={{
          display: modalVisible ? "flex" : "none",
          maxHeight: "80vh", 
          overflowY: "auto" 
        }}
      
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            {promptModalVisible ? (
              <div className="chat-area flex flex-col w-[450px] py-4 gap-y-4 rounded">
                <div className="message bg-[#DFE1E7] p-2 rounded-[10px] self-end" style={{ display: generated ? "flex" : "none" }}>
                  <p className="text-[#666D80] text-[15px]">{prompt}</p>
                </div>
                <div className="reply flex bg-[#DBEAFE] rounded-lg p-2 w-[300px]" style={{ display: generated ? "flex" : "none" }}>
                  <p
                    contentEditable
                    className="reply-msg text-[#666D80] text-[15px]"
                    onInput={(e) => setContent(e.currentTarget.textContent || "")}
                  >
                    {content}
                  </p>
                </div>
              </div>
            ) : (
              <div></div>
            )}

            <div className="first-input mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleGenerateClick();
                  }
                }}
                className="text-[#666D80] text-[15px] p-2 w-[450px] border border-[#C1C7D0] rounded-[8px]"
                placeholder="Your prompt"
              />
            </div>

            <div className="second-button flex justify-end items-center">
              {!generated ? (
                <ButtonComponent
                  label="Generate"
                  action={handleGenerateClick}
                  image={Generate}
                  buttonClass="px-4 py-2 text-[15px] bg-[#3B82F6] flex flex-row text-white rounded-[8px] gap-2"
                  ImgClass="h-[18px] w-[14px] pt-1"
                />
              ) : (
                <div className="flex flex-row gap-x-2">
                  <ButtonComponent
                    label="Insert"
                    action={handleInsertClick}
                    image={Input}
                    buttonClass="px-4 py-2 text-[15px] bg-white flex flex-row text-[#666D80] border border-[#666D80] rounded-lg gap-2"
                    ImgClass="w-[11px] pt-2"
                  />

                  <ButtonComponent
                    label="Regenerate"
                    action={handleRegenerateClick}
                    image={Reload}
                    buttonClass="px-4 py-2 text-[15px] bg-[#3B82F6] flex flex-row text-white rounded-lg gap-2"
                    ImgClass="h-[19px] w-[13px] pt-1"
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {modalVisible ? (
        <div onClick={handleCloseModal} className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 z-10"></div>
      ) : null}
    </>
  );
};

export default PromptModal;
