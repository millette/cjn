import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

/*
 * Problèmes importants avec les embeds Facebook (iframe):
 * #1  lent
 * #2  reset entre les pages
 * #3a pas trop responsive
 * #3b n'occuppe pas tout la largeur disponible en mobile (étroit)
 * #3c la taille ne s'ajuste pas automatiquement on window resize
 *
 * On peut peut-être règler #2 en mettant le embed dans document.js
 * au lieu du layout. Une autre avenue serait l'attribut key de React.
 * Du coup, ça améliorera #1.
 * Il ne resterait que #3 à arranger:
 *   * https://www.smashingmagazine.com/2014/02/making-embedded-content-work-in-responsive-design/
 *   * https://benmarshall.me/responsive-iframes/
 *
 * Voir aussi:
 *   * https://m.facebook.com/Chantiersjeunesse/
 *   * https://github.com/svenanders/react-iframe
 *   * https://medium.com/@ebakhtarov/handling-of-iframes-in-react-f038be46ac24
 *   * https://stackoverflow.com/questions/33913737/inserting-the-iframe-into-react-component
 *   * https://react.rocks/tag/IFrame
 *   * http://davidandsuzi.com/react-components-for-cat-videos/
 *   * https://iframely.com/docs/reactjs
 *   * https://stackoverflow.com/questions/45207536/react-prevent-iframe-from-reload-on-state-change
 *   * https://github.com/facebook/react/issues/4826
 *
*/

export default class LayoutAdmin extends React.Component {
  render () {
    const { title, children } = this.props

    return (
      <div className='container'>
        <Head>
          <title>Admin - {title}</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bulma@0.6.1/css/bulma.css' integrity='sha256-lUssH++umYLC/97WXqr424ew3ing8e+dATTAmMpCF40=' crossOrigin='anonymous' />
        </Head>
        <header className='columns'>
          <div className='column'>
            <nav>
              <Link prefetch href='/admin'><a>admin</a></Link> |
              <Link prefetch href='/admin/premiere'><a>admin première page</a></Link> |
              <Link prefetch href='/admin/b'><a>admin B</a></Link>
            </nav>
          </div>
        </header>

        <div className='columns'>
          <div className='column'>
            { children }
          </div>
          <div className='column is-one-quarter'>
            <p><i>Bla bla bla si nécessaire</i></p>
          </div>
        </div>

        <style global jsx>{`
          .column {
            border: thin red solid;
          }
        `}</style>
      </div>
    )
  }
}
