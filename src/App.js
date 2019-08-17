import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import NavBar from './components/NavBar'
import BodyList from './components/BodyList'

class App extends Component {
  state = {
    label: []
  }

  updateLabel = (arr) => {
    this.setState({ label: arr })
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar label={this.state.label} />
        <BodyList updateLabel={this.updateLabel} />
      </React.Fragment>
    );
  }
}

export default App