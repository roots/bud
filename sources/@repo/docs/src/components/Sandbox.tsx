import React from 'react'

export const Sandbox = ({id, style = {}, allow, sandbox, title}) => (
  <iframe
    src={`https://codesandbox.io/embed/${id}?expanddevtools=1&fontsize=12&hidenavigation=1&theme=dark`}
    title={title ?? id}
    allow={
      allow ??
      `accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking`
    }
    sandbox={
      sandbox ??
      `allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts`
    }
    style={{
      width: `100%`,
      height: `80vh`,
      border: `0`,
      borderRadius: `4px`,
      overflow: `hidden`,
      ...style,
    }}
  />
)
