import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default ({url}) => {
  let Back = () => null

  if (url && url.asPath) {
    const x = new window.URL(url.asPath, 'http://localhost/')
    const retour = x.searchParams.get('retour')
    if (retour) {
      Back = () => (<h2 className='subtitle is-3'><Link prefetch href={retour}><a>Aller à la page précédente</a></Link></h2>)
    }
  }

  return (
    <div className='container'>
      <Head>
        <title>Chantiers jeunesse</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bulma@0.6.1/css/bulma.css' integrity='sha256-lUssH++umYLC/97WXqr424ew3ing8e+dATTAmMpCF40=' crossOrigin='anonymous' />
      </Head>

      <h1 className='title is-1'>Chantiers jeunesse</h1>
      <Back />
      <div className='content'>
        <ul>
          <li><Link prefetch href='/index2?lang=fr' as='/fr/'><a>Français</a></Link></li>
          <li><Link prefetch href='/index2?lang=en' as='/en/'><a>English</a></Link></li>
        </ul>
      </div>
    </div>
  )
}
