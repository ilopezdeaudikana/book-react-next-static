'use client'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ProjectListRow } from './project-list-row'
import { hydrate } from '../../store/reducers/projects.reducer'
import { Status } from '../../app/types'

export const ProjectList = ({ projects }) => {
  const dispatch = useAppDispatch()
  const { value, status } = useAppSelector((state) => state.projects)

  useEffect(() => {
    // If the store is not yet hydrated, dispatch the action to set the value.
    if (status === Status.Idle) {
      dispatch(hydrate(projects))
    }
  }, [dispatch, projects, status])
  return (
    <section className='projects'>
      {projects.map((project) => (
        <ProjectListRow key={project.id} project={project} />
      ))}
    </section>
  )
}
