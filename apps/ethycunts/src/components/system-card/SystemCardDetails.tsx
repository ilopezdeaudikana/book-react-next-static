import { useMapStore } from '../../store/useMapStore'
import type { SystemWithMeta } from '../../types/types'
import { titleCase } from '../../utils/strings'

type SystemCardDetailsProps = {
  uses: SystemWithMeta['uses'] 
  categories: SystemWithMeta['categories']  
  systemDependencies: SystemWithMeta['systemDependencies'] 
}

export const SystemCardDetails = ({ uses, categories, systemDependencies }: SystemCardDetailsProps) => {

  const { systemsMap } = useMapStore()
  const labelClassName = 'mb-2 mt-0 text-xs uppercase tracking-[0.2em] text-stone-400'
  const tagsClassName = 'flex flex-wrap gap-1'
  const emptyClassName = 'm-0 text-xs text-stone-400'

  return (<>
    <div>
      <p className={labelClassName}>Uses</p>
      {uses.length > 0 && <div className={tagsClassName}>
        {uses.map((use) => (
          <span key={use} className="rounded-full bg-orange-100 px-2 py-1 text-[0.6875rem] tracking-[0.06em] text-stone-950">
            {titleCase(use)}
          </span>
        ))}
      </div>}
      {uses.length == 0 && <p className={emptyClassName}>No uses found</p>}
    </div>
    <div>
      <p className={labelClassName}>Data categories</p>
      {categories.length === 0 ? (
        <p className={emptyClassName}>No categories declared</p>
      ) : (
        <div className={tagsClassName}>
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-stone-300 bg-gray-100 px-2.5 py-[0.3125rem] text-xs"
              title={category}
            >
              {titleCase(category)}
            </span>
          ))}
        </div>
      )}
    </div>

    <div>
      <p className={labelClassName}>Dependencies</p>
      {systemDependencies.length === 0 ? (
        <p className={emptyClassName}>No dependencies</p>
      ) : (
        <ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-xs text-stone-600">
          {systemDependencies.map((dependency) => {
            const dependencyName = systemsMap.get(dependency)?.name ?? dependency
            return (
              <li key={dependency} className="flex items-center gap-2">
                <span className="font-semibold text-teal-50">→</span>
                {dependencyName}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  </>)
}
