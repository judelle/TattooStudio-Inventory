<template>
  <div id="app">
    <nav>
      <ul>
        <router-link to="/" class="nav-link">Главная</router-link>
        <router-link to="/materials" class="nav-link">Материалы</router-link>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

 <style>
 
</style>