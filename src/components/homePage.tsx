import React from "react";
import logo from "../assets/logo.png";
import { fontSize } from "@mui/system";

interface Props {
  children: React.ReactNode;
}

const HomePage: React.FC = () => {
  return (
    <div className="pattern-body" style={{ textAlign: "center" }}>
      <div style={{ margin: "20px" }}>
        <div>
          <img
            src={logo}
            width={200}
            style={{ display: "inline-block", verticalAlign: "middle" }}
          ></img>
          <div
            style={{
              // display: "inline-block",
              verticalAlign: "middle",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p
              style={{
                fontFamily: "Bruno Ace SC",
                fontSize: "50px",
                margin: "5px",
                wordSpacing: "-20px",
              }}
            >
              SAMS
            </p>
            <p style={{ fontSize: "20px", marginLeft: "5px" }}>
              Smart Agency Management System
            </p>
          </div>
        </div>
      </div>
      <div
        // className="grey-title-container"
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          marginTop: "50px",
          marginBottom: "10px",
        }}
      >
        What is SAMS?
      </div>
      <div
        // className="white-bordred-container"
        style={{
          fontSize: "20px",
          maxWidth: "700px",
          margin: "auto",
        }}
      >
        SAMS is an intelligent managemnt system that allows agency owners to
        monitor and track their agency to maximize performance and efficiency!
      </div>
      {/* <div
        // className="grey-title-container"
        style={{
          fontSize: "15px",
          fontWeight: "bold",
          marginTop: "50px",
          marginBottom: "15px",
        }}
      >
        SAMS currently supports the following systems
      </div> */}
      <div
      // className="white-bordred-container"
      >
        <ul>
          {/* <li>Canvas</li> */}

          <img
            style={{ width: 150 }}
            src="https://upload.wikimedia.org/wikipedia/commons/f/f2/WFG_Logo_2C.png"
          />
        </ul>
      </div>
      {/* <CWL /> */}
    </div>
  );
};

export default HomePage;
