import React from 'react'

export default class FormOne extends React.Component {
  constructor (props) {
    super(props)
    this.initialInfo = Object.assign({}, props.info || {})
    delete this.initialInfo.url
    this.initialKeys = Object.keys(this.initialInfo)
    this.state = Object.assign({}, this.initialInfo)
    this.handleClear = this.handleClear.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  get action () { return '/admin/premiere' }

  handleClear (event) {
    const cleared = {
      success: false,
      danger: false
    }
    this.initialKeys.forEach((k) => { cleared[k] = '' })
    this.setState(cleared)
  }

  handleReset (event) { this.setState(this.initialInfo) }

  handleChange (event) {
    console.log('VVV:', typeof event.target.value)
    const s = {
      success: false,
      danger: false
    }
    if (event.target.name) {
      s[event.target.name] = event.target.value
    }
    this.setState(s)
  }

  handleSubmit (event) {
    event.preventDefault()
    if (!this.state) { return }
    console.log('Submitted state:', this.state)

    for (const r in this.state) {
      if (this.state[r].trim) {
        this.initialInfo[r] =  this.state[r].trim()
      } else if ((r !== 'success') && (r !== 'danger')) {
        this.state[r]
      }
    }
    this.handleReset()
    const headers = new window.Headers()
    headers.append('Content-Type', 'application/json')

    window.fetch(this.action, {
      headers,
      method: 'POST',
      body: JSON.stringify(this.initialInfo)
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ success: json.message })
      })
      .catch((err) => {
        this.setState({ danger: err.toString() })
      })
  }

  render () {
    const SuccessNotification = () => {
      if (!this.state.success) { return null }
      return (
        <div className="notification is-success">
          <button type='button' onClick={this.handleChange} className="delete"></button>
          {this.state.success}
        </div>
      )
    }

    const DangerNotification = () => {
      if (!this.state.danger) { return null }
      return (
        <div className="notification is-danger">
          <button type='button' onClick={this.handleChange} className="delete"></button>
          {this.state.danger}
        </div>
      )
    }

    return (
      <form action={this.action} onSubmit={this.handleSubmit} method='post'>
        <SuccessNotification />
        <DangerNotification />

        <div className='columns'>
          <div className='column'>
            <fieldset>
              <legend>Français</legend>
              <div className='field'>
                <label className='label'>Texte du lien vers le français
                  <div className='control'>
                    <input required className='input' name='linkFr' type='text' placeholder='Français' value={this.state.linkFr} onChange={this.handleChange} />
                  </div>
                </label>
              </div>

              <div className='field'>
                <label className='label'>Slogan / sous-titre
                  <div className='control'>
                    <input className='input' name='subtitleFr' type='text' placeholder='Bienvenue sur notre site web' value={this.state.subtitleFr} onChange={this.handleChange} />
                  </div>
                </label>
              </div>

              <div className='field'>
                <label className='label'>Message d'accueil
                  <div className='control'>
                    <textarea name='welcomeFr' placeholder='Bienvenue sur notre site web' value={this.state.welcomeFr} onChange={this.handleChange} className='textarea' />
                  </div>
                </label>
              </div>
            </fieldset>
          </div>

          <div className='column'>
            <fieldset>
              <legend>Anglais</legend>
              <div className='field'>
                <label className='label'>English link text
                  <div className='control'>
                    <input required className='input' name='linkEn' type='text' placeholder='English' value={this.state.linkEn} onChange={this.handleChange} />
                  </div>
                </label>
              </div>

              <div className='field'>
                <label className='label'>Slogan / subtitle
                  <div className='control'>
                    <input className='input' name='subtitleEn' type='text' placeholder='Welcome to our website' value={this.state.subtitleEn} onChange={this.handleChange} />
                  </div>
                </label>
              </div>

              <div className='field'>
                <label className='label'>Welcome message
                  <div className='control'>
                    <textarea name='welcomeEn' placeholder='Welcome to our website' value={this.state.welcomeEn} onChange={this.handleChange} className='textarea' />
                  </div>
                </label>
              </div>
            </fieldset>
          </div>
        </div>

        <div className='columns'>
          <div className='column'>
            <div className='field is-grouped is-grouped-centered'>
              <div className='control'>
                <input type='submit' className='button is-primary' />
              </div>
              <div className='control'>
                <input type='reset' className='button is-warning' value='Par défaut' onClick={this.handleReset} />
              </div>
              <div className='control'>
                <input type='reset' className='button is-danger' value='Clear' onClick={this.handleClear} />
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          fieldset {
            padding: 1.25em 0.75em;
            border: thin dotted blue;
          }
          .column {
            border: none;
          }
        `}</style>

      </form>
    )
  }
}
