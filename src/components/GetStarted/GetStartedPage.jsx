import { GetStarted } from "@questlabs/react-sdk";
import { getToken, getUserId } from "../../Config/generalFunctions";
import { mainConfig } from "../../Config/mainConfig";

const GetStartedPage = () => {
  const clickAction = (link) => {};

  return (
    <div className="p-4">
      <div className="">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Adbot.ai!</h1>
          <p className="text-gray-600">
            Follow these steps to start creating amazing ads with AI.
          </p>
        </div>
        <div className="w-full">
          <GetStarted
            questId={mainConfig.QUEST_GET_STARTED_CAMPAIGN_ID}
            userId={getUserId()}
            token={getToken()}
            buttonBg="#979797"
            cardHeadingColor="#2C2C2C"
            cardDescColor="#979797"
            cardBorderColor="#EFEFEF"
            descriptionText={
              "Get started with Quest and explore how Quest can take your customer engagement to the next level "
            }
            arrowColor="#939393"
            onLinkTrigger={(e) => clickAction(e)}
            allowMultiClick
            styleConfig={{
              Form: {
                padding: "0px",
                background: "transparent",
              },
              Topbar: {
                padding: "20px 0px 12px",
              },
              Description: {
                color: "#6E6E6E",
                fontFamily: "Figtree",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                margin: "8px 0 0 0",
              },
              Icon: {
                background: "transparent",
              },
              CardContainer: {
                padding: "0px",
                marginTop: "12px",
              },
            }}
            showFooter={false}
          />
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
