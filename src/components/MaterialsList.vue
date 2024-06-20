<template>
  <div class="box">
    <header>
      <h1>Materials</h1>
      <form @submit.prevent="addMaterial">
        <input v-model="newMaterial.name" placeholder="Name">
        <input v-model.number="newMaterial.quantity" type="number" placeholder="Quantity">
        <button>Add Material</button>
      </form>
    </header>
    <main>
      <ul class="MaterialList">
        <li v-for="material in materials" :key="material.id" class="MaterialItem">
          {{ material.name }} - {{ material.quantity }}
          <div class="ItemButtons">
            <button @click="useMaterial(material.id)">-</button>
            <button @click="increaseMaterial(material.id)">+</button>
            <button @click="deleteMaterial(material.id)">delete</button>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import { getMaterials, addMaterial, updateMaterial, increaseMaterial, deleteMaterial } from '../api';

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
    },
    deleteMaterial(id) {
      deleteMaterial(id).then(() => {
        this.fetchMaterials();
      }).catch(error => {
        console.error('Error deleting material:', error);
      });
    }
  }
};
</script>

<style scoped>
.box {
  min-height: 100vh;
  padding-top: 30px;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 241, 223);
}

li {
  font-size: 17px;
  font-weight: 500;
  color: #181818;
}

header {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.MaterialList {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;
}

.MaterialItem {
  padding-top: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: space-between;
  flex-direction: row;
}

button {
  position: relative;
  margin-left: 5px;
  padding: 3px;
  border: 3px solid #fec195;
  border-radius: 8px;
  background-color: #fec195;
  font-size: 17px;
  font-weight: 500;
  color: #181818;
  box-shadow: 0 0 0 #fec1958c;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

button:hover {
  background: transparent;
  color: #916444;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

input {
  position: relative;
  margin-left: 5px;
  padding: 3px;
  border: 3px solid #fec195;
  border-radius: 8px;
  background: transparent;
  font-size: 17px;
  font-weight: 500;
  color: #181818;
  box-shadow: 0 0 0 #fec1958c;
  transition: all 0.3s ease-in-out;
}

input:focus {
  outline: none;
  color: #916444;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
