import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Collapse, Calendar, Checkbox } from "antd";

import { logout } from "../../actions/user";

import "./Posts.css";
import TimeSlider from "./TimeSlider";

const { Panel } = Collapse;

class LeftSidebarPosts extends React.Component {
  logout = () => {
    this.props.logout().then(() => {
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          minHeight: "100%"
        }}
      >
        <Collapse className="meow-collapse" defaultActiveKey={["1"]}>
          <Panel className="full-width-panel" header="posts from" key="1">
            <div style={{ width: "100%", backgroundColor: "white" }}>
              <Calendar fullscreen={false} />
            </div>
          </Panel>
          <Panel header="section" key="2">
            <Checkbox>sports</Checkbox>
            <Checkbox>news</Checkbox>
            <Checkbox>opinion</Checkbox>
          </Panel>
          <Panel header="post time" key="3">
            <TimeSlider />
          </Panel>
          <Panel header="status" key="4">
            <Checkbox>ready to post</Checkbox>
            <Checkbox>draft</Checkbox>
            <Checkbox>sent</Checkbox>
          </Panel>
        </Collapse>
        <div
          onClick={this.logout}
          style={{
            width: "100%",
            height: "8vh",
            backgroundColor: "#2a73b2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTop: "1px solid #d9d9d9",
            cursor: "pointer"
          }}
        >
          <h1
            style={{
              marginBottom: 0,
              color: "white"
            }}
          >
            Sign Out
          </h1>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  logout
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(LeftSidebarPosts)
);
