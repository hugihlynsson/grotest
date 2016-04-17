import React, {Component} from 'react';
import classNames from 'classnames';

import Roundness from './Roundness';
import styles from './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      background: 'white',
      fontSize: 10,
      roundness: 1,
      textAlign: 'center',
    };
  }

  componentDidMount = () => {
    const range = document.createRange();

    range.setStart(this.refs.typer__input, 1);
    window.getSelection().addRange(range);
    this.refs.typer__input.focus();
  }


  setRoundness = (roundness) => this.setState({roundness});

  handleAlignClick = (textAlign) => this.setState({textAlign});

  render() {
    const {fontSize, textAlign, roundness, background} = this.state;

    return (
      <div className={classNames(styles.root, styles[`root--${background}`])}>

        <header className={styles.header}>
          <h1 className={styles.title}>Grotest</h1>
          <div className={styles.states}>
            <img
              className={classNames(
                styles.states__alignment,
                textAlign === 'left' && styles['states__alignment--selected'],
              )}
              src={require('./icons/AlignLeft.svg')}
              onClick={() => this.handleAlignClick('left')}
              alt="Align Left"
            />
            <img
              className={classNames(
                styles.states__alignment,
                textAlign === 'center' && styles['states__alignment--selected'],
              )}
              src={require('./icons/AlignCenter.svg')}
              onClick={() => this.handleAlignClick('center')}
              alt="Align Center"
            />
            <img
              className={classNames(
                styles.states__alignment,
                textAlign === 'right' && styles['states__alignment--selected'],
              )}
              src={require('./icons/AlignRight.svg')}
              onClick={() => this.handleAlignClick('right')}
              alt="Align Right"
            />
            <input
              type="range"
              className={styles[`input--${background}`]}
              min={1}
              max={20}
              value={fontSize}
              step="0.1"
              onChange={(event) => this.setState({fontSize: event.target.value})}
            />
            <button
              className={classNames(
                styles.states__backgroundToggle, styles['states__backgroundToggle--white']
              )}
              onClick={() => this.setState({background: 'white'})}
            />
            <button
              className={classNames(
                styles.states__backgroundToggle, styles['states__backgroundToggle--yellow']
              )}
              onClick={() => this.setState({background: 'yellow'})}
            />
            <button
              className={classNames(
                styles.states__backgroundToggle, styles['states__backgroundToggle--black']
              )}
              onClick={() => this.setState({background: 'black'})}
            />
          </div>
        </header>

        <section className={styles.typer}>
          <div
            className={styles.typer__input}
            contentEditable
            style={{textAlign, fontSize: `${fontSize}vw`}}
            ref="typer__input"
          >
            Halló, halló!
          </div>
          <div className={styles.typer__sticker}>Randomly Mixed!</div>
          <img
            alt="Go down"
            className={styles.arrow}
            src={require('./icons/Arrow.svg')}
          />
        </section>

        <section className={styles.about}>
          <p className={styles.about__text}>
            Grotest is the culmination of research in shape and type composition. The typeface            contains two fonts; one circular and the other rectangular. They generate randomly            when the user types, creating a unique typographical pattern with endless comnbinations.          </p>
          <img
            alt="Go down"
            className={styles.arrow}
            src={require('./icons/Arrow.svg')}
          />
        </section>

        <Roundness background={background} onChange={::this.setRoundness} value={roundness} />
      </div>
    );
  }
}
