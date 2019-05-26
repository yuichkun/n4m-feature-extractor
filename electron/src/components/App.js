import React from 'react';
import Label from './Label';
import ml5 from 'ml5';
import { withTranslation } from 'react-i18next';

class App extends React.Component {

  constructor(props){
    super(props);
    const { t } = props; 
    this.onClassified = this.onClassified.bind(this);
    this.state = {
      status: t('status.ready'),
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
    const { t } = this.props;
    return (
      <div>
        <span>{t('status.header')}: </span>
        <span>{status}</span>
      </div>
    );
  }

  renderSelector() {
    const options = [];
    for (let i = 2; i <= 10; i++){
      options.push(<option key={`option-${i}`} value={i}>{i}</option>);
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
    const { t } = this.props;
    const { classifier } = this.state;
    return (
      <button
        onClick={ async () => {
          await classifier.train(loss => {
            const status = t('status.loss', { loss });
            this.setState({
              status
            });
          });
          const status = t('status.doneTraining');
          this.setState({ status });
          this.classify();
        }}
      >
      { t('status.startTraining')}
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
    const topResult = results[0];
    const { confidence } = topResult;
    const status = confidence > 0.8 ? topResult.label : "undetectable";
    this.setState({status});
    const { socket } = this.props;
    socket.emit('dispatch', {
      data: status
    });
    this.classify();
  }

}

export default withTranslation()(App);