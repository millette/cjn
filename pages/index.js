import Link from 'next/link'
import Head from 'next/head'

export default () => (
  <div className='container'>
    <Head>
      <title>TOP PAGE</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bulma@0.6.1/css/bulma.css' integrity='sha256-lUssH++umYLC/97WXqr424ew3ing8e+dATTAmMpCF40=' crossOrigin='anonymous' />
    </Head>

    <h1 className='title is-1'>TOP PAGE</h1>
    <div className='content'>
      <ul>
        <li><Link prefetch href={{ pathname: '/index2', query: { lang: 'fr' } }} as='/fr/'><a>Français</a></Link></li>
        <li><Link prefetch href={{ pathname: '/index2', query: { lang: 'en' } }} as='/en/'><a>English</a></Link></li>
      </ul>
    </div>
  </div>
)
