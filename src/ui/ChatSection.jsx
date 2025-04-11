import React, { useState, useRef, useEffect } from "react";
import { importConfig } from "../Config/importConfig";
import AllSvgs from "../assets/AllSvgs";
import Cookies from "universal-cookie";
import dayjs from "dayjs";
import { convertFile, getToken, getUserId } from "../Config/generalFunctions";
import imageCompression from "browser-image-compression";
import { mainConfig } from "../Config/mainConfig";

const ChatSection = () => {
  const cookies = new Cookies(null, { path: "/" });
  const msgContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [documents, setDocuments] = useState([]);
  const [messages, setMessages] = useState([
    {
      sender: "user",
      text: "Generate an ad image for a new smart watch we just launched? It’s sleek, black, with a curved AMOLED display.",
      time: "2:45 PM",
    },
    {
      sender: "ai",
      text: `A sleek black smart watch with a curved AMOLED screen, worn by a young adult jogging through a modern city at dawn. Watch displays heart rate tracking. Bold text overlay: “New arrival.” Stylish, high-res, realistic ad style.`,
      time: "2:45 PM",
    },
  ]);

  const [input, setInput] = useState("");

  async function fileUpload(file) {
    console.log("file from compress func", file);
    try {
      let userId = getUserId();
      let token = getToken();

      if (file.type.startsWith("image/")) {
        let count = 0;

        if (file.size > 1000000 && count <= 50) {
          try {
            const compressedImage = await imageCompression(file, {
              maxSizeMB: 1,
              maxWidthOrHeight: 1024,
              useWebWorker: true,
              initialQuality: 1 - count * 0.05,
            });
            count++;

            file = compressedImage;
          } catch (compressionError) {
            console.error("Error compressing image:", compressionError);
          }
        }
      }

      const formData = new FormData();
      formData.append("uploaded_file", file);

      const response = await fetch(`https://api.questlabs.ai/api/upload-img`, {
        method: "POST",
        headers: {
          userId,
          token,
          apikey: mainConfig.QUEST_API_KEY,
        },
        body: formData,
      });

      return await response.json();
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error: "File upload failed",
      };
    }
  }

  async function onFileSelect(newFile) {
    try {
      if (documents.some((item) => item.metadata?.isLoading)) return;

      if (documents.length === 5) {
        throw new Error("Only 5 documents are allowed");
      }

      setDocuments((prev) => [...prev, newFile]);

      if (newFile?.metadata?.isLoading) {
        const uploadResponse = await fileUpload(newFile.metadata.file);
        if (!uploadResponse?.success) {
          setDocuments((prev) => prev.slice(0, -1));
          throw new Error(uploadResponse?.message);
        }

        newFile.source.url = uploadResponse.imageUrl;
        delete newFile.metadata?.file;
        delete newFile.metadata?.base64;
        delete newFile.metadata?.isLoading;

        setDocuments((prev) => {
          prev[prev.length - 1] = newFile;
          return [...prev];
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleFiles = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file.type.startsWith("image") && file.size > 1048575) {
        throw new Error("File size must be smaller than 1 MB");
      }

      const convertFileResponse = await convertFile(file);

      if (!convertFileResponse?.success) {
        throw new Error(convertFileResponse.error);
      }

      onFileSelect(convertFileResponse.data);
    } catch (error) {
    } finally {
      inputRef.current.value = "";
    }
  };
  const removeImage = (index) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSend = () => {
    if (!input.trim() && documents?.length === 0) return;

    const newMessage = {
      sender: "user",
      text: input || "",
      time: dayjs().format("h:mm A"),
      files: documents,
    };
    setMessages([...messages, newMessage]);
    setInput("");
    setDocuments([]);
  };

  useEffect(() => {
    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-[30rem] h-full flex flex-col justify-end p-5">
      {/* Chat messages */}
      <div
        className="overflow-y-auto mb-5 flex flex-col gap-5"
        ref={msgContainerRef}
      >
        {messages?.map((msg, i) => (
          <div
            className="flex flex-col gap-[0.62rem] justify-end items-end"
            key={i}
          >
            <div
              className={`flex gap-[0.62rem] ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "ai" && (
                <div className="w-8 h-8 rounded-full bg-[#E2E2E2] flex items-center justify-center">
                  <img
                    src={importConfig.nexaShortLogo}
                    alt="nexaShortLogo"
                    className="w-full rounded-full object-contain"
                  />
                </div>
              )}
              <div
                className={`w-full p-3 rounded-md border border-[#E2E2E2] bg-white`}
              >
                <div className="text-[#181818] px-[0.88rem] py-[0.62rem] text-sm font-[400] text-start">
                  {msg.text}
                </div>
                {msg?.files?.length > 0 && (
                  <div className="flex flex-col gap-2 mt-2">
                    {msg.files?.map((file, index) => {
                      return (
                        <div key={index} className="w-full">
                          {file?.documentType === "image" && (
                            <img
                              src={file.source.url}
                              alt={file.name}
                              className="max-w-xs rounded-md border"
                            />
                          )}
                          {file.metadata?.typeName === "pdf" && (
                            <a
                              href={file.source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm"
                            >
                              📄 {file.title}
                            </a>
                          )}
                          {file.metadata?.typeName === "document" && (
                            <a
                              href={file.source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm"
                            >
                              📄 {file.title}
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              {msg.sender === "user" && (
                <div className="min-w-8 max-w-8 w-8 h-8 rounded-full bg-[#E2E2E2] flex items-center justify-center">
                  {cookies.get("avatar" || "") ? (
                    <img
                      src={cookies.get("avatar" || "")}
                      alt="avatar"
                      className="w-full rounded-full object-contain"
                    />
                  ) : (
                    <AllSvgs type={"humanIcon"} fillColor={"#181818"} />
                  )}
                </div>
              )}
            </div>
            <div
              className={`w-[90%] flex items-center ${
                msg.sender === "user" ? "justify-end mr-10" : "justify-between"
              }`}
            >
              <p className="text-xs text-gray-400">{msg.time}</p>
              {msg.sender === "ai" && (
                <div className="flex gap-[0.38rem]">
                  <button>
                    <AllSvgs type={"regenerateIcon"} />
                  </button>
                  <button>
                    <AllSvgs type={"likeIcon"} />
                  </button>
                  <button>
                    <AllSvgs type={"disLikeIcon"} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        className="w-full h-auto border border-[#535353] rounded-[0.75rem] p-4 flex flex-col gap-1 justify-between"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          boxShadow: "0px 0px 0px 7.757px rgba(255, 255, 255, 0.03) inset",
        }}
      >
        {documents.length > 0 && (
          <div className="w-full flex items-center justify-start gap-4">
            {documents.length > 0 &&
              documents?.map((el, i) => (
                <div
                  className="flex items-center gap-[0.62rem] bg-[#E2E2E2] rounded-md p-2 relative"
                  key={i}
                >
                  <div className="rounded-md bg-[#2C2C2C] flex items-center p-[0.38rem]">
                    <AllSvgs type={"fileIcon"} />
                  </div>
                  <span className="text-[#545454] text-sm font-[500]">
                    {el.name}
                  </span>
                  <button
                    className="absolute right-[-0.5rem] top-[-0.5rem] rounded-full bg-white"
                    onClick={() => removeImage(i)}
                  >
                    <AllSvgs type={"cancelIcon"} />
                  </button>
                </div>
              ))}
          </div>
        )}
        <input
          type="file"
          ref={inputRef}
          accept=".pdf,.doc,.docx,.csv,.txt,.jpg,.png,.gif,.webp"
          onChange={handleFiles}
          className="hidden"
          id="file-upload"
        />
        <div>
          <input
            type="text"
            name="input"
            id="input"
            value={input}
            placeholder="Describe your product to create  ads ..."
            className="bg-transparent outline-none w-full text-[#181818] text-sm font-[500] placeholder:text-[#979797] text-ellipsis overflow-hidden whitespace-nowrap"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="w-full flex items-center justify-between">
          <button
            className="w-[1.8rem] h-[1.8rem] rounded-full flex items-center justify-center p-[0.38rem]"
            style={{ background: "rgba(255, 255, 255, 0.5)" }}
            onClick={() => inputRef.current?.click()}
          >
            <AllSvgs type={"attachFile"} />
          </button>
          <button onClick={handleSend} className="w-[6.8rem] h-8">
            <img
              src={importConfig.generateButton}
              alt="generateButton"
              className="w-full object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
