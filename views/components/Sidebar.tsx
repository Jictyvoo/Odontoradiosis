import { React } from "../../deps.ts";
//import "./Sidebar.css";
import { ReactJSS } from "../../deps.ts";

const useStyles = (ReactJSS as any).createUseStyles({
  side_bar: {
    height: "100% !important",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid",
    borderRadius: 0,
    borderColor: "rgba(64, 194, 133, 0.693)",
    backgroundColor: "rgb(255, 255, 255)",
    transition: "0.8s ease",
  },
  toggle_menu: {
    height: "50px",
    borderTopRightRadius: "10rem",
    borderBottomRightRadius: "9rem",
    width: "10px",
    position: "absolute",
    outline: "none",
    zIndex: "1",
    backgroundColor: "rgba(64, 194, 133, 0.693)",
    borderColor: "rgba(64, 194, 133, 0.693)",
    borderLeft: "0",
  },
});

const Sidebar = ({
  width,
  height,
  children,
}: {
  width: number;
  height: number;
  children: Element;
}) => {
  const classes = useStyles();
  const [xPosition, setX] = React.useState(-width);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  React.useEffect(() => {
    setX(0);
  }, []);
  return (
    <React.Fragment>
      <div
        className={classes.side_bar}
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
          minHeight: height,
        }}
      >
        <button
          onClick={() => toggleMenu()}
          className={classes.toggle_menu}
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
