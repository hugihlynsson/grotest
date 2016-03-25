import React, {Component, PropTypes} from 'react';
import styles from './Typer.css';

// Don't do stateless for hot-reloading
// eslint-disable-next-line react/prefer-stateless-function
export default class App extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 'Sigurjón',
      size: 20,
    };
  }

  render() {
    const {name} = this.props;
    const {value, size} = this.state;
    return (
      <div className={styles.root}>
        <label className={styles.label} htmlFor={name}>
          {name}
        </label>
        <div className={styles.inputs}>
          <input
            autoComplete="off"
            className={styles.textInput}
            id="name"
            onChange={(event) => this.setState({value: event.target.value})}
            type="text"
            value={value}
            style={{fontSize: size}}
          />
          <input
            type="range"
            className={styles.sizeInput}
            min={10}
            max={150}
            value={size}
            onChange={(event) => this.setState({size: event.target.value})}
          />
        </div>
      </div>
    );
  }
}
