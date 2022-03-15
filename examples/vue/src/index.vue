<template>
  <div>
    <p>Hello World</p>
    <p class="custom-class">One</p>
    <child-component />
  </div>
</template>

<style lang="css">
.custom-class {
  color: 'white';
}

h1 {
  font-size: 24px;
}
</style>

<script>
import child from 'child'

export default {
  components: {
    'child-component': child,
  },
}
</script>
