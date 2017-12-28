import React from 'react'
import Layout from '../components/layout'

export default class B extends React.Component {
  static getInitialProps ({ query }) { return query }

  render () {
    const lang = this.props.lang || 'fr'

    return (
      <Layout page='b' lang={lang} title='Page BBB'>
        <h2 className='title is-2'>Page BBB {lang}</h2>
        <p>bbb</p>
      </Layout>
    )
  }
}

/*
export default () => <Layout title='Page BBB'>
  <h2 className='title is-2'>Page BBB</h2>
  <p>bbb</p>
</Layout>
*/
