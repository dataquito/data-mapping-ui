var React = require('react');

var Sample = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Sample Component</h1>
      </div>
    );
  }
});

React.render(<Sample />, document.getElementById('react-root'));
