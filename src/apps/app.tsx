import React from "react";
import { createRoot } from "react-dom/client";

const root = document.querySelector("#app");
if (!root) {
  throw new Error("No root element");
}

createRoot(root).render(
  <React.StrictMode>
    <section>
      <div>あああ</div>
    </section>
  </React.StrictMode>
);
