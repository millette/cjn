import React from 'react'
import faker from 'faker' // see package.json (browser key) excluded from client-side bundle
import Layout from '../components/layout'

export default class Index extends React.Component {
  static getInitialProps ({ req, query }) { return { lang: query.lang, name: req ? faker.name.findName() : 'Robin' } }

  render () {
    const { name, lang } = this.props
    return (
      <Layout lang={lang} title='Front'>
        <div className='columns'>
          <div className='column'>
            <h1 className='title is-1'>Home Page {lang}</h1>
            <p>Welcome, {name}</p>
          </div>
        </div>
        <div className='columns is-mobile is-multiline'>
          <div className='column is-half-mobile is-one-third-tablet'>
            Programme CCI
          </div>
          <div className='column is-half-mobile is-one-third-tablet'>
            J'ai un projet pour ma communauté
          </div>
          <div className='column is-half-mobile is-one-third-tablet'>
            Chantier à l'internationnal
          </div>
          <div className='column is-half-mobile is-one-third-tablet'>
            Accueillir un chantier
          </div>
          <div className='column is-half-mobile is-one-third-tablet'>
            CEIC
          </div>
          <div className='column is-half-mobile is-one-third-tablet'>
            À propos
          </div>
        </div>
        <div>
          <p>Carroussel d'actualités</p>
        </div>
      </Layout>
    )
  }
}
