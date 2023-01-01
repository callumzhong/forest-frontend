import useModal from "hooks/useModal";
import Button from "modules/Button";
import Card from "modules/Card";
import Modal from "modules/Modal";

const Author = () => {
  const { onOpen, onClose, isOpen } = useModal();

  return (
    <>
      <Button
        width="full"
        onClick={() => {
          onOpen();
        }}
      >
        作者的話
      </Button>
      <Modal
        onRequestClose={onClose}
        contentLabel={"resister-modal"}
        isOpen={isOpen}
      >
        <Card>
          <p className="mb-4">
            遊戲以釣魚、伐木、採石等，採集資源的方式培養生活習慣。
          </p>
          <ul className="mb-4 list-inside list-disc">
            <li>
              每 5 分鐘會扣飽食度、情緒值，角色有死亡機制
            </li>
            <li>全體聊天室讓你不孤單暢聊一整晚</li>
            <li>角色動作皆有音效提升精神</li>
            <li>配有外出劵、奢侈劵獎勵機制</li>
          </ul>
        </Card>
      </Modal>
    </>
  );
};

export default Author;
