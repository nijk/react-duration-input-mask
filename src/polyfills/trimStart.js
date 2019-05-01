(function trimStartPolyfill(w) {
  const { String } = w;

  (({ prototype: proto }) => {
    // eslint-disable-next-line no-param-reassign
    proto.trimStart = proto.trimStart || proto.trimLeft || (() => this.replace(/^\s+/, ''));
  })(String);
}(window));
