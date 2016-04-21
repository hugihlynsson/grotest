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
    const contentState = ContentState.createFromText('Randomly mixed for your work! Write here. ');
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
          <h1 className={styles.title}>
            <svg className={styles.title__logo} viewBox="0 0 574 126" alt="Grotest">
              <path stroke="none" fill-rule="evenodd" d="M108.969,106.215 L96.969,106.215 L96.969,92.715 C89.469,102.165 77.62,108.914 61.421,109.064 C30.972,109.214 8.023,86.715 8.023,54.466 C8.023,22.367 30.972,0.018 61.421,0.018 C83.32,0.018 106.419,14.118 106.419,32.717 L90.819,32.717 C90.819,25.517 80.02,13.068 61.421,13.068 C38.772,13.068 23.922,30.768 23.922,54.466 C23.922,78.315 38.922,96.164 61.421,96.014 C84.07,95.864 95.92,81.465 95.469,63.616 L95.469,62.266 L62.02,62.266 L62.02,50.266 L108.968,50.266 L108.968,106.215 L108.969,106.215 Z M169.27,31.068 C174.67,29.718 181.42,29.868 185.47,31.668 L185.47,46.517 C180.22,44.717 173.17,44.717 168.071,46.217 C160.721,48.317 148.422,54.616 148.422,75.016 L148.422,107.115 L134.023,107.115 L134.023,32.117 L148.123,32.117 L148.423,48.617 C153.521,39.618 161.02,33.168 169.27,31.068 Z M195.971,69.616 C195.971,35.117 200.771,30.918 234.97,30.918 C269.018,30.918 273.818,35.118 273.818,69.616 C273.818,104.114 269.018,108.314 234.97,108.314 C200.771,108.314 195.971,104.115 195.971,69.616 Z M259.418,69.616 C259.418,47.267 256.868,42.467 234.969,42.467 C212.92,42.467 210.37,47.267 210.37,69.616 C210.37,91.965 212.92,96.765 234.969,96.765 C256.868,96.765 259.418,91.965 259.418,69.616 Z M310.869,79.216 C310.869,87.316 312.97,92.115 317.769,94.216 C321.668,95.866 329.918,95.716 334.718,94.666 L334.718,107.116 C327.968,108.466 317.169,108.765 309.82,105.616 C302.769,102.616 296.47,96.916 296.47,79.366 L296.47,44.117 L281.47,44.117 L281.47,32.117 L296.47,32.117 L296.47,12.018 L310.868,12.018 L310.868,32.117 L332.767,32.117 L332.767,44.117 L310.868,44.117 L310.868,79.216 L310.869,79.216 Z M362.019,72.766 C363.069,87.165 371.918,97.065 385.868,97.065 C401.318,97.065 407.018,88.815 407.768,83.566 L422.017,83.566 C420.367,96.765 408.967,109.065 385.868,109.065 C363.97,109.065 347.171,93.016 347.171,69.617 C347.171,46.518 363.97,30.169 385.868,30.169 C407.768,30.169 423.367,47.268 423.367,69.617 L423.367,72.767 L362.019,72.767 L362.019,72.766 Z M385.867,41.717 C373.868,41.717 365.318,49.667 362.619,61.666 L407.617,61.666 C405.518,49.217 398.018,41.717 385.867,41.717 Z M475.566,97.365 C490.416,97.365 494.166,95.115 494.166,85.966 C494.166,80.566 489.217,78.166 469.717,73.966 C447.518,69.166 441.969,64.966 441.969,53.116 C441.969,34.817 448.418,30.167 473.917,30.167 C499.716,30.167 506.166,34.817 506.166,53.116 L491.616,53.116 C491.616,44.116 488.016,41.866 473.617,41.866 C459.817,41.866 456.367,43.666 456.367,51.166 C456.367,55.516 460.267,57.466 476.167,61.366 C502.115,67.515 508.565,72.315 508.565,85.065 C508.565,104.264 501.965,109.064 475.267,109.064 C448.417,109.064 441.518,104.114 441.368,84.015 L456.218,84.015 C456.218,94.665 460.117,97.365 475.566,97.365 Z M545.467,79.216 C545.467,87.316 547.567,92.115 552.367,94.216 C556.265,95.866 564.515,95.716 569.316,94.666 L569.316,107.116 C562.566,108.466 551.766,108.765 544.417,105.616 C537.367,102.616 531.067,96.916 531.067,79.366 L531.067,44.117 L516.068,44.117 L516.068,32.117 L531.067,32.117 L531.067,12.018 L545.466,12.018 L545.466,32.117 L567.364,32.117 L567.364,44.117 L545.466,44.117 L545.466,79.216 L545.467,79.216 Z M0.074,125.862 L0.074,118.364 L573.817,118.364 L573.817,125.862 L0.074,125.862 Z" />
            </svg>
          </h1>
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
            Gr<span className={styles.type__alt}>o</span>te<span className={styles.type__alt}>s</span>t            is t<span className={styles.type__alt}>h</span>e c<span className={styles.type__alt}>u</span>lmin<span className={styles.type__alt}>a</span>tion of r<span className={styles.type__alt}>es</span>earch in sha<span className={styles.type__alt}>p</span>e <span className={styles.type__alt}>a</span>nd type c<span className={styles.type__alt}>o</span>mpositio<span className={styles.type__alt}>n</span>. The            ty<span className={styles.type__alt}>p</span>efac<span className={styles.type__alt}>e</span>          {' '}cont<span className={styles.type__alt}>a</span>ins tw<span className={styles.type__alt}>o</span> font<span className={styles.type__alt}>s</span>; <span className={styles.type__alt}>o</span>ne cir<span className={styles.type__alt}>cu</span>lar <span className={styles.type__alt}>a</span>nd the other re<span className={styles.type__alt}>c</span>&shy;tan<span className={styles.type__alt}>g</span>ular. They <span className={styles.type__alt}>g</span>en<span className={styles.type__alt}>e</span>r<span className={styles.type__alt}>a</span>te r<span className={styles.type__alt}>an</span>do<span className={styles.type__alt}>m</span>ly            when the us<span className={styles.type__alt}>e</span>r t<span className={styles.type__alt}>y</span>pes, <span className={styles.type__alt}>c</span>reatin<span className={styles.type__alt}>g</span> <span className={styles.type__alt}>a</span> <span className={styles.type__alt}>u</span>ni<span className={styles.type__alt}>q</span>ue t<span className={styles.type__alt}>yp</span>ographi<span className={styles.type__alt}>c</span>al p<span className={styles.type__alt}>a</span>ttern with <span className={styles.type__alt}>en</span>dless co<span className={styles.type__alt}>m</span>binati<span className={styles.type__alt}>o</span>ns.          </p>
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
