import React, { useContext } from "react";
import Label from "./Label";
import { LabelContext } from "../../contexts";

const Labels = ({ classifier }) => {
  const labels = [];
  const { labelCount, targetLabel } = useContext(LabelContext);

  for (let i = 1; i <= labelCount; i++) {
    labels.push(
      <Label
        key={i}
        index={i}
        classifier={classifier}
        targetLabel={targetLabel}
        setTargetLabel={newTarget => {
          this.setState({
            targetLabel: newTarget
          });
        }}
      />
    );
  }
  return labels;
};

export default Labels;
