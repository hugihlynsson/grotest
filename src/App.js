import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {Editor, EditorState, ContentState, CompositeDecorator} from 'draft-js';

import Roundness from './Roundness';
import styles from './App.css';


function random(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function altStrategy(contentBlock, callback) {
  for (let index = 0; index < contentBlock.getLength(); index += 1) {
    if (random(index) > 0.5) {
      callback(index, index + 1);
    }
  }
}

const AltSpan = (props) => (
  <span {...props} style={{fontFamily: 'GrotestRectangular'}}>
    {props.children}
  </span>
);

AltSpan.propTypes = {
  children: PropTypes.any,
};

export default class App extends Component {

  constructor(props) {
    super(props);
    const altDraftDecroator = {
      strategy: altStrategy,
      component: AltSpan,
    };
    const compositeDecorator = new CompositeDecorator([altDraftDecroator]);
    const contentState = ContentState.createFromText('Eeeey!\nLetrið er hugsað aðeins fyrir þig. ');
    const editorState = EditorState.createWithContent(contentState, compositeDecorator);
    this.state = {
      background: 'yellow',
      editorState: EditorState.moveFocusToEnd(editorState),
      fontSize: 7,
      roundness: 1,
      textAlign: 'left',
    };
  }

  onEditorChange = (editorState) => this.setState({editorState});

  setRoundness = (roundness) => this.setState({roundness});

  focusEditor = () => this.editor.focus();

  handleAlignClick = (textAlign) => this.setState({textAlign});

  render() {
    const {editorState, fontSize, textAlign, roundness, background} = this.state;

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
            onClick={::this.focusEditor}
            style={{textAlign, fontSize: `${fontSize}vw`}}
          >
            <Editor
              editorState={editorState}
              onChange={::this.onEditorChange}
              ref={(c) => {this.editor = c;}}
              stripPastedStyles
            />
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

        <div className={styles.newBorder}>
          V<span className={styles.type__alt}>e</span>ry new!
          Very n<span className={styles.type__alt}>e</span>w! Very
          n<span className={styles.type__alt}>e</span>w! Very
          n<span className={styles.type__alt}>e</span>w!
          V<span className={styles.type__alt}>e</span>ry new!
          V<span className={styles.type__alt}>e</span>ry
          n<span className={styles.type__alt}>e</span>w! Very
          n<span className={styles.type__alt}>e</span>w! Very new!
          V<span className={styles.type__alt}>e</span>ry new! Very new!
          V<span className={styles.type__alt}>e</span>ry new!
        </div>

        <Roundness background={background} onChange={::this.setRoundness} value={roundness} />
      </div>
    );
  }
}
