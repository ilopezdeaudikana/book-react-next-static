import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Modal } from 'antd';
import { fetchProject } from '../../store/actions/actions';
import { State } from '../../store/store';
const Project = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      dispatch(fetchProject(id as string));
    }
  }, [id, dispatch]);

  const showModal = (image: string) => {
    setModalImage(image);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setModalImage('');
    setIsModalVisible(false);
  };

  const project = useSelector((state: State) => state.currentProject);
  return (
    <section className='projects'>
      <div className='project'>
        {!project && <div>Loading projects...</div>}
        {project && (
          <div className='panel panel-default'>
            <header className='panel-heading'>
              <h1 className='panel-title'>{project.title}</h1>
              <p>
                <span>Stack</span>: {project.technologies}
              </p>
            </header>

            <div className='panel-body'>
              {project.images?.split(',').map((image, index) => (
                <div
                  key={index}
                  className='flush'
                  onClick={() => showModal(image)}
                >
                  <Image
                    src={'/images/mini/' + image}
                    alt={project.title}
                    width='320'
                    height='230'
                  />
                </div>
              ))}
              <Modal
                title={project.title}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={600}
                maskStyle={{ backgroundColor: 'white' }}
              >
                <Image
                  src={'/images/' + modalImage}
                  alt={project.title}
                  width='600'
                  height='400'
                />
              </Modal>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Project;
