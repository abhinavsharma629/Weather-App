import React, { Component } from "react";
import { TextArea, Input } from "semantic-ui-react";
import { Button } from "reactstrap";
import { Field } from 'redux-form'

var tab = 0;
var st = [];
var tab1 = 0;

export default class Comp extends Component {
  state = {
    value: "",
    val: ""
  };
onsel = e => {
    console.log(e.target)
    this.setState({val : e.target.value})
}
  onchange = e => {
    var val = String(e.target.value);
    var value1 = val;
    val = val.substring(0, val.length - 1);

    if (value1[value1.length - 1] === "}") {
      console.log(tab);
      if (tab > 0) tab = tab - 4;
      else tab = 0;
      //console.log(val);
      this.setState({ [e.target.name]: val + " ".repeat(tab) + "}" });
      console.log(val + " ".repeat(tab) + "}");
      //this.setState({ [e.target.name]: value1 });
    } else if (tab > 0) {
      this.setState({ [e.target.name]: e.target.value + " ".repeat(tab) });
      tab1 = tab;
      tab = 0;
    } else this.setState({ [e.target.name]: e.target.value });
  };
  onend = e => {
    var value = String(e.target.value);
    var value1 = value;
    value = value.substring(0, value.length - 1);
    console.log(value + " " + value1);
    this.setState({ [e.target.name]: e.target.value + " ".repeat(tab) });
    this.setState({ [e.target.name]: value1 });
  };

  onenter = e => {
    if (e.key === "Enter") {
      var charc = String(e.target.value);
      var length = charc.length;
      charc = charc[length - 1];
      tab = tab1;
      if (st.length !== 0) {
        if (st[st.length - 1] === "{") {
          if (charc === "}") {
            tab -= 4;
            st.pop();
            //this.onend(e);
          } else if (charc === "{") {
            st.push("{");
            tab += 4;
          }
        }
      } else {
        if (charc === "{") {
          tab += 4;
          st.push("{");
        }
      }
      tab1 = tab;
    }
  };

  onClick = () => {
    var data = document.getElementById("text").value;
    console.log(data);
    var file = new Blob([data], { type: ".java" });
    console.log(file.type);
    //document.getElementById("a").setAttribute("href", URL.createObjectURL(file));
    //window.open(URL.createObjectURL(file));
    console.log(file);
    //document.getElementById("a").setAttribute("download", "hydra.java");
  };
  render() {
    return (
      <React.Fragment>
        <div class="container">
          <TextArea
            placeholder="Write Your Code"
            id="text"
            cols={100}
            rows={20}
            name="value"
            style={{
              marginLeft: "20%",
              backgroundAttachment: "local",
              backgroundRepeat: "no-repeat",
              paddingLeft: "35px",
              paddingTop: "10px",
              borderColor: "#ccc"
            }}
            onChange={this.onchange}
            value={this.state.value}
            onKeyPress={this.onenter}
          />
          <div>
              <select onClick={() => this.sel}>
            <option></option>
            <option value="1" selected>Python</option>
            <option value="2">Java</option>
            <option value="3">C++</option>
            <option value="4">C</option>
            </select>
          </div>
          <Button onClick={this.onClick} style={{ marginLeft: "20%" }}>
            Run
          </Button>
        </div>
      </React.Fragment>
    );
  }
}
