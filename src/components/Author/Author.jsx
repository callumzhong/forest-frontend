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
            本專案核心為每日付出即為收穫，透過釣魚、採石、伐木等動作取得素材，透過素材進入遊戲中的小屋向
            NPC 抽獎。獎品則是每日付出的獎勵。
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
