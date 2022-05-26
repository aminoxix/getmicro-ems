import React, { Component } from "react";

export class NotFound404 extends Component {
  render() {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "white",
          marginTop: "200px",
          textAlign: "center",
        }}
      >
        <h1>404</h1>
        <p style={{ fontWeight: "bold" }}>Not Found</p>
      </div>
    );
  }
}

export default NotFound404;
