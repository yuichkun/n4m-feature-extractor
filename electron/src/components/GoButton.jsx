import React, { useContext } from "react";
import { withTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { StatusContext } from "../contexts";
import socket from "../utils/socket";

const GoButton = ({ classifier, t }) => {
  const { setStatus } = useContext(StatusContext);
  function classify() {
    classifier.classify((err, results) => {
      if (err) return;
      const topResult = results[0];
      const { confidence } = topResult;
      const { label } = topResult;
      const status =
        confidence > 0.8
          ? ["status.detected", { label }]
          : t("status.undetectable");
      setStatus(status);
      socket.emit("dispatch", {
        data: label
      });
      classify();
    });
  }
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={async () => {
        await classifier.train(loss => {
          const status = ["status.loss", { loss }];
          setStatus(status);
          classify();
        });
      }}
    >
      {t("status.startTraining")}
    </Button>
  );
};

export default withTranslation()(GoButton);
