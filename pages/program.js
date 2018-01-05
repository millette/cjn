import Markdown from 'react-markdown'
import Link from 'next/link'
import Layout from '../components/layout'
import fs from 'fs'

const Program = (ppp) => {
  const { lang, id } = ppp.url.query
  const programs = ppp.programs ? ppp.programs.map((x) => {
    const ps = x[lang].path.split('/')
    x[lang].id = ps[3]
    return x
  }) : []

  let title
  let More

  if (id) {
    title = `Programme ${id}`
    More = () => (
      <div>
        <h2 className='subtitle is-3'>{ppp.title}</h2>
        <div className='content'>
          <Markdown source={ppp.content} />
        </div>
      </div>
    )
  } else {
    title = 'Programmes'
    More = () => null
  }

  return (
    <Layout page='program' id={id} lang={lang} title={title}>
      <p>Yup</p>
      <ul>
        <li><Link href={`/program?lang=${lang}`} as={`/${lang}/program`}><a>programs</a></Link></li>
        {programs.map((x, i) => (
          <li key={i}><Link href={`/program?lang=${lang}&id=${x[lang].id}`} as={`/${lang}/${lang === 'fr' ? 'programme' : 'program'}/${x[lang].id}`}><a>{x[lang].title}</a></Link></li>
        ))}
      </ul>
      <More />
    </Layout>
  )
}

Program.getInitialProps = async (ppp) => {
  const { req } = ppp

  const bail = (n, err, resolve) => {
    console.error('ERR-FETCH#' + n, err)
    // const err = new Error()
    // err.code = 'ENOENT'
    // throw err

    const obj = {
      title: 'Introuvable.'
    }
    if (resolve) { return resolve(obj) }
    return obj
  }

  const id = ppp.query.id
  let fn

  if (id) {
    switch (id) {
      case 'cci':
      case 'ceic':
        fn = `program/${id}.json`
        break

      case 'communaute':
      case 'community':
        fn = 'program/community.json'
        break

      case 'international':
      case 'internationnal':
        fn = 'program/international.json'
        break

      case 'welcome':
      case 'accueillir':
        fn = 'program/welcome.json'
        break
    }
  } else {
    fn = 'program.json'
  }

  if (req) {
    return new Promise((resolve, reject) => {
      fs.readFile(`data/pages/${fn}`, 'utf-8', (err, ok) => {
        if (err) { return bail(1, err, resolve) }
        try {
          resolve(JSON.parse(ok))
        } catch (err) {
          bail(2, err, resolve)
        }
      })
    })
  }

  // caching experiment
  // if (Program._cache) { return Program._cache }

  return window.fetch(`/data/pages/${fn}`)
    .then((res) => res.json())
    .then((json) => {
      Program._cache = json
      return json
    })
    .catch(bail.bind(this, 3))
    /*
    .catch((err) => {
      err.code = 'ENOENT'
      throw err
    })
    */
}

export default Program
