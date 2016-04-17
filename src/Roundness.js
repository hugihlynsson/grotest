import React, {PropTypes} from 'react';
import classNames from 'classnames';

import styles from './Roundness.css';

const Roundness = ({onChange, value, background}) => (
  <section className={styles.root}>
    <div className={classNames(styles.text, styles[`text--${value}`])}>
      Grotest
    </div>
    <span style={{opacity: 0, fontSize: 1}} className={styles['text--1']}>
      &nbsp;
    </span>
    <span style={{opacity: 0, fontSize: 1}} className={styles['text--2']}>
      &nbsp;
    </span>
    <span style={{opacity: 0, fontSize: 1}} className={styles['text--3']}>
      &nbsp;
    </span>
    <span style={{opacity: 0, fontSize: 1}} className={styles['text--4']}>
      &nbsp;
    </span>
    <span style={{opacity: 0, fontSize: 1}} className={styles['text--5']}>
      &nbsp;
    </span>
    <span style={{opacity: 0, fontSize: 1}} className={styles['text--6']}>
      &nbsp;
    </span>
    <span style={{opacity: 0, fontSize: 1}} className={styles['text--7']}>
      &nbsp;
    </span>
    <span style={{opacity: 0, fontSize: 1}} className={styles['text--8']}>
      &nbsp;
    </span>

    <input
      type="range"
      className={classNames(
        styles[`input--${background}`],
        styles['input--big'],
        styles.input,
      )}
      min={1}
      max={8}
      value={value}
      onChange={(event) => onChange(parseInt(event.target.value, 10))}
    />
    <img
      alt="Go up"
      className={styles.arrow}
      src={require('./icons/Arrow.svg')}
    />
  </section>
);

Roundness.propTypes = {
  background: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default Roundness;
