import { createPortal } from "react-dom";
import { useGlobalContext } from "../assets/context";

const SideBar = ({ children }) => {
  const { isSideBarOpen } = useGlobalContext();
  return (
    <aside
      className={`${
        isSideBarOpen ? "block" : "hidden"
      } fixed top-0 right-0 z-10 h-full overflow-y-scroll w-full md:w-2/5 shadow-2xl bg-slate-100 p-2`}
    >
      {children}
    </aside>
  );
};
const portalElement = document.getElementById("overlays");

const Overlay = ({ children }) => {
  return <>{createPortal(<SideBar>{children}</SideBar>, portalElement)}</>;
};

export default Overlay;
