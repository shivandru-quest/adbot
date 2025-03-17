import { GetStarted } from "@questlabs/react-sdk";
import { getToken, getUserId } from "../../Config/generalFunctions";
import { mainConfig } from "../../Config/mainConfig";

const GetStartedPage = () => {
  const clickAction = (link) => {};

  return (
    <div className="p-4">
      <div className="">
        <div className="w-full">
          <GetStarted
            questId={mainConfig.QUEST_GET_STARTED_CAMPAIGN_ID}
            userId={getUserId()}
            template={4}
            autoHide={false}
            token={getToken()}
            buttonBg="#979797"
            cardHeadingColor="#2C2C2C"
            cardDescColor="#979797"
            cardBorderColor="#EFEFEF"
            descriptionText={""}
            arrowColor="#939393"
            onLinkTrigger={(e) => clickAction(e)}
            allowMultiClick
            styleConfig={{
              Form: {
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
              PrimaryButton: {
                borderRadius: "4px",
                border: "none",
              },
              SecondaryButton: {
                border: "none",
                background: "transparent",
                // color: "var(--color-premitive-grey-5)",
              },
              CardContainer: {
                padding: "0px",
                marginTop: "12px",
              },
            }}
            showFooter={false}
            showProgressBar={false}
          >
            <GetStarted.Header />
            <GetStarted.Content />
          </GetStarted>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
