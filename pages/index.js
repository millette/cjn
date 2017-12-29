import Link from 'next/link'

export default () => (
  <div>
    <h1 className='title is-1'>TOP PAGE</h1>
    <ul>
      <li><Link href={{ pathname: '/index2', query: { lang: 'fr' } }} as='/fr/'><a>Français</a></Link></li>
      <li><Link href={{ pathname: '/index2', query: { lang: 'en' } }} as='/en/'><a>English</a></Link></li>
    </ul>
  </div>
)
