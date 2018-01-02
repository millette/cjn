import React from 'react'
import Layout from '../components/layout'

export default class About extends React.Component {
  static getInitialProps ({ query }) { return query }

  render () {
    const lang = this.props.lang

    return (
      <Layout page='about' lang={lang} title={lang === 'fr' ? 'À propos' : 'About us'}>
        <h2 className='title is-2'>{lang === 'fr' ? 'À propos' : 'About us'}</h2>
        <p>aaa</p>
      </Layout>
    )
  }
}
