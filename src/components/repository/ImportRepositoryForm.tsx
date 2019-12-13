import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RadioList from '../utils/RadioList'
import './ImportRepositoryForm.css'
import {
  importRepository,
  importRepositoryByFront,
  fetchRepositoryList
} from '../../actions/repository'
import { Button } from '@material-ui/core'

class ImportRepositoryForm extends Component<any, any> {
  static contextTypes = {
    rmodal: PropTypes.object.isRequired,
  }
  static propTypes = {
    orgId: PropTypes.number.isRequired,
    importRepository: PropTypes.func.isRequired,
    importRepositoryByFront: PropTypes.func.isRequired,
  }
  constructor(props: any) {
    super(props)
    this.state = {
      orgId: props.orgId,
      version: 'rap1',
      docUrl: '',
      method: 'front',
      disableSubmit: false,
    }
  }
  render() {
    const { rmodal } = this.context
    const { disableSubmit } = this.state
    return (
      <section className="ImportRepositoryForm">
        <div className="rmodal-header">
          <span className="rmodal-title">{this.props.title}</span>
        </div>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="rmodal-body">
            <div className="form-group row">
              <label className="col-sm-2 control-label">版本</label>
              <div className="col-sm-10">
                <RadioList
                  data={[
                    { label: 'RAP1', value: 'rap1' },
                    { label: 'Swagger', value: 'swagger' },
                  ]}
                  curVal={this.state.version}
                  name="version"
                  onChange={(value: number) => {
                    this.setState({ version: value })
                  }}
                />
              </div>
            </div>
            <div>
              <div className="form-group row">
                <label className="col-sm-2 control-label">文档URL</label>
                <div className="col-sm-10">
                  <input
                    name="projectId"
                    value={this.state.docUrl}
                    onChange={e => this.setState({ docUrl: e.target.value })}
                    className="form-control"
                    placeholder={
                      this.state.version === 'rap1'
                        ? 'http://rapapi.org/workspace/myWorkspace.do?projectId=145#2548'
                        : 'http://118.89.64.176:9520/bond-basic/swagger-ui.html'
                    }
                    spellCheck={false}
                    autoFocus={true}
                    required={true}
                    data-parsley-maxlength="256"
                  />
                </div>
              </div>
              {this.state.version === 'swagger' && (
                <div className="form-group row">
                  <label className="col-sm-2 control-label">导入方式</label>
                  <div className="col-sm-10">
                    <RadioList
                      data={[
                        { label: '前端', value: 'front' },
                        { label: '服务端', value: 'back' },
                      ]}
                      curVal={this.state.method}
                      name="method"
                      onChange={(value: number) => {
                        this.setState({ method: value })
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="form-group row mb0">
                <label className="col-sm-2 control-label" />
                <div className="col-sm-10">
                  <Button
                    type="submit"
                    id="btnSubmitImportRAP"
                    disabled={disableSubmit}
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 8 }}
                  >
                    {disableSubmit ? '导入中，请稍等...' : '提交'}
                  </Button>
                  <Button onClick={() => rmodal.close()}>取消</Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    )
  }
  componentDidUpdate() {
    this.context.rmodal.reposition()
  }
  handleSubmit = (e: any) => {
    this.setState({
      disableSubmit: true,
    })
    e.preventDefault()
    const { docUrl, orgId, version, method } = this.state
    try {
      if (version === 'swagger' && method === 'front') {
        this.props.importRepositoryByFront({ docUrl, orgId }, (res: any) => {
          this.setState({
            disableSubmit: false,
          })
          if (res.isOk) {
            this.context.rmodal.resolve()
          } else {
            console.log(res.message)
          }
        })
      } else {
        this.props.importRepository({ docUrl, orgId, version }, (res: any) => {
          this.setState({
            disableSubmit: false,
          })
          if (res.isOk) {
            this.context.rmodal.resolve()
          } else {
            console.log(res.message)
          }
        })
      }
    } catch (error) {
      this.setState({
        disableSubmit: false,
      })
    }

  };
}

const mapDispatchToProps = {
  importRepository,
  importRepositoryByFront,
  fetchRepositoryList,
}

export default connect(
  null,
  mapDispatchToProps
)(ImportRepositoryForm)
