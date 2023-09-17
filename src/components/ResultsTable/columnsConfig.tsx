import { Link } from '@mui/material'
import { Repo } from '../../types/Repositories'

const columnsConfig = [
  {
    id: 'name',
    label: 'Repo Name',
    sortable: true,
    displayValue: (repo: Repo) => {
      return <Link href={repo.url}>{repo.name}</Link>
    }
  },
  {
    id: 'stars',
    label: '🌟 Stars',
    sortable: true,
    displayValue: (repo: Repo) => <>🌟 {repo.stars}</>
  },
  {
    id: 'forks',
    label: '🍴 Forks',
    sortable: true,
    displayValue: (repo: Repo) => <>🍴 {repo.forks}</>
  }
]

export default columnsConfig
