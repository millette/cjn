import React from 'react'
import Link from 'next/link'
import LayoutAdmin from '../components/layout-admin'

export default class Index extends React.Component {
  static getInitialProps () { return { } }

  render () {
    return (
      <LayoutAdmin page='' title='Administration'>
        <div className='content'>
          <h2>Administration</h2>
          <p>Refelemele tsé ok la bon ca va.</p>
          <p>Refelemele tsé ok la bon ca va.</p>
          <p><Link prefetch href='/admin/premiere'><a>Éditer la première page</a></Link>.</p>
        </div>
      </LayoutAdmin>
    )
  }
}
