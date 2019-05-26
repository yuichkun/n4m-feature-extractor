import React from 'react';
import { withTranslation, Trans } from 'react-i18next';

class Label extends React.Component {

  constructor(props) {
    super(props);
    const { t } = props; 
    const defaultLabel = t('label.default');
    this.state = {
      name: `${defaultLabel}${props.index}`,
      isFeeding: false,
      intervalID: null,
    };
  }

  render() {
    return (
      <div>
        <input
          type="text" 
          value={this.state.name}
          onChange={e => {
            this.setState({
              name: e.target.value,
            })
          }}
        ></input>
        { this.renderButton()}
      </div>
    );
  }

  renderButton() {
    const { classifier, setTargetLabel, targetLabel, t } = this.props;
    const { name, isFeeding, intervalID } = this.state;
    const buttonStatus = isFeeding ? t('status.stopLearning') : t('status.startLearning');
    return (
      <button onClick={
        () => {
          if (targetLabel === null) {
            setTargetLabel(name);
            let count = 1;
            const intervalID = setInterval(
              () => {
                const status = t('status.feeding', {name, count});
                count++;
                this.props.statusUpdater(status);
                classifier.addImage(name);
              },
              100
            );
            this.setState({
              isFeeding: true,
              intervalID: intervalID,
            });
          }
          
          if(targetLabel === name && isFeeding){
            clearInterval(intervalID);
            setTargetLabel(null);
            this.setState({
              isFeeding: false,
            });
          }
        }
      }>
        {buttonStatus}
      </button>
    );  
  }

}

export default withTranslation()(Label);