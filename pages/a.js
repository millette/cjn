import React from 'react'
import Layout from '../components/layout'

export default class B extends React.Component {
  static getInitialProps ({ query }) { return query }

  render () {
    const lang = this.props.lang || 'fr'

    return (
      <Layout page='a' lang={lang} title='Page AAA'>
        <h2 className='title is-2'>Page AAA {lang}</h2>
        <p>aaa</p>
      </Layout>
    )
  }
}

/*
export default () => <Layout title='Page AAA'>
  <h2 className='title is-2'>Page AAA</h2>
  <p>aaa</p>
</Layout>
*/
