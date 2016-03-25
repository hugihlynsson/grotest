import React, {Component} from 'react';
import Typer from './Typer';
import styles from './App.css';

// Don't do stateless for hot-reloading
// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {
  render() {
    return (
      <span>
        <h1 className={styles.header}>Grotest 123</h1>
        <Typer name="Test1" />
        <Typer name="Test2" />
        <Typer name="Test3" />
      </span>
    );
  }
}
