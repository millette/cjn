import React from 'react'
import Link from 'next/link'
import faker from 'faker' // see package.json (browser key) excluded from client-side bundle
import Layout from '../components/layout'

import * as pageInfo from '../data/pages/front'

export default class Index extends React.Component {
  static getInitialProps ({ req, query }) { return { lang: query.lang, name: req ? faker.name.findName() : 'Robin' } }

  render () {
    const { name, lang } = this.props
    return (
      <Layout page='' lang={lang} title={[pageInfo.titre[lang], pageInfo.soustitre[lang]].join(' ')}>
        <h1 className='title is-1'>{pageInfo.titre[lang]}</h1>
        <h2 className='subtitle is-2'>{pageInfo.soustitre[lang]}</h2>
        <p>Welcome, {name}</p>
        <div className='columns is-mobile is-multiline'>
          {pageInfo.blocks.map((x, i) => {
            let [l, p, id] = x[lang].path.split('/').slice(1)
            if (l === 'fr' && p === 'a-propos') { p = 'about' }
            const href = {
              pathname: `/${p}`,
              query: {
                lang: l
              }
            }

            if (id) { href.query.id = id }
            const as = x[lang].path

            return (
              <div key={i} className='column is-half-mobile is-one-third-tablet'>
                <div className='card'>
                  <div className='card-content'>
                    <h3 className='title is-6'>{x[lang].title}</h3>
                  </div>
                  <footer className='card-footer'>
                    <Link prefetch href={href} as={as}><a className='card-footer-item'>
                      {lang === 'fr' ? 'En savoir plus' : 'More info'}
                    </a></Link>
                  </footer>
                </div>
              </div>
            )
          })}
        </div>

        <div>
          <p>Carroussel d'actualités</p>
        </div>
        <style jsx>{`
          .is-multiline {
            margin-top: 3em;
            margin-bottom: 3em;
          }
        `}</style>
      </Layout>
    )
  }
}
