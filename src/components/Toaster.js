const Toaster = ({ message, type }) => {
    return (
    <div className={`toast ${type}`}>
      !!! {message}
    </div>)
  };
  
  export default Toaster;