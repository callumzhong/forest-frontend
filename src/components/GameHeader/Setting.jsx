import Button from "modules/Button";
import Card from "modules/Card";
import Modal from "modules/Modal";
import { useNavigate } from "react-router-dom";

const Setting = ({ isOpen, onOpen, onClose }) => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    console.log(1);
    navigate("/login");
  };
  return (
    <>
      <button
        onClick={onOpen}
        className="hover:text-gray-500 active:text-gray-700"
      >
        設定 [Esc]
      </button>
      <Modal
        onRequestClose={onClose}
        contentLabel={"setting-modal"}
        isOpen={isOpen}
      >
        <Card>
          <h2 className="mb-6 text-center text-xl">設定</h2>
          <ul className="text-center text-lg">
            <li>
              <Button onClick={logoutHandler}>登出</Button>
            </li>
          </ul>
        </Card>
      </Modal>
    </>
  );
};

export default Setting;
