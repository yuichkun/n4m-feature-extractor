import React from 'react';

export default class Label extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: `Label${props.index}`,
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
    const { classifier, setTargetLabel, targetLabel } = this.props;
    const { name, isFeeding, intervalID } = this.state;
    const buttonStatus = isFeeding ? 'Stop Learning' : 'Start Learning';
    return (
      <button onClick={
        () => {
          if (targetLabel === null) {
            setTargetLabel(name);
            let count = 1;
            const intervalID = setInterval(
              () => {
                const status = `Feeding ${name} ${count}`;
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