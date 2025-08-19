"use strict";

const MESSAGE_ID = "chrome-error-toaster";
const TOAST_ID = "chrome-error-toaster-toast";

chrome.storage.local.get("extensionEnabled", (data) => {
  if (data.extensionEnabled) {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL("injected.js");
    document.documentElement.appendChild(script);
    script.onload = () => script.remove();
  }
});

/** @type {number | undefined} */
let timeoutId = undefined;

/**
 * @param {string} type
 * @returns {string}
 */
function getTypeMessage(type) {
  if (type === "script") {
    return chrome.i18n.getMessage("titleScriptError");
  } else if (type === "resource") {
    return chrome.i18n.getMessage("titleResourceError");
  } else if (type === "promise") {
    return chrome.i18n.getMessage("titleUnhandledPromiseRejection");
  } else if (type === "console.error()") {
    return chrome.i18n.getMessage("titleConsoleError");
  } else {
    return `[ ${type} ]`;
  }
}

/**
 *
 * @param {string} type
 * @param {string} message
 * @returns {string}
 */
function createMessage(type, message) {
  if (type === "script") {
    return message;
  } else if (type === "resource") {
    return chrome.i18n.getMessage("messageResourceError", message);
  } else if (type === "promise") {
    return message;
  } else {
    return message;
  }
}

/**
 * @param {string} type
 * @param {string} message
 * @param {string} source
 * @param {number} duration
 */
function showToast(type, message, source, duration = 2000) {
  removeToast();
  const toast = document.createElement("div");
  toast.id = TOAST_ID;

  const closeButton = document.createElement("div");
  closeButton.className = "close-button";
  closeButton.textContent = "\u00d7";
  closeButton.addEventListener("click", () => removeToast());
  toast.appendChild(closeButton);

  const typeElement = document.createElement("div");
  typeElement.className = "toast-type";
  typeElement.textContent = getTypeMessage(type);
  toast.appendChild(typeElement);

  const messageElement = document.createElement("div");
  messageElement.className = "toast-message";
  messageElement.textContent = createMessage(type, message);
  toast.appendChild(messageElement);

  if (source) {
    const sourceElement = document.createElement("div");
    sourceElement.className = "toast-source";
    sourceElement.textContent = source;
    toast.appendChild(sourceElement);
  }

  toast.addEventListener("click", () => {
    extendDisplayTime(duration);
  });

  document.body.appendChild(toast);
  timeoutId = setTimeout(removeToast, duration);
}

/**
 * @param {number} duration
 */
function extendDisplayTime(duration) {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(removeToast, duration);
  }
}

function removeToast() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = undefined;
  }
  document.getElementById(TOAST_ID)?.remove();
}

window.addEventListener("message", (event) => {
  if (event.data?.from === MESSAGE_ID) {
    showToast(event.data.type, event.data.message, event.data.source);
  }
});
