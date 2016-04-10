import React, {Component} from 'react';
import classNames from 'classnames';

import styles from './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      background: 'white',
      fontSize: 10,
      roundness: 0,
      textAlign: 'center',
    };
  }

  componentDidMount = () => {
    const range = document.createRange();

    range.setStart(this.refs.typer__input, 1);
    window.getSelection().addRange(range);
    this.refs.typer__input.focus();
  }

  handleAlignClick = (textAlign) => this.setState({textAlign});

  render() {
    const {fontSize, textAlign, roundness, background} = this.state;

    return (
      <div className={classNames(styles.root, styles[`root--${background}`])}>

        <header className={styles.header}>
          <h1 className={styles.title}>Grotest</h1>
          <div className={styles.states}>
            <button
              className={classNames(
                styles.states__alignment,
                styles['states__alignment--left'],
                textAlign === 'left' && styles['states__alignment--selected'],
              )}
              onClick={() => this.handleAlignClick('left')}
            />
            <button
              className={classNames(
                styles.states__alignment,
                styles['states__alignment--center'],
                textAlign === 'center' && styles['states__alignment--selected'],
              )}
              onClick={() => this.handleAlignClick('center')}
            />
            <button
              className={classNames(
                styles.states__alignment,
                styles['states__alignment--right'],
                textAlign === 'right' && styles['states__alignment--selected'],
              )}
              onClick={() => this.handleAlignClick('right')}
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
        </section>

        <section className={styles.about}>
          <p className={styles.about__text}>
            Grotest liggur í hugleiðingum með stílhreint þægilegt og ferskt. Það er breitt, smá
            frekt og skín í gegn með fínni slípun á bogum, breiddum og línum. Test 01 er með lítla
            andstæðu (e. contrast) sem hentar vel fyrir augað. Hann er hugsaður sem fyrirsagnaletur
            og getur notast sem texta letur einnig. Í stöfum eins og A, N, M, V, v, W, w, 1, og 4 er
            að finna horn þar sem linurnar mætast seint, sem kryddar letrið einstaklega vel.
            Krókarnir á stöfunum eins og a, e og c eru skornir lárétt því hugsað er til kassalagað
            letursins eða Grotest 02 svo blandan á letrunum sé sjónlega þægilegri.
          </p>
        </section>

        <section className={styles.roundness}>
          <div className={styles.roundness__text}>
            Grotest
          </div>
          <input
            type="range"
            className={classNames(
              styles[`input--${background}`],
              styles['input--big'],
              styles.roundness__input,
            )}
            min={0}
            max={5}
            value={roundness}
            onChange={(event) => this.setState({roundness: event.target.value})}
          />
        </section>
      </div>
    );
  }
}
