import React, { useContext } from "react";
import { withTranslation } from "react-i18next";
import { StatusContext } from "../contexts";

const half = {
  display: "inline-block",
  width: "50%"
};

const Status = ({ t }) => {
  const { status } = useContext(StatusContext);
  return (
    <div>
      <span style={half}>{t("status.header")}: </span>
      <span style={half}>
        {Array.isArray(status) ? t(...status) : t(status)}
      </span>
    </div>
  );
};
export default withTranslation()(Status);
