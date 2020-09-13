//import "./Sidebar.css";
import { React } from "../../deps.ts";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      button: any;
      div: any;
    }
  }
}

const Sidebar = (width: number, height?: number, children?: object) => {
  const [xPosition, setX] = (React as any).useState(-width);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  (React as any).useEffect(() => {
    setX(0);
  }, []);
  return (
    <React.Fragment>
      <div
        className="side-bar"
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
          minHeight: height,
        }}
      >
        <button
          onClick={() => toggleMenu()}
          className="toggle-menu"
          style={{
            transform: `translate(${width}px, 20vh)`,
          }}
        ></button>
        <div className="content">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
