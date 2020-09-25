<template>
  <div>
    <span>{{ mona }}</span>
  </div>
</template>

<script>
  export default {
    data: () => ({
      mona: 'octocat',
    }),
  }
</script>

<style>
  div span {
    color: teal;
  }
</style>
