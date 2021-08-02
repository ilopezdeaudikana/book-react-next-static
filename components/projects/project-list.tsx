import { ProjectListRow } from './project-list-row';
export const ProjectList = ({ projects }) => {
  return (
    <section className='projects'>
      {projects.map((project) => (
        <ProjectListRow key={project.id} project={project} />
      ))}
    </section>
  );
};
