import React from 'react'
import qs from 'querystring'
import { Formik, Form } from 'formik'
import {
  Button,
  Theme,
  Dialog,
  Slide,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import { CREDENTIALS } from '../../relatives/services/constant'
import { connect } from '../../family'
import { showMessage, MSG_TYPE } from '../../actions/common'
import { Repository } from '../../actions/types'

const useStyles = makeStyles(({ spacing }: Theme) => ({
  root: {
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: spacing(2),
    flex: 1,
  },
  preview: {
    marginTop: spacing(1),
  },
  form: {
    minWidth: 500,
    minHeight: 100,
  },
  formTitle: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 9,
  },
  formItem: {
    marginBottom: spacing(1),
  },
  ctl: {
    marginTop: spacing(3),
  },
}))

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

interface Props {
  title?: string
  open: boolean
  onClose: (isOk?: boolean) => void
  repository?: Repository
  showMessage: (message: string, type?: MSG_TYPE | undefined) => void
}

function SyncTardisModal(props: Props) {
  const { open, onClose, title } = props
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      onClose={(_event, reason) => (reason !== 'backdropClick' && onClose())}
      TransitionComponent={Transition}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers={true}>
        <div className={classes.form}>
          <Formik
            initialValues={{
              env: 1,
            }}
            onSubmit={values => {
              const { env } = values
              const ENV_DOMAIN = ['dev', 'test', 'www']

              const { showMessage } = props
              fetch(`https://${ENV_DOMAIN[env]}.qtrade.com.cn/tardis/rap2/sync`, {
                ...CREDENTIALS,
                method: 'POST',
                mode: 'no-cors',
                body: qs.stringify({
                  repositoryName: 'name',
                }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              }).then(() => {
                showMessage('同步到Tardis成功！', MSG_TYPE.SUCCESS)
              }).catch(() => {
                showMessage('同步到Tardis失败！', MSG_TYPE.ERROR)
              }).finally(() => {
                onClose(true)
              })
            }}
            render={({ isSubmitting, setFieldValue, values }) => {
              return (
                <Form>
                  <div className="rmodal-body">
                    <div className={classes.formItem}>
                      <FormControl>
                        <div className={classes.formTitle}>选择环境：</div>
                        <RadioGroup
                          name="radioListEnv"
                          value={values.env}
                          onChange={e => {
                            setFieldValue('env', +(e.target as any).value)
                          }}
                          row={true}
                        >
                          <FormControlLabel
                            value={0}
                            control={<Radio />}
                            label="开发"
                          />
                          <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label="测试"
                          />
                          <FormControlLabel
                            value={2}
                            control={<Radio />}
                            label="线上"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                  <div className={classes.ctl}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="mr1"
                      disabled={isSubmitting}
                    >
                      提交
                    </Button>
                    <Button onClick={() => onClose()} disabled={isSubmitting}>
                      取消
                    </Button>
                  </div>
                </Form>
              )
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

// 容器组件
const mapStateToProps = () => ({})
const mapDispatchToProps = {
  showMessage,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SyncTardisModal)
