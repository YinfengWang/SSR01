import React3 from 'react';
import Header from './Header.jsx';
class App extends React.Component {
  render() {
    return (
      <div key='q'>this is app   !
        <Header key='header'></Header>
      </div>
    );
  }
}
export default App;