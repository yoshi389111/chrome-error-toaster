"use strict";

(() => {
  const MESSAGE_ID = "chrome-error-toaster";

  /**
   * @param {string} type
   * @param {string} message
   * @param {string} source
   */
  function sendError(type, message, source) {
    window.postMessage(
      {
        from: MESSAGE_ID,
        type,
        message,
        source,
      },
      "*"
    );
  }

  /**
   * @param {ErrorEvent} event
   */
  function onScriptError(event) {
    const source = `${event.filename}:${event.lineno}:${event.colno}`;
    sendError("script", event.message, source);
  }

  /**
   * @param {Event} event
   */
  function onResourceError(event) {
    const tagName = event.target.tagName?.toLowerCase() || "unknown";
    const source = event.target.src || event.target.href || "unknown";
    sendError("resource", tagName, source);
  }

  /**
   * @param {PromiseRejectionEvent} event
   */
  function onUnhandledRejection(event) {
    sendError("promise", event.reason, "");
  }

  /**
   * @param {Event} event
   */
  function onError(event) {
    if (!event) {
      return;
    } else if (event instanceof ErrorEvent) {
      onScriptError(event);
    } else if (
      typeof event === "object" &&
      "message" in event &&
      "filename" in event
    ) {
      // when `instanceof` cannot be used to determine
      // the identity due to cross-origin or other reasons
      onScriptError(event);
    } else {
      onResourceError(event);
    }
  }

  window.addEventListener("error", onError, true);
  window.addEventListener("unhandledrejection", onUnhandledRejection);

  // capture console.error() calls
  ["error"].forEach((method) => {
    const original = console[method];
    console[method] = (...args) => {
      const message = args.join(" ");
      const caller = new Error().stack
        .split("\n")[2]
        .trim()
        .replace(/^[^(]+ \((.*)\)$/, "$1");
      sendError(`console.${method}()`, message, caller);
      original.apply(console, args);
    };
  });
})();
