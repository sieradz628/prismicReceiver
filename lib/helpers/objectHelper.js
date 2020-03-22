const getProps = (fn) => {
  try { 
    return fn(); 
  } catch ( e ) {
    return false;
  }
};

module.exports = { 
  getProps,
};
