import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import Adresse from './adresse'
import SocialButtons from './social-buttons'

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

export default class Layout extends React.Component {
  render () {
    const { id, page, title, lang, children } = this.props

/*
    const crumbsImp = [lang, page || 'front']
    // if (page) { crumbsImp.push(page) }
    if (id) { crumbsImp.push(id) }
    // console.log('CRUMBS-0:', crumbsImp)

    const crumbs = ['index', '/'].concat(crumbsImp).map((x, i) => {
      const ret = [
        x,
        '/' + crumbsImp.slice(0, i + 1).join('/')
      ]
      switch (crumbsImp.length) {
        case 1:
          ret.push('/index')
          break

        case 2:
          ret.push('/front')
          break

        case 3:
          ret.push(x)
          break
      }

      return ret
    })

    console.log('CRUMBS:', crumbs)

    const Crumbs = () => (
      <nav className='breadcrumb' aria-label='breadcrumbs'>
        <ul>
          {crumbs.map((x, i) => (
            <li key={i}><Link href={{ pathname: x[2], query: { id, lang } }} as={x[1]}><a>{x[0]}</a></Link></li>
          ))}
        </ul>
      </nav>
    )
*/

    const Crumbs = () => null

    const Lng = () => {
      const p2 = page || 'front'
      const p = id ? (page + '/' + id) : page
      let l
      let str

      if (lang === 'fr') {
        l = 'en'
        str = 'English'
      } else {
        l = 'fr'
        str = 'Français'
      }

      return <Link href={{ pathname: '/' + p2, query: { id, lang: l } }} as={'/' + l + '/' + ((l === 'fr' && p === 'about') ? 'a-propos' : p)}><a className='navbar-item'>{ str }</a></Link>
    }

    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bulma@0.6.1/css/bulma.css' integrity='sha256-lUssH++umYLC/97WXqr424ew3ing8e+dATTAmMpCF40=' crossOrigin='anonymous' />
          <script defer src='https://use.fontawesome.com/releases/v5.0.2/js/all.js' integrity='sha384-xiGKJ+4CP2p2WkTifyjHDeZVAg1zBrnJV8LU33N7J+5BWp1biPcSpEJJY7hFiRLn' crossOrigin='anonymous' />
        </Head>

        <header className='header'>
          <nav className={`navbar is-mobile ${lang === 'fr' ? 'is-primary' : 'is-link'}`} role='navigation' aria-label='main navigation'>
            <div className='navbar-brand'>
              <Link prefetch href={{ pathname: '/front', query: { lang } }} as={`/${lang}/`}><a className='navbar-item'><img src='/static/imgs/logo-cj.png' alt='Logo Chantiers jeunesse' /></a></Link>

              <button className='button navbar-burger'>
                <span />
                <span />
                <span />
              </button>
            </div>

            <div className='navbar-menu'>
              <div className='navbar-start'>
                <Link prefetch href='/'><a className='navbar-item'>Top</a></Link>
                <Link prefetch href={{ pathname: '/c', query: { lang } }} as={`/${lang}/c`}><a className='navbar-item'>ccc</a></Link>
                <Link prefetch href={{ pathname: '/about', query: { lang } }} as={`/${lang}/${lang === 'fr' ? 'a-propos' : 'about'}`}><a className='navbar-item'>À propos</a></Link>
                <Link prefetch href={{ pathname: '/program', query: { lang } }} as={`/${lang}/${lang === 'fr' ? 'programme' : 'program'}`}><a className='navbar-item'>{lang === 'fr' ? 'Les programmes' : 'The programs' }</a></Link>
                <Link prefetch href={{ pathname: '/contact', query: { lang } }} as={`/${lang}/contact`}><a className='navbar-item'>Contact</a></Link>
              </div>

              <div className='navbar-end'>
                <div className='navbar-item'>Membre</div>
                <Link prefetch href='/admin'><a className='navbar-item'>admin</a></Link>
                <Lng />
              </div>
            </div>
          </nav>
        </header>

        <section className='section'>
          <div className='container'>
            <Crumbs />
            <div className='columns'>
              <div className='column'>
                { children }
              </div>
              <div className='column is-one-quarter'>
                <p>
                  Timeline <a href='https://www.facebook.com/Chantiersjeunesse/'>Chantiers jeunesse</a> Facebook
                </p>
                <div>Faire un Don</div>
              </div>
            </div>
          </div>
        </section>

        <section className='section'>
          <div className='container'>
            Mentions et Logo des Partenaires
          </div>
        </section>

        <footer className='footer'>
          <div className='container'>
            <div className='columns'>
              <div className='column'>
                <Adresse />
              </div>

              <div className='column is-narrow'>
                <SocialButtons />
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}
