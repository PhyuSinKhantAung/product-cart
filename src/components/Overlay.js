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

const AlertModal = ({ children }) => {
  const { isAlertOpen } = useGlobalContext();
  return (
    <div
      className={`${
        isAlertOpen ? "block" : "hidden"
      } fixed md:bottom-10 md:left-10 left-7 bottom-10 z-9 shadow-2xl bg-green-200 rounded-md`}
    >
      {children}
    </div>
  );
};
const portalElement = document.getElementById("overlays");

const Overlay = ({ children }) => {
  return <>{createPortal(<SideBar>{children}</SideBar>, portalElement)}</>;
};

const ModalOverlay = ({ children }) => {
  return (
    <>{createPortal(<AlertModal>{children}</AlertModal>, portalElement)}</>
  );
};

export { Overlay, ModalOverlay };
