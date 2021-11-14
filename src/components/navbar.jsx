import React, { Component } from 'react';
import styles from './navbar.module.css';

class Navbar extends Component {
  formRef = React.createRef();
  inputRef = React.createRef();

  onSubmit = (event) => {
    event.preventDefault();
    const keyword = this.inputRef.current.value;
    keyword && this.props.onSearch(keyword);
    this.formRef.current.reset();
  };

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
          <form
            ref={this.formRef}
            className={styles.search}
            onSubmit={this.onSubmit}
          >
            <input ref={this.inputRef} type="text" placeholder="검색" />
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
