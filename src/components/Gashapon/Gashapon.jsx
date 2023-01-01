import { useGetGashaponApi } from "apis/useInventoryApi";
import clsx from "clsx";
import Card from "modules/Card";
import Modal from "modules/Modal";
import { useContext, useEffect } from "react";
import MessageContext from "store/messageContext";
import Machine from "./Machine";

const Gashapon = ({
  isOpen,
  onClose,
  materials,
  getInventoryByMaterialsApi,
}) => {
  const { data, error, clear, getGashaponApi } =
    useGetGashaponApi();
  const { onAdd } = useContext(MessageContext);
  const openHandler = async () => {
    await getGashaponApi();
    await getInventoryByMaterialsApi();
  };
  const playHandler = () => {
    clear();
    if (
      materials.some((material) => 50 > material.amount)
    ) {
      onAdd("info", "缺少材料", 1200);
      return false;
    }
    return true;
  };
  const closeHandler = () => {
    clear();
    onClose();
  };
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <Modal
      contentLabel={"gashapon-modal"}
      isOpen={isOpen}
      onRequestClose={closeHandler}
    >
      <Card>
        <div className="flex gap-6">
          <Machine
            onPlay={playHandler}
            onOpen={openHandler}
          />
          <div className="relative flex-auto">
            <p className="mb-6">
              歡迎使用扭蛋機，需要收取材料如下:
            </p>
            <ul className="flex flex-col gap-4">
              <li>消耗魚肉 * 50</li>
              <li>消耗石頭 * 50</li>
              <li>消耗木頭 * 50</li>
            </ul>
            <hr className="my-6" />
            <p className="mb-6">結果:</p>
            <div
              className={clsx(
                "flex items-center justify-center gap-2 text-center",
                {
                  "text-red-500": error,
                },
              )}
            >
              {data && data.url && (
                <img
                  className="h-8 w-8"
                  src={data.url}
                  alt=""
                />
              )}
              <span>{(data && data.name) || error}</span>
            </div>
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default Gashapon;
