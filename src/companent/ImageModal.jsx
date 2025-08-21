import React, { useState } from "react";

export default function ImageModal({ src, alt }) {
  const [open, setOpen] = useState(false);

  // Windows yo'lidagi \ ni / ga almashtiramiz
  const fixedSrc = src.replace(/\\/g, "/");

  return (
    <>
      {/* Kichik rasm */}
      <img
        src={`http://localhost:5000/${fixedSrc}`}
        alt={alt}
        onClick={() => setOpen(true)}
        style={{
          cursor: "zoom-in",
          maxHeight: "3rem",
          borderRadius: "0.31rem",
        }}
      />

      {/* Modal */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: "-20px",
                right: "-40px",
                opacity: "0.7",
                padding: "0.31rem 1rem",
                background: "white",
                border: "none",
                borderRadius: "45px",
                cursor: "pointer",
                fontSize: "2.18rem",
                textAlign: "center",

                color: "black",
                
              }}
            >
              ×
            </button>
            <img
              src={`http://localhost:5000/${fixedSrc}`}
              alt={alt}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "1.56rem",
                background: "white",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}