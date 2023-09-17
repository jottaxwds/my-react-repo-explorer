import { Link } from '@mui/material'
import { Repo } from '../../types/Repositories'
import { ColSizes } from '../../types/ResultsTable'

const columnsConfig = [
  {
    id: 'name',
    label: 'Repo Name',
    sortable: true,
    displayValue: (repo: Repo) => {
      return <Link href={repo.url}>{repo.name}</Link>
    },
  },
  {
    id: 'stars',
    label: '🌟 Stars',
    sortable: true,
    displayValue: (repo: Repo) => <>🌟 {repo.stars}</>,
    minColSize: ColSizes.SM,
  },
  {
    id: 'forks',
    label: '🍴 Forks',
    sortable: true,
    displayValue: (repo: Repo) => <>🍴 {repo.forks}</>,
    minColSize: ColSizes.SM,
  }
]

export default columnsConfig
