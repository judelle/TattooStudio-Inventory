<template>
  <div>
    <h1>Materials</h1>
    <ul>
      <li v-for="material in materials" :key="material.id">
        {{ material.name }} - {{ material.quantity }}
        <button @click="useMaterial(material.id)">-</button>
        <button @click="increaseMaterial(material.id)">+</button>
      </li>
    </ul>
    <input v-model="newMaterial.name" placeholder="Name">
    <input v-model.number="newMaterial.quantity" type="number" placeholder="Quantity">
    <button @click="addMaterial">Add Material</button>
  </div>
</template>

<script>
import { getMaterials, addMaterial, updateMaterial, increaseMaterial } from '../api';

export default {
  name: 'MaterialsList',
  data() {
    return {
      materials: [],
      newMaterial: {
        name: '',
        quantity: 0
      }
    };
  },
  created() {
    this.fetchMaterials();
  },
  methods: {
    fetchMaterials() {
      getMaterials().then(response => {
        this.materials = response.data.data;
      });
    },
    addMaterial() {
      addMaterial(this.newMaterial).then(() => {
        this.fetchMaterials();
        this.newMaterial.name = '';
        this.newMaterial.quantity = 0;
      });
    },
    useMaterial(id) {
      const quantityUsed = 1; 

      updateMaterial(id, quantityUsed).then(() => {
        this.fetchMaterials();
      }).catch(error => {
        console.error('Error updating material:', error);
      });
    },
    increaseMaterial(id) {
      const quantityIncreased = 1; 

      increaseMaterial(id, quantityIncreased).then(() => {
        this.fetchMaterials();
      }).catch(error => {
        console.error('Error increasing material:', error);
      });
    }
  }
};
</script>

<style>
  
</style>
