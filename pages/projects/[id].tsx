import { useState } from 'react';
import { connect } from 'react-redux';
import { END } from 'redux-saga';
import Image from 'next/image';
import { Modal } from 'antd';
import { fetchProject } from '../../store/actions/actions';
import { SagaStore, wrapper } from '../../store/store';
import data from '../../data';

const Project = (project) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const showModal = (image: string) => {
    setModalImage(image);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setModalImage('');
    setIsModalVisible(false);
  };

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
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={600}
              >
                <Image
                  src={'/images/' + modalImage}
                  alt={project.title}
                  width='552'
                  height='368'
                />
              </Modal>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  ((store: SagaStore) => async ({ params }) => {
    store.dispatch(fetchProject(params.id as string));
    store.dispatch(END);
    await store.projectsTask.toPromise();
    const project = store.getState().currentProject;
    return {
      props: project,
    };
  })
);

export async function getStaticPaths() {
  const projects = data.projects;

  // Get the paths we want to pre-render based on posts
  const paths = projects ? projects.map((project) => ({
    params: { id: project.id.toString() },
  })) : [];

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: false };
}
export default connect((state) => state)(Project);
