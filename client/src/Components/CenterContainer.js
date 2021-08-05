import React from "react";

export default function CenterContainer({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      {children}
    </div>
  );
}
