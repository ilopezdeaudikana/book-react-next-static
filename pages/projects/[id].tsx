import { useState } from 'react';
import { connect } from 'react-redux';
import { END } from 'redux-saga';
import Image from 'next/image';
import { Modal } from 'antd';
import { fetchProject } from '../../store/actions/actions';
import { wrapper } from '../../store/store';
import { getProjects } from '../../services/api.service';

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

export const getStaticProps = wrapper.getStaticProps(
  // @ts-ignore
  async ({ store, params }) => {
    store.dispatch(fetchProject(params.id as string));
    store.dispatch(END);
    await (store as any).projectsTask.toPromise();
    const project = (store as any).getState().currentProject;
    return {
      props: project,
    };
  }
);

export async function getStaticPaths() {
  const projects = await getProjects();

  // Get the paths we want to pre-render based on posts
  const paths = projects.map((project) => ({
    params: { id: project.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
}
export default connect((state) => state)(Project);
