const Hamburger = () => {
  return (
    <div
      className="cursor-pointer h-12 w-12 flex flex-col gap-1.5 justify-center items-center"
      role="button"
      tabIndex="0"
    >
      <div className="bg-current h-1 w-9 rounded transition-all duration-300"></div>
      <div className="bg-current h-1 w-9 rounded transition-all duration-300"></div>
      <div className="bg-current h-1 w-9 rounded transition-all duration-300"></div>
    </div>
  );
};

export default Hamburger;
