/**
 * @param {String} input the string input
 */
function capitalize(input) {
  if (input.length > 1) {
    return input.charAt(0).toUpperCase() + input.substring(1);
  }
  return input;
}

export default function getErrorMessage(error) {
  if (typeof error === 'object') {
    if (error.response && error.response.data && error.response.data.message) {
      return capitalize(error.response.data.message);
    }
    if (error.message) {
      return capitalize(error.message);
    }
    return 'An unknown error occured';
  }
  if (typeof error === 'string') {
    return capitalize(error);
  }
  return 'An unknown error occured';
}
