import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout'

export default class C extends React.Component {
  static getInitialProps ({ query }) { return query }

  render () {
    const Dl = this.props.id
      ? () => {
        return (
          <dl>
            <dt>CCC</dt>
            <dd>{this.props.id}</dd>
          </dl>
        )
      }
      : () => null

    const lang = this.props.lang || 'fr'

    return (
      <Layout lang={lang} title='Page CCC'>
        <h2 className='title is-2'>Page CCC {lang}</h2>
        <div className='content'>
          <Dl />
          <ul>
            <li><Link href={{ pathname: '/c', query: { id: 'joe', lang } }} as={`/${lang}/c/joe`}><a>Joe</a></Link></li>
            <li><Link href={{ pathname: '/c', query: { id: 'alf', lang } }} as={`/${lang}/c/alf`}><a>Alf</a></Link></li>
            <li><Link href={{ pathname: '/c', query: { id: 'bob', lang } }} as={`/${lang}/c/bob`}><a>Bob</a></Link></li>
          </ul>
        </div>
      </Layout>
    )
  }
}
