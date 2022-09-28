import { usePostPropApi } from 'apis/useInventoryApi';
import Card from 'modules/Card';
import Modal from 'modules/Modal';
import { useContext, useEffect, useState } from 'react';
import MessageContext from 'store/messageContext';

const Inventory = ({
  isOpen,
  data: _props,
  onUpdateProps,
  onOpen,
  onClose,
}) => {
  const { onAdd } = useContext(MessageContext);
  const [props, setProps] = useState([]);
  const [prop, setProp] = useState();
  const { postPropApi } = usePostPropApi();
  const clickHandler = (item) => {
    setProp(item);
  };
  const doubleClickHandler = async (item) => {
    if (item.amount <= 0) {
      onAdd('error', `未擁有該道具`, 1200);
      return;
    }
    await postPropApi(item._id);
    await onUpdateProps();
  };
  const closeHandler = () => {
    setProp();
    onClose();
  };

  useEffect(() => {
    if (!_props) return;
    setProps(_props);
  }, [_props]);

  return (
    <>
      <button
        onClick={onOpen}
        className='hover:text-gray-500 active:text-gray-700'
      >
        物品 [B]
      </button>
      <Modal
        onRequestClose={closeHandler}
        contentLabel={'setting-modal'}
        isOpen={isOpen}
      >
        <Card>
          <h2 className='mb-6 text-center text-2xl'>
            物品欄
          </h2>
          {/* <ul
            className='flex max-h-96 flex-col gap-4  overscroll-y-auto px-6  
          scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-amber-600'
          >
            {Array.isArray(data) &&
              data.map((item) => (
                <li
                  onChange={() => {
                    console.log(5);
                  }}
                  key={item._id}
                  className='flex items-center gap-6'
                >
                  <img
                    width={32}
                    height={32}
                    src={item.url}
                    alt={item.name}
                  />
                  <span className='mr-auto'>
                    {item.name}
                  </span>
                  <span>數量</span>
                  <span>{item.amount}</span>
                  <Button
                    onClick={() => {
                      clickHandler(item._id);
                    }}
                    disabled={item.amount === 0}
                  >
                    使用
                  </Button>
                </li>
              ))}
          </ul> */}
          <div className='flex gap-6'>
            <ul className=' grid w-max grid-cols-4 grid-rows-5 gap-[10px] bg-gray-900 p-[15px] text-white'>
              {Array.isArray(props) &&
                props.map((item) => {
                  return (
                    <li
                      onDoubleClick={() => {
                        doubleClickHandler(item);
                      }}
                      onClick={() => {
                        clickHandler(item);
                      }}
                      className='group h-[50px] w-[50px] border border-white bg-gray-700 outline outline-1 outline-transparent transition-all hover:outline-offset-[-5px] hover:outline-white active:border-none active:outline-none'
                    >
                      <div className='relative transition-all'>
                        <img
                          className='h-full w-full max-w-none transition-all group-hover:-m-[10%] group-hover:h-[120%] group-hover:w-[120%]'
                          src={item.url}
                          alt=''
                          title={item.name}
                        />
                        <p className='text-shadow absolute bottom-[5%] right-[5%] m-0'>
                          {item.amount}
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
            <div className='basis-2/4'>
              {prop && (
                <>
                  <h3>說明</h3>
                  <p className='mb-6'>{prop.description}</p>
                  <h3>效果</h3>
                  <p>
                    {prop.attributes.satiety > 0 &&
                      `增加飽食度 ${prop.attributes.satiety}`}
                    {prop.attributes.mood > 0 &&
                      `增加情緒值 ${prop.attributes.mood}`}
                  </p>
                </>
              )}
            </div>
          </div>
        </Card>
      </Modal>
    </>
  );
};

export default Inventory;
<Inventory />;
