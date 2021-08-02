import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../../store/actions/actions';
import { ProjectList } from '../../components/projects/project-list';
import { State } from '../../store/store';

const Projects = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  const projects = useSelector((state: State) => state.projects);

  return (
    <Fragment>
      <ProjectList projects={projects.reverse()} />
    </Fragment>
  );
};

export default Projects;
