import React, { Component, PropTypes } from 'react';
import { List, Map } from 'immutable';

class SingleHeaderEditor extends Component {
  static propTypes = {
    header: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  };

  onChange(e) {
    e.preventDefault();
    this.props.onChange(this.refs.header.value, this.refs.value.value);
  }

  onRemove(e) {
    e.preventDefault();
    this.props.onRemove();
  }

  render() {
    return (
      <div className="header">
        <input type="text" placeholder="Header" ref="header"
               value={this.props.header}
               onChange={this.onChange.bind(this)}/>
        <input type="text" placeholder="Value" ref="value"
               value={this.props.value}
               onChange={this.onChange.bind(this)}/>

        <a onClick={this.onRemove.bind(this)} href="#">-</a>
      </div>
    );
  }
}

export default class HeaderEditor extends Component {
  static defaultProps = {
    headers: new List()
  };

  static propTypes = {
    headers: React.PropTypes.instanceOf(List),
    onChange: PropTypes.func.isRequired
  };

  onChange(index) {
    return (newHeader, newValue) => {
      let headers = this.props.headers.set(index, new List([newHeader, newValue]));
      this.props.onChange(headers);
    };
  }

  addHeader(e) {
    e.preventDefault();

    let headers = this.props.headers.push(new List(['', '']));
    this.props.onChange(headers);
  }

  removeHeader(index) {
    return () => {
      let headers = this.props.headers.remove(index);
      this.props.onChange(headers);
    };
  }

  render() {
    return (
      <div className="header-editor">
        <span>Headers
          <a onClick={this.addHeader.bind(this)} href="#">+</a>
        </span>

        {this.props.headers.map(([header, value], index) => {
          return <SingleHeaderEditor key={index}
                                     header={header}
                                     value={value}
                                     onChange={this.onChange(index)}
                                     onRemove={this.removeHeader(index)}/>
        })}

      </div>
    );
  }
};
