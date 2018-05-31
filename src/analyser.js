export default class Analyser {
  constructor(audio) {
    const audioContext = new window.AudioContext(),
      source = audioContext.createMediaElementSource(audio);

    this.analyser = audioContext.createAnalyser();

    source.connect(this.analyser);
    this.analyser.connect(audioContext.destination);
    this.analyser.fftSize = 256;
    this.analyser.minDecibels = -100;
    this.analyser.maxDecibels = 0;
    this.analyser.smoothingTimeConstant = 0.8;

    this.bufferLength = this.analyser.frequencyBinCount;
    this.frequencyData = new Uint8Array(this.bufferLength);
  }

  get data() {
    this.analyser.getByteFrequencyData(this.frequencyData);
    return this.frequencyData;
  }

  get fttSize() {
    return this.analyser.fftSize;
  }
}
