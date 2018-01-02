import Link from 'next/link'
import Head from 'next/head'
import fs from 'fs'

const Top = ({ url, subtitleFr, subtitleEn, linkFr, linkEn, welcomeFr, welcomeEn }) => {
  let Back = () => null

  if (url && url.asPath) {
    const x = new window.URL(url.asPath, 'http://localhost/')
    const retour = x.searchParams.get('retour')
    if (retour) {
      Back = () => (<h2 className='subtitle is-3 has-text-centered'><i><Link href={retour}><a>Aller à la page précédente</a></Link></i></h2>)
    }
  }

  return (
    <section className='hero is-bold is-fullheight is-light'>
      <Head>
        <title>Chantiers jeunesse</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bulma@0.6.1/css/bulma.css' integrity='sha256-lUssH++umYLC/97WXqr424ew3ing8e+dATTAmMpCF40=' crossOrigin='anonymous' />
      </Head>
      <div className='hero-head'>
        <div className='container'>
          <h1 className='title is-1 has-text-centered'>
            <img src='/static/imgs/logo-cj.png' />
            Chantiers jeunesse</h1>
          <Back />
        </div>
      </div>

      <div className='hero-body'>
        <div className='container'>
          <div className='columns'>
            <div className='column'>
              <div className='box has-text-centered'>
                <h2 className='subtitle is-4'>{subtitleFr}</h2>
                <p className='is-size-6'>{welcomeFr}</p>
                <Link prefetch href='/index2?lang=fr' as='/fr/'><a className='button is-rounded is-large is-primary'>{linkFr}</a></Link>
              </div>
            </div>
            <div className='column'>
              <div className='box has-text-centered'>
                <h2 className='subtitle is-4'>{subtitleEn}</h2>
                <p className='is-size-6'>{welcomeEn}</p>
                <Link prefetch href='/index2?lang=en' as='/en/'><a className='button is-rounded is-large is-link'>{linkEn}</a></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='hero-foot'>
        <div className='container has-text-centered'>
          <p>Nous contacter, etc. <Link prefetch href='/admin'><a>admin</a></Link></p>
        </div>
      </div>

      <style jsx>{`
        h1 > img {
          margin: 0 auto;
          height: 3em;
          display: block;
        }

        @media (min-width: 620px) {
          h1 > img {
            margin: 0 0.75em 0 0;
            vertical-align: middle;
            height: 1.5em;
            display: inline;
          }
        }

        .hero {
          padding: 1.5em 0;
        }

        a.button {
          margin-top: 1.25em;
        }

        .hero-body {
          margin: 1em 0;
          /*
           * i-1.jpg i-2.jpg i-3.jpg i-4.jpg i-5.jpg image2.jpg image.jpg
           * image2: ok (shadow)
           * i-1: ok (lively)
           * i-2: hmm
           * i-3: hmm
           * i-4: medium (anonymous)
           * i-5: medium (nature)
           * i-5: medium (nature/lively)
           */
          background-image: url('/static/imgs/i-1.jpg');
          background-size: cover;
          background-position: center;
        }
      `}</style>

    </section>
  )
}

Top.getInitialProps = async ({ req }) => {
  const bail = (n, err, resolve) => {
    console.log('ERR-FETCH#' + n, err)
    const obj = {
      linkFr: 'Français',
      linkEn: 'English'
    }
    if (resolve) { return resolve(obj) }
    return obj
  }

  if (req) {
    return new Promise((resolve, reject) => {
      fs.readFile('data/pages/premiere.json', 'utf-8', (err, ok) => {
        if (err) { return bail(1, err, resolve) }
        try {
          resolve(JSON.parse(ok))
        } catch (err) {
          bail(2, err, resolve)
        }
      })
    })
  }

  return window.fetch('/data/pages/premiere.json')
    .then((res) => res.json())
    .catch(bail.bind(this, 3))
}

export default Top
