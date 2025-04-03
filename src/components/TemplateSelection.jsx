import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectionModal from "../ui/SelectionModal";
import axios from "axios";
import { createUrlBackend } from "../Config/generalFunctions";
import Loader from "../ui/Loader";
import NoDataYet from "../ui/NoDataYet";
import TemplateBanner from "../ui/TemplateBanner";
import TemplateCard from "../ui/TemplateCard";
import { templates } from "./Home/Home";
import AllSvgs from "../assets/AllSvgs";

const TemplateSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [userTemplates, setUserTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTemplates, setFilteredTemplates] = useState([]);

  // const filteredTemplates = userTemplates?.filter((template) => {
  //   const categoryMatch =
  //     selectedCategory === "All" || template.category === selectedCategory;
  //   const platformMatch =
  //     selectedPlatform === "all" || template.platform === selectedPlatform;
  //   return categoryMatch && platformMatch;
  // });

  // async function fetchTemplates() {
  //   setIsLoading(true);
  //   try {
  //     const { url, headers } = createUrlBackend();
  //     const res = await axios.get(url, { headers });
  //     setUserTemplates(res.data.data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.log("error", error.message);
  //   }
  // }

  // useEffect(() => {
  //   fetchTemplates();
  // }, []);

  // function toggleModal() {
  //   setShowModal((prev) => !prev);
  // }

  useEffect(() => {
    const filtered = templates.filter((el) =>
      el.title?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    setFilteredTemplates(filtered);
  }, [searchQuery]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-8">
        <TemplateBanner
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
      </div>
      <div>
        <div className="w-full flex items-center justify-between gap-4 h-[4.5rem]">
          <div
            className="w-[15rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer"
            // onClick={() => {
            //   dispatch({
            //     type: "user/canvasSize",
            //     payload: { width: "1300", height: "600" },
            //   });
            //   navigate("/editor/new");
            // }}
          >
            <AllSvgs type={"customIcon"} />
            <p className="text-[#181818] text-base font-[600]">Custom</p>
          </div>
          <div
            className="w-[15rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer"
            // onClick={() => {
            //   dispatch({
            //     type: "user/canvasSize",
            //     payload: { width: "1080", height: "1080" },
            //   });
            //   navigate("/editor/new");
            // }}
          >
            <AllSvgs type={"postIcon"} />
            <div>
              <p className="text-[#181818] text-base font-[600]">Post</p>
              <p className="text-[#535353] text-xs font-[400]">(1080x1080)</p>
            </div>
          </div>
          <div
            className="w-[15rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer"
            // onClick={() => {
            //   dispatch({
            //     type: "user/canvasSize",
            //     payload: { width: "1200", height: "628" },
            //   });
            //   navigate("/editor/new");
            // }}
          >
            <AllSvgs type={"landscapeIcon"} />
            <div>
              <p className="text-[#181818] text-base font-[600]">Landscape</p>
              <p className="text-[#535353] text-xs font-[400]">(1200x628)</p>
            </div>
          </div>
          <div
            className="w-[15rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer"
            // onClick={() => {
            //   dispatch({
            //     type: "user/canvasSize",
            //     payload: { width: "1080", height: "1920" },
            //   });
            //   navigate("/editor/new");
            // }}
          >
            <AllSvgs type={"storyIcon"} />
            <div>
              <p className="text-[#181818] text-base font-[600]">Story</p>
              <p className="text-[#535353] text-xs font-[400]">(1080x1920)</p>
            </div>
          </div>
          <div
            className="w-[15rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer"
            // onClick={() => {
            //   dispatch({
            //     type: "user/canvasSize",
            //     payload: { width: "1080", height: "1350" },
            //   });
            //   navigate("/editor/new");
            // }}
          >
            <AllSvgs type={"verticalIcon"} />
            <div>
              <p className="text-[#181818] text-base font-[600]">Vertical</p>
              <p className="text-[#535353] text-xs font-[400]">(1080x1350)</p>
            </div>
          </div>
          <div
            className="w-[15rem] h-full p-4 flex items-center justify-start gap-5 border border-[#E2E2E2] rounded-xl cursor-pointer"
            // onClick={() => {
            //   dispatch({
            //     type: "user/canvasSize",
            //     payload: { width: "1000", height: "1500" },
            //   });
            //   navigate("/editor/new");
            // }}
          >
            <AllSvgs type={"pinIcon"} />
            <div>
              <p className="text-[#181818] text-base font-[600]">Pin</p>
              <p className="text-[#535353] text-xs font-[400]">(1000x1500)</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mt-6">
          {isLoading && <Loader />}
          {!isLoading &&
            filteredTemplates?.map((el, i) => {
              return (
                !el?.isDeleted && (
                  <div key={i}>
                    <TemplateCard
                      imgFile={el.imgFile}
                      title={el.title}
                      platform={el.platform}
                      idx={i}
                    />
                  </div>
                )
              );
            })}
        </div>
      </div>
      {/* <SelectionModal
        isOpen={showModal}
        onClose={toggleModal}
        selectedTemplateId={selectedTemplateId}
        userTemplates={userTemplates}
        selectedImage={selectedImage}
        fetchTemplates={fetchTemplates}
      /> */}
    </div>
  );
};

export default TemplateSelection;
