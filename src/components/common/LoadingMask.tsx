import React from 'react'
import { makeStyles, createStyles, Dialog, CircularProgress } from '@material-ui/core'
import { DialogProps } from '@material-ui/core/Dialog'
import { green } from '@material-ui/core/colors'

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '12px 16px',
    },
    progress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -24,
      marginLeft: -12,
    },
    text: {
      position: 'relative',
      top: '50%',
      marginTop: 40,
      textShadow: '0 1px 2px #fff',
    },
  })
)

interface Props extends DialogProps {
  label: string
}

export default function LoadingMask(props: Props) {
  const { label, ...rest } = props
  const classes = useStyles()
  const loading = props.open
  return (
    <Dialog
      open={loading}
      {...rest}
    >
      <div className={classes.content}>
        {loading && <CircularProgress size={24} className={classes.progress} />}
        <div className={classes.text}>{label}</div>
      </div>
    </Dialog>
  )
}
