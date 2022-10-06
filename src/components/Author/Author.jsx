import useModal from 'hooks/useModal';
import Button from 'modules/Button';
import Card from 'modules/Card';
import Modal from 'modules/Modal';

const Author = () => {
  const { onOpen, onClose, isOpen } = useModal();

  return (
    <>
      <Button
        width='full'
        onClick={() => {
          onOpen();
        }}
      >
        作者的話
      </Button>
      <Modal
        onRequestClose={onClose}
        contentLabel={'resister-modal'}
        isOpen={isOpen}
      >
        <Card>
          <h2 className='mb-6 text-center text-xl'>
            作者的話
          </h2>
          <p className='mb-4'>
            本專案核心要素是藉由遊戲化的方式，透過釣魚、伐木、採石等行為表示角色為了生活而努力，獲取到的資源透過扭蛋表達以物易物，得到伙食、娛樂票券、奢侈物品等等。
          </p>
          <p className='mb-4'>影片介紹：</p>
          <iframe
            className='mx-auto aspect-video'
            height='315'
            src='https://www.youtube.com/embed/2UAAu6QQqP4'
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowfullscreen
          ></iframe>
        </Card>
      </Modal>
    </>
  );
};

export default Author;
