import { Link } from '@mui/material'
import { Repo } from '../../types/Repositories'
import { ColSizes } from '../../types/ResultsTable'

const columnsConfig = [
  {
    id: 'name',
    headerLabel: 'Repo Name',
    sortable: true,
    displayValue: (repo: Repo) => {
      return <Link href={repo.url}>{repo.name}</Link>
    }
  },
  {
    id: 'stars',
    headerLabel: '🌟 Stars',
    sortable: true,
    displayValue: (repo: Repo) => <>🌟 {repo.stars}</>,
    minColSize: ColSizes.SM
  },
  {
    id: 'forks',
    headerLabel: '🍴 Forks',
    sortable: true,
    displayValue: (repo: Repo) => <>🍴 {repo.forks}</>,
    minColSize: ColSizes.SM
  }
]

export default columnsConfig
