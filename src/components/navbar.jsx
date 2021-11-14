import React, { Component } from 'react';
import styles from './navbar.module.css';

class Navbar extends Component {
  render() {
    return (
      <header className={styles.navbar}>
        <div className={styles.wrapper}>
          <div className={styles.logo} onClick={this.props.onClickLogo}>
            <img
              src={process.env.PUBLIC_URL + '/images/logo.png'}
              alt="Youtube"
            />
            <span>Youtube</span>
          </div>
          <form className={styles.search}>
            <input type="text" placeholder="검색" />
            <button>
              <img
                src={process.env.PUBLIC_URL + '/images/search.png'}
                alt="검색"
              />
            </button>
          </form>
        </div>
      </header>
    );
  }
}

export default Navbar;
