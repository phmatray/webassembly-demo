import React from 'react';

export default class App extends React.Component {
  state = {
    isLoading: true,
    name: 'Philippe'
  };

  async componentDidMount() {
    const response = fetch('http://localhost:3000');
    const result = await WebAssembly.instantiateStreaming(
      response,
      go.importObject
    );
    go.run(result.instance);
    this.setState({ isLoading: false });
  }

  handleSayHello = () => {
    // This line call the webAssembly function
    sayHello(this.state.name, (err, message) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(message);
    });
  };

  render() {
    return (
      <div>
        <h1>Web Assembly with React and Go 1.12</h1>

        {this.state.isLoading ? (
          <div>Loading</div>
        ) : (
          <div>
            <button onClick={sayHi}>Click to say Hi in console!</button>
            <button onClick={this.handleSayHello}>
              Click to send a value from Client!
            </button>
          </div>
        )}
      </div>
    );
  }
}
