import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import Adresse from './adresse'

// import * as config from '../data/global/config.json'

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

    const Lng = () => {
      const p2 = page || 'index2'
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

      return <Link href={{ pathname: '/' + p2, query: { id, lang: l } }} as={'/' + l + '/' + p}><a className='navbar-item'>{ str }</a></Link>
    }

    return (
      <div>
        <Head>
          <title>{ title } { lang }</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bulma@0.6.1/css/bulma.css' integrity='sha256-lUssH++umYLC/97WXqr424ew3ing8e+dATTAmMpCF40=' crossOrigin='anonymous' />
        </Head>

        <header className='header'>
          <nav className={`navbar ${lang === 'fr' ? 'is-primary' : 'is-link'}`} role='navigation' aria-label='main navigation'>
            <div className='navbar-brand'>
              <Link prefetch href={{ pathname: '/index2', query: { lang } }} as={`/${lang}/`}><a className='navbar-item'><img src='/static/imgs/logo-cj.png' alt='Logo Chantiers jeunesse' /></a></Link>

              <button className='button navbar-burger'>
                <span />
                <span />
                <span />
              </button>
            </div>

            <div className='navbar-menu'>
              <div className='navbar-start'>
                <Link prefetch href='/'><a className='navbar-item'>Top</a></Link>
                <Link prefetch href={{ pathname: '/a', query: { lang } }} as={`/${lang}/a`}><a className='navbar-item'>aaa</a></Link>
                <Link prefetch href={{ pathname: '/b', query: { lang } }} as={`/${lang}/b`}><a className='navbar-item'>bbb</a></Link>
                <Link prefetch href={{ pathname: '/c', query: { lang } }} as={`/${lang}/c`}><a className='navbar-item'>ccc</a></Link>
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
          <div>
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
                <div className='columns has-text-centered'>
                  <div className='column'>
                    <a href='http://www.facebook.com/chantiersjeunesse'>
                      <img src='https://image.jimcdn.com/app/cms/image/transf/none/path/sd97e5c94889b28fd/image/ie10626b9d35e4c9a/version/1447443298/image.png' alt='Facebook' />
                    </a>
                  </div>

                  <div className='column'>
                    <a href='https://www.youtube.com/channel/UCRsOtVF7T5yec2O5vrrio3Q'>
                      <img src='https://image.jimcdn.com/app/cms/image/transf/none/path/sd97e5c94889b28fd/image/i3e4a089b472ce543/version/1447443298/image.png' alt='YouTube' />
                    </a>
                  </div>

                  <div className='column'>
                    <a href='skype:chantiers.jeunesse?call'>
                      <img src='https://image.jimcdn.com/app/cms/image/transf/none/path/sd97e5c94889b28fd/image/i6a78e3a9ec22ba8f/version/1447443313/image.png' alt='Skype' />
                    </a>
                  </div>

                  <div className='column'>
                    <a href='mailto:cj@cj.qc.ca'>
                      <img src='https://image.jimcdn.com/app/cms/image/transf/none/path/sd97e5c94889b28fd/image/i6b25a7a9e629ade5/version/1447442020/image.png' alt='e-mail' />
                    </a>
                  </div>

                  <div className='column'>
                    <a href='https://www.instagram.com/Chantiersjeuness'>
                      <img src='https://image.jimcdn.com/app/cms/image/transf/dimension=210x210:mode=crop:format=png/path/sd97e5c94889b28fd/image/i9efc4e3d4409ffab/version/1456329471/image.png' alt='Instagram' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <style global jsx>{`
          footer a > img {
            background-color: rgba(0,63,130,0.462);
            width: 2em;
          }
        `}</style>
      </div>
    )
  }
}
