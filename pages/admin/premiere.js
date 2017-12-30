import Link from 'next/link'
import LayoutAdmin from '../../components/layout-admin'

export default () => (
  <LayoutAdmin page='' title='Éditer la première page'>
    <div className='content'>
      <h2>Éditer la première page</h2>
      <p>
        La <Link prefetch href='/?retour=/admin/premiere'><a>première page</a></Link> offre
        avant tout un choix de langues, français ou anglais. On disposera son
        contenu en deux colonnes, une pour chaque langue.
      </p>
    </div>
  </LayoutAdmin>
)
