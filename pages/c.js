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

    return (
      <Layout title='Page CCC'>
        <h2 className='title is-2'>Page CCC</h2>
        <div className='content'>
          <Dl />
          <ul>
            <li><Link href='/c?id=joe' as='/c/joe'><a>Joe</a></Link></li>
            <li><Link href='/c?id=alf' as='/c/alf'><a>Alf</a></Link></li>
            <li><Link href='/c?id=bob' as='/c/bob'><a>Bob</a></Link></li>
          </ul>
        </div>
      </Layout>
    )
  }
}
