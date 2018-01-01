import React from 'react'
import Layout from '../components/layout'

export default class Contact extends React.Component {
  static getInitialProps ({ query }) { return query }

  render () {
    const lang = this.props.lang

    return (
      <Layout page='contact' lang={lang} title='Nous contacter'>
        <h2 className='title is-2'>Nous contacter {lang}</h2>
        <p>Tralalère lère la.</p>
      </Layout>
    )
  }
}
