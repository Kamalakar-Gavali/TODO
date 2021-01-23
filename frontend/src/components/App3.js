import ReactDOM from "react-dom";
import React, { Component } from "react";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      text: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  handleSubmit(e) {

    e.preventDefault();
    console.log(e);
    /* this.setState((prevState) => ({
      list: this.state.list.push(this.state.text), //prevState.list.concat(this.state.text),
      text: ""
    })); */
    const data = [...this.state.list];
    data.push(this.state.text);
    this.setState({ list: data, text: "" });
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  removeItem(index) {
    
     let data = [...this.state.list];
    console.log(data);
    //data.splice(index, 1);
    if(index===0)
    {
      data=data.slice(1);
    }
    else if(index===this.state.list.length-1)
    {
      data=data.slice(0,index);
    }
    else{
      data=data.slice(0,index)+data.slice(index+1);
    }
    console.log(data);
   this.setState({list:data});
   console.log(this.state.list);
    // this.setState((prevResult)=>{
    //  return {...prevResult, list:prevResult.list.splice(index,1)}
    // })
    //this.setState({ list: data.filter(element=>element!==data[index]) });
  }

  render() {
    return (
      <div>
        <h1>TODO LIST</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.text}
            onChange={(e) => this.handleChange(e)}
          />
          <button>Add</button>
          <ol>
            {this.state.list.map((item, index) => (
              <li key={index}>
                {item}
                <button type="button" onClick={() => this.removeItem(index)}>Delete</button>
              </li>
            ))}
          </ol>
        </form>
      </div>
    );
  }
}

//ReactDOM.render(<Todo />, document.getElementById("root"));
