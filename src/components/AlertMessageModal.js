import { ModalOverlay } from "./Overlay";

const AlertMessageModal = () => {
  return (
    <ModalOverlay>
      <div className="p-4">
        <small className="text-xl">You added one item successfully!</small>
      </div>
    </ModalOverlay>
  );
};

export default AlertMessageModal;
