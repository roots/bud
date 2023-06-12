import React from 'react'

export const Sandbox = ({allow, id, sandbox, style = {}, title}) => (
  <iframe
    allow={
      allow ??
      `accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking`
    }
    sandbox={
      sandbox ??
      `allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts`
    }
    style={{
      border: `0`,
      borderRadius: `4px`,
      height: `80vh`,
      overflow: `hidden`,
      width: `100%`,
      ...style,
    }}
    src={`https://codesandbox.io/embed/${id}?expanddevtools=1&fontsize=12&hidenavigation=1&theme=dark`}
    title={title ?? id}
  />
)
