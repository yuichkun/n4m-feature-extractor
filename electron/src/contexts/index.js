import React from "react";

export const StatusContext = React.createContext({
  status: "status.ready",
  setStatus: () => {}
});
export const LabelContext = React.createContext({
  labelCount: 2,
  setLabelCount: () => {},
  targetLabel: null,
  setTargetLabel: () => {}
});
