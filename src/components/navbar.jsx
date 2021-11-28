import React, { PureComponent } from 'react';
import styles from './navbar.module.css';

class Navbar extends PureComponent {
  formRef = React.createRef();
  inputRef = React.createRef();

  onClick = () => {
    this.props.onReload();
    this.formRef.current.reset();
  };

  onSubmit = (event) => {
    event.preventDefault();
    const keyword = this.inputRef.current.value;
    keyword && this.props.onSearch(keyword);
  };

  render() {
    return (
      <header className={styles.navbar}>
        <div className={styles.wrapper}>
          <div className={styles.logo} onClick={this.onClick}>
            <img src="/images/logo.png" alt="Youtube" />
            <span>Youtube</span>
          </div>
          <form
            ref={this.formRef}
            className={styles.search}
            onSubmit={this.onSubmit}
          >
            <input ref={this.inputRef} type="text" placeholder="검색" />
            <button>
              <img src="/images/search.png" alt="검색" />
            </button>
          </form>
        </div>
      </header>
    );
  }
}

export default Navbar;
