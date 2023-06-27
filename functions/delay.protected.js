// Helper function for quickly adding await-able "pauses" to JavaScript
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

exports.handler = async (context, event, callback) => {
  // A custom delay value could be passed to the Function, either via
  // request parameters or by the Run Function Widget
  // Default to a 5 second delay
  const delay = event.delay || 5000;
  // Pause Function for the specified number of ms
  await sleep(delay);
  // Once the delay has passed, return a success message, TwiML, or
  // any other content to whatever invoked this Function.
  return callback(null, `Timer up: ${delay}ms`);
};
