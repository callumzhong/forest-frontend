import { usePostPropApi } from "apis/useInventoryApi";
import Card from "modules/Card";
import Modal from "modules/Modal";
import { Suspense, useContext, useState } from "react";
import MessageContext from "store/messageContext";
import { useImage } from "react-image";

const MyImageComponent = (props) => {
  const { src } = useImage({
    srcList: props.src,
  });

  return (
    <img
      className={props.className}
      title={props.title}
      src={src}
      alt=""
    />
  );
};

const Inventory = ({
  isOpen,
  data,
  onUpdate,
  onOpen,
  onClose,
}) => {
  const { onAdd } = useContext(MessageContext);
  const [prop, setProp] = useState();
  const { postPropApi } = usePostPropApi();
  const clickHandler = (item) => {
    setProp(item);
  };
  const doubleClickHandler = async (item) => {
    if (item.amount <= 0) {
      onAdd("error", `未擁有該道具`, 1200);
      return;
    }
    await postPropApi(item._id);
    await onUpdate();
  };
  const closeHandler = () => {
    setProp();
    onClose();
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="hover:text-gray-500 active:text-gray-700"
      >
        物品 [B]
      </button>
      <Modal
        onRequestClose={closeHandler}
        contentLabel={"setting-modal"}
        isOpen={isOpen}
      >
        <Suspense fallback={<></>}>
          <Card>
            <h2 className="mb-6 text-center text-2xl">
              物品欄
            </h2>
            <div className="flex flex-col gap-6 sm:flex-row">
              <ul className=" grid w-max grid-cols-4 grid-rows-5 gap-[10px] bg-gray-900 p-[15px] text-white">
                {Array.isArray(data) &&
                  data.map((item) => {
                    return (
                      <li
                        key={item._id}
                        onDoubleClick={() => {
                          doubleClickHandler(item);
                        }}
                        onClick={() => {
                          clickHandler(item);
                        }}
                        className="group h-[50px] w-[50px] border border-white bg-gray-700 outline outline-1 outline-transparent transition-all hover:outline-offset-[-5px] hover:outline-white active:border-none active:outline-none"
                      >
                        <div className="relative transition-all">
                          <MyImageComponent
                            className="h-full w-full max-w-none transition-all group-hover:-m-[10%] group-hover:h-[120%] group-hover:w-[120%]"
                            src={item.url}
                            alt=""
                            title={item.name}
                          />
                          <p className="text-shadow absolute bottom-[5%] right-[5%] m-0">
                            {item.amount}
                          </p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
              <div className="basis-2/4">
                {prop && (
                  <>
                    <h3 className="mb-6">{prop.name}</h3>
                    <p>說明:</p>
                    <p className="mb-6">
                      {prop.description}
                    </p>
                    <p>效果:</p>
                    <p>
                      {prop.attributes.satiety > 0 &&
                        `增加飽食度 ${prop.attributes.satiety}`}
                    </p>
                    <p>
                      {prop.attributes.mood > 0 &&
                        `增加情緒值 ${prop.attributes.mood}`}
                    </p>
                  </>
                )}
              </div>
            </div>
          </Card>
        </Suspense>
      </Modal>
    </>
  );
};

export default Inventory;
<Inventory />;
