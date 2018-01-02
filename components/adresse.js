import * as config from '../data/global/config.json'

export default ({className}) => <ul className={className}>
  <li><b>{config.nom}</b></li>
  <li>{config.adresse.civiqueRue}</li>
  <li>{config.adresse.ville}{config.adresse.province ? `, ${config.adresse.province}` : ''}</li>
  <li>{config.adresse.codePostal}</li>
  <li>{config.adresse.pays}</li>
  {config.telephones.map((tel, i) => <li key={i}>{tel.type}: {tel.numero}</li>)}
</ul>
