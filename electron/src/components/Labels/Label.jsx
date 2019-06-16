import React, { useState, useContext } from "react";
import { withTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { StatusContext, LabelContext } from "../../contexts";

const half = { width: "50%" };

const Label = ({ t, index, classifier }) => {
  const defaultLabel = t("label.default");

  const { setStatus } = useContext(StatusContext);
  const { targetLabel, setTargetLabel } = useContext(LabelContext);

  const [isFeeding, setIsFeeding] = useState(false);
  const [name, setName] = useState(`${defaultLabel}${index}`);
  const [intervalID, setIntervalID] = useState(null);

  const buttonStatus = isFeeding
    ? t("status.stopLearning")
    : t("status.startLearning");

  return (
    <div>
      <TextField
        style={half}
        placeholder={`${defaultLabel}${index}`}
        onChange={e => {
          setName(e.target.value);
        }}
      />
      <Button
        style={half}
        variant="outlined"
        color="primary"
        onClick={() => {
          if (targetLabel === null) {
            setTargetLabel(name);
            let count = 1;
            const intervalID = setInterval(() => {
              const status = t("status.feeding", { name, count });
              setStatus(status);
              count++;
              classifier.addImage(name);
            }, 100);
            setIntervalID(intervalID);
            setIsFeeding(true);
          }

          if (targetLabel === name && isFeeding) {
            clearInterval(intervalID);
            setTargetLabel(null);
            setIsFeeding(false);
          }
        }}
      >
        {buttonStatus}
      </Button>
    </div>
  );
};

export default withTranslation()(Label);
