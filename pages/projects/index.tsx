import { connect } from 'react-redux';
import { END } from 'redux-saga';
import { fetchProjects } from '../../store/actions/actions';
import { ProjectList } from '../../components/projects/project-list';
import { wrapper } from '../../store/store';

const Projects = ({ projects }) => {
  return <ProjectList projects={projects.reverse()} />;
};

export const getStaticProps = wrapper.getStaticProps(
  // @ts-ignore
   (store => async ({preview})  => {
    store.dispatch(fetchProjects());
    store.dispatch(END);    
    await (store as any)?.projectsTask.toPromise();
    const projects = (store as any)?.getState().projects;

    return {
      props: projects,
    };
  })
);

export default connect((state) => state)(Projects);
