import React from "react";
import { withTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class Label extends React.Component {
  constructor(props) {
    super(props);
    const { t } = props;
    const defaultLabel = t("label.default");
    this.state = {
      name: `${defaultLabel}${props.index}`,
      isFeeding: false,
      intervalID: null
    };
  }

  render() {
    const half = { width: "50%" };
    return (
      <div>
        <TextField
          style={half}
          placeholder={this.state.name}
          onChange={e => {
            this.setState({
              name: e.target.value
            });
          }}
        />
        {this.renderButton()}
      </div>
    );
  }

  renderButton() {
    const { classifier, setTargetLabel, targetLabel, t } = this.props;
    const { name, isFeeding, intervalID } = this.state;
    const buttonStatus = isFeeding
      ? t("status.stopLearning")
      : t("status.startLearning");
    const half = { width: "50%" };
    return (
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
              count++;
              this.props.statusUpdater(status);
              classifier.addImage(name);
            }, 100);
            this.setState({
              isFeeding: true,
              intervalID: intervalID
            });
          }

          if (targetLabel === name && isFeeding) {
            clearInterval(intervalID);
            setTargetLabel(null);
            this.setState({
              isFeeding: false
            });
          }
        }}
      >
        {buttonStatus}
      </Button>
    );
  }
}

export default withTranslation()(Label);
