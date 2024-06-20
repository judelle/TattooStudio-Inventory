<template>
  <div id="app">
    <nav>
      <ul>
        <li><a href="#">Главная</a></li>
        <li><a href="#">Материалы</a></li>
        <li><a href="#">Услуги</a></li>
        <li><a href="#">Контакты</a></li>
      </ul>
    </nav>
    <MaterialsList />
  </div>
</template>

<script>
import MaterialsList from './components/MaterialsList.vue';

export default {
  name: 'App',
  components: {
    MaterialsList
  }
};
</script>
 <style>
 
</style>