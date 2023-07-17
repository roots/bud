import logo from '@components/logo.svg'

export const App = () => {
  return (
    <div className="app">
      <img alt="logo" className="logo animate-pulse" src={logo} />
      <span className="justify-center inline-block text-center align-middle">
        Edit src/components/app.tsx and save to reload
      </span>
    </div>
  )
}
