import useModal from 'hooks/useModal';
import Button from 'modules/Button';
import Card from 'modules/Card';
import Modal from 'modules/Modal';

const Author = () => {
  const { onOpen, onClose, isOpen } = useModal();

  return (
    <>
      <Button width='full' onClick={onOpen}>
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
            本專案理念為天下沒有白吃的午餐，意指不付出成本而獲得利益是不可能的。透過釣魚、採石、伐木等動作影射自己必須有所付出，將獲取物兌換代幣進行抽獎。
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
