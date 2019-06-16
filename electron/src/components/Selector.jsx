import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withTranslation } from "react-i18next";
import { LabelContext } from "../contexts";

const headingStyle = {
  display: "inline-block",
  width: "50%"
};
const selectStyle = {
  width: "50%"
};

const Selector = ({ t }) => {
  const menus = [];
  for (let i = 2; i <= 10; i++) {
    menus.push(
      <MenuItem key={`option-${i}`} value={i}>
        {i}
      </MenuItem>
    );
  }
  return (
    <LabelContext.Consumer>
      {({ labelCount, setLabelCount }) => {
        return (
          <div>
            <span style={headingStyle}>{t("label.numOfLabels")}</span>
            <Select
              value={labelCount}
              style={selectStyle}
              onChange={e => {
                setLabelCount(e.target.value);
              }}
            >
              {menus}
            </Select>
          </div>
        );
      }}
    </LabelContext.Consumer>
  );
};

export default withTranslation()(Selector);
