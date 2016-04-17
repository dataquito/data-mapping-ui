import React from 'react';
import { render } from 'react-dom';

const Sample = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Sample Component</h1>
      </div>
    );
  }
});

render(<Sample />, document.getElementById('react-root'));
