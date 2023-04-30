import { connect } from 'react-redux';
import { END } from 'redux-saga';
import { fetchProjects } from '../../store/actions/actions';
import { ProjectList } from '../../components/projects/project-list';
import { SagaStore, wrapper } from '../../store/store';

const Projects = ({ projects }) => {
  return <ProjectList projects={projects.reverse()} />;
};

export const getStaticProps = wrapper.getStaticProps(
   ((store: SagaStore) => async ({preview})  => {
    store.dispatch(fetchProjects());
    store.dispatch(END);    
    await store.projectsTask.toPromise();
    const projects = store.getState().projects;

    return {
      props: projects,
    };
  })
);

export default connect((state) => state)(Projects);
