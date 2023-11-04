import { Link } from "react-router-dom";

const Button = ({ children, type, to, width, ...props }) => {
  let content = null;

  if (type === "hover") {
    content = (
      <button
        className={`py-2 px-6 rounded-full bg-primary text-white border-2 border-transparent transition-all hover:bg-transparent hover:text-secondary hover:border-secondary ${width}`}
        {...props}
      >
        <Link to={to}>{children}</Link>
      </button>
    );
  } else if (type === "submit") {
    content = (
      <button
        type="submit"
        className={`block py-2 px-6 border-2 border-secondary rounded-full text-sm font-medium text-secondary transition-all hover:bg-primary hover:text-white hover:border-transparent ${width}`}
        {...props}
      >
        {children}
      </button>
    );
  } else if (type === "submit-hover") {
    content = (
      <button
        type="submit"
        className={`block py-2 px-6 border-2 border-transparent rounded-full text-sm font-medium hover:text-secondary hover:bg-transparent transition-all bg-primary text-white hover:border-secondary ${width}`}
        {...props}
      >
        {children}
      </button>
    );
  } else if (type === "disable") {
    content = (
      <button
        className={`block py-2 px-6 border-2 border-gray-400 rounded-full text-sm font-medium text-white transition-all bg-gray-400 hover:bg-gray-600 hover:text-white hover:border-transparent ${width} cursor-no-drop`}
        {...props}
        disabled={true}
      >
        {children}
      </button>
    );
  } else {
    content = (
      <button
        className={`block py-2 px-6 border-2 border-secondary rounded-full text-sm font-medium text-secondary transition-all hover:bg-primary hover:text-white hover:border-transparent ${width}`}
        {...props}
      >
        <Link to={to}>{children}</Link>
      </button>
    );
  }

  return content;
};

export default Button;
