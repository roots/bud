<template>
  <div className="app">
    <div className="header">
      <Logo />
      Edit <code>src/components/app.vue</code> and save to reload
    </div>
  </div>
</template>

<script setup>
import Logo from './logo.svg.vue'
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

.app {
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: rgb(4 1 17);

  & .logo {
    height: 30vmin;
    pointer-events: none;
    margin-bottom: 2rem;
    animation: app-logo-spin infinite 20s linear;
  }

  & .header {
    min-height: 80vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }
}

@keyframes app-logo-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
