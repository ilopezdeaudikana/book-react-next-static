import Image from 'next/image';
export const CompanyListRow = ({ company }) => {
  const {
    id,
    teaser,
    title,
    period,
    job,
    description,
    technologies,
    url,
  } = company;
  return (
    <div key={id} className='panel panel-default'>
      <header className='panel-heading'>
        {teaser.map((image: any, index: number) => (
          <a key={index} href={url[index]} target='_blank' rel='noreferrer'>
            <Image
              alt={title}
              src={'/images/' + image}
              width='280'
              height='140'
            />
          </a>
        ))}
      </header>
      <div className='panel-body'>
        <p>{period}</p>
        <p>
          <span>Job title: </span>
          {job}
        </p>
        <p>
          <span>Tasks: </span>
          {description}
        </p>
        <p>
          <span>Stack: </span>
          {technologies}
        </p>
      </div>
    </div>
  );
};
