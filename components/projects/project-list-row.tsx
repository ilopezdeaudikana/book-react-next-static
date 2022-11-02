import Link from 'next/link';
import Image from 'next/image';

export const ProjectListRow = ({ project }) => {
  return (
    <div className='project'>
      <div className='panel panel-default'>
        <header className='panel-heading'>
          <h2 className='panel-title teaser'>{project.title}</h2>
        </header>
        <div className='panel-body'>
          <div className='flush'>
            <Link href={'/projects/' + project.id}>
              <Image
                alt={project.title}
                src={'/images/' + project.teaser}
                width="320"
                height="230"
                className='img-thumbnail'
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
