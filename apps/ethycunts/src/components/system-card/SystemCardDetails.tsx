import { useMapStore } from '../../store/useMapStore'
import type { SystemWithMeta } from '../../types/types'
import { titleCase } from '../../utils/strings'
import styles from './SystemCardDetails.module.css'

type SystemCardDetailsProps = {
  uses: SystemWithMeta['uses'] 
  categories: SystemWithMeta['categories']  
  systemDependencies: SystemWithMeta['systemDependencies'] 
}

export const SystemCardDetails = ({ uses, categories, systemDependencies }: SystemCardDetailsProps) => {

  const { systemsMap } = useMapStore()

  return (<>
    <div className={styles.uses}>
      {uses.map((use) => (
        <span key={use} className={styles.tag}>
          {titleCase(use)}
        </span>
      ))}
    </div>
    <div>
      <p className={styles.label}>Data categories</p>
      {categories.length === 0 ? (
        <p className={styles.empty}>No categories declared</p>
      ) : (
        <div className={styles.tags}>
          {categories.map((category) => (
            <span key={category} className={styles.pill} title={category}>
              {titleCase(category)}
            </span>
          ))}
        </div>
      )}
    </div>

    <div>
      <p className={styles.label}>Dependencies</p>
      {systemDependencies.length === 0 ? (
        <p className={styles.empty}>No dependencies</p>
      ) : (
        <ul className={styles.dependencyList}>
          {systemDependencies.map((dependency) => {
            const dependencyName = systemsMap.get(dependency)?.name ?? dependency
            return (
              <li key={dependency} className={styles.dependencyItem}>
                <span className={styles.arrow}>→</span>
                {dependencyName}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  </>)
}
