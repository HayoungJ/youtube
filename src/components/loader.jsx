import React, { Component } from 'react';
import styles from './loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={styles.loader}>
        <div className={styles['lds-ring']}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Loader;
