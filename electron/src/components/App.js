import React from 'react';
import Label from './Label';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.onClassified = this.onClassified.bind(this);
    this.state = {
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
        <h1>App</h1>
        { this.renderSelector() }
        { this.renderLabels() }
        { this.renderGo() }
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
            console.log(`loss ${loss}`);
          });
          console.log('Done Training');
          this.classify();
        }}
      >
        GO
      </button>
    );
  }

  classify() {
    const { classifier } = this.state;
    const { onClassified } = this;
    classifier.classify(onClassified);
  }

  onClassified(err, result){
    if(err) return;
    console.log('result:',  result);
    const { socket } = this.props;
    socket.emit('dispatch', {
      data: result,
    });
    this.classify();
  }

}