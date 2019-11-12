import React from 'react'
import { List, ListItem, Paper } from '@material-ui/core'
import Logo from 'components/layout/Logo'
import { getBGImageUrl } from 'utils/ImageUtils'
import config from '../../config'
import './LoginForm.css'

class LoginForm extends React.Component<any> {
  componentDidMount() {
    const { location } = this.props
    const { params } = location
    const original = params.original || '/'
    console.log(location);
    (window as any).WwLogin({
      id: 'wx_reg',
      appid: config.work_wx.corpId,
      agentid: config.work_wx.agentId,
      redirect_uri: encodeURIComponent(config.serve + '/account/wx_login'),
      state: `${window.location.origin}${original}`,
      href: '',
    })
  }
  render() {
    return (
      <div className="wrapper" style={{ background: getBGImageUrl() }}>
        <Paper className="LoginForm">
          <List>
            <ListItem className="header">
              <Logo color="#3f51b5" />
            </ListItem>
            <ListItem className="body">
              <div id="wx_reg"/>
            </ListItem>
          </List>
        </Paper>
      </div>
    )
  }
}

export default LoginForm
