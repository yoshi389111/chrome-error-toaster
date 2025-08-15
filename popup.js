"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // replace label text for i18n
  document.getElementById("labelEnable").textContent =
    chrome.i18n.getMessage("labelEnable");

  // resize popup window
  const width = document.body.scrollWidth + 40;
  window.resizeTo(width, window.outerHeight);

  // initialize checkbox state
  const checkbox = document.getElementById("toggleExtension");
  chrome.storage.local.get("extensionEnabled", (data) => {
    checkbox.checked = data.extensionEnabled ?? true;
  });

  checkbox.addEventListener("change", () => {
    // retrieve checkbox state
    const enabled = Boolean(checkbox.checked);

    // Update the extension's enabled state
    chrome.storage.local.set({ extensionEnabled: enabled }, () => {
      console.log("Extension enabled:", enabled);
    });
    // Update the extension's icon

    chrome.action.setIcon({
      path: enabled ? "assets/icon128.png" : "assets/icon128_disabled.png",
    });
  });
});
