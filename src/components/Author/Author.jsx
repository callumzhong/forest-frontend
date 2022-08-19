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
          <p>
            Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Quisquam quaerat, error
            molestiae assumenda illum optio quae aliquam
            tenetur vitae, incidunt eligendi! Fugit
            perferendis saepe eligendi porro, nesciunt
            debitis dicta rem. Tenetur a exercitationem
            excepturi veritatis natus voluptatibus dolorem!
            Sequi omnis nam fugit sed similique dolores ab a
            fuga repellat, delectus distinctio! Quibusdam,
            qui temporibus voluptatibus aut ipsum corporis
            quasi. Voluptatem? Molestiae eius tempore,
            adipisci aliquam magnam cumque illo aut vero
            tempora. Optio praesentium veniam eos impedit
            sit maxime, eligendi magni incidunt, qui quidem
            voluptas ipsa doloribus, assumenda harum eveniet
            minus! Eos quidem quos aperiam reprehenderit
            exercitationem ad delectus voluptates nisi
            recusandae hic odio tempora voluptatibus ipsam
            voluptatum sed, ducimus sint architecto aut
            autem suscipit, impedit laborum ratione pariatur
            consequuntur. Cum. Consequuntur aperiam
            repellendus impedit iusto libero id
            reprehenderit mollitia a, dolore nemo laudantium
            esse totam at voluptatum quisquam eum ipsa.
            Veritatis dolores labore rem, odio commodi
            eligendi aut dolore nisi.
          </p>
        </Card>
      </Modal>
    </>
  );
};

export default Author;
