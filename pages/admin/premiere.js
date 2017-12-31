import Link from 'next/link'
import LayoutAdmin from '../../components/layout-admin'
import FormOne from '../../components/form-one'
import fs from 'fs'

const Premiere = (props) => (
  <LayoutAdmin page='' title='Éditer la première page'>
    <div className='content'>
      <h2>Éditer la première page</h2>
      <p>
        La <Link prefetch href='/?retour=/admin/premiere'><a>première page</a></Link> offre
        avant tout un choix de langues, français ou anglais. On disposera son
        contenu en deux colonnes, une pour chaque langue.
      </p>

      <FormOne info={props} />
    </div>
  </LayoutAdmin>
)

Premiere.getInitialProps = async ({ req }) => {
  if (req) {
    return new Promise((resolve, reject) => {
      fs.readFile('data/pages/premiere.json', 'utf-8', (err, ok) => {
        if (err) { return reject(err) }
        try {
          resolve(JSON.parse(ok))
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  return window.fetch('/data/pages/premiere.json')
    .then((res) => res.json())
}

export default Premiere
