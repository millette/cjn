import React from 'react'
import Link from 'next/link'
import faker from 'faker' // see package.json (browser key) excluded from client-side bundle

export default class Index extends React.Component {
  static getInitialProps ({ req }) { return { name: req ? faker.name.findName() : 'Robin' } }

  render () {
    const { name } = this.props
    return (
      <div>
        <h1>Home Page</h1>
        <p>Welcome, {name}</p>
        <ul>
          <li><Link prefetch href='/a'><a>aaa</a></Link></li>
          <li><Link prefetch href='/b'><a>bbb</a></Link></li>
          <li><Link prefetch href='/'><a>index</a></Link></li>
        </ul>
      </div>
    )
  }
}
