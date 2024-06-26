<template>
  <div>
    <h1>Materials Page</h1>
    <MaterialsList />
  </div>
</template>

<script>
import MaterialsList from '../components/MaterialsList.vue';

export default {
  name: 'MaterialsPage',
  components: {
    MaterialsList
  }
};
</script>

<style scoped>

</style>