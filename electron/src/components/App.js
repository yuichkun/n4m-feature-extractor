import React from 'react';
import Label from './Label';
import ml5 from 'ml5';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.onClassified = this.onClassified.bind(this);
    this.state = {
      status: 'ready',
      nOfLabels: 2,
      targetLabel: null,
      classifier: null,
    };
  }

  async componentDidMount() {
    const videoEl = document.getElementById('video');
    videoEl.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
    this.setClassifier();
  }
  setClassifier() {
    const videoEl = document.getElementById('video');
    const featureExtractor = ml5.featureExtractor(
      'MobileNet',
      {
        numClasses: 4,
      }
    );
    const classifier = featureExtractor.classification(videoEl, () => {
      console.log('Video Ready');
    });
    this.setState({
      classifier
    })
  }

  render() {
    return (
      <div>
        { this.renderStatus()}
        { this.renderSelector() }
        { this.renderLabels() }
        { this.renderGo() }
      </div>
    );
  }

  renderStatus() {
    const { status } = this.state;
    return (
      <div>
        <span>Status: </span>
        <span>{status}</span>
      </div>
    );
  }

  renderSelector() {
    const options = [];
    for (let i = 2; i <= 10; i++){
      options.push(<option value={i}>{i}</option>);
    }
    return (
      <select value={this.state.nOfLabels} onChange={e => {
        this.setState({
          nOfLabels: e.target.value,
        })
      }}>
        { options }
      </select>
    );
  }

  renderLabels() {
    const { targetLabel, classifier, nOfLabels } = this.state;
    const labels = [];
    for (let i = 1; i <= nOfLabels; i++){
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
          statusUpdater={status => {
            this.setState({ status });
          }}
        />
      );
    }
    return labels;
  }

  renderGo() {
    const { classifier } = this.state;
    return (
      <button
        onClick={ async () => {
          await classifier.train(loss => {
            const status = `loss ${loss}`;
            this.setState({
              status
            });
          });
          const status = 'Done Training';
          this.setState({ status });
          this.classify();
        }}
      >
       Train&Start Classifying
      </button>
    );
  }

  classify() {
    const { classifier } = this.state;
    const { onClassified } = this;
    classifier.classify(onClassified);
  }

  onClassified(err, results){
    if(err) return;
    debugger;
    const result = results[0].label;
    this.setState({status: result});
    const { socket } = this.props;
    socket.emit('dispatch', {
      data: result
    });
    this.classify();
  }

}