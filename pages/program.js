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
    More = () => <p>{ppp.title}</p>
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
          <li key={i}><Link href={`/program?lang=${lang}&id=${x[lang].id}`} as={`/${lang}/program/${x[lang].id}`}><a>{x[lang].title}</a></Link></li>
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
    const obj = {
      title: 'Introuvable.'
    }
    if (resolve) { return resolve(obj) }
    return obj
  }

  const id = ppp.query.id
  const fn = id ? `program/${id}.json` : 'program.json'

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
}

export default Program
