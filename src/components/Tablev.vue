<template>
  <v-data-table
    v-bind:headers="headers"
    v-bind:items="items"
    v-bind:search="search"
    v-model="selected"
    selected-key="name"
    select-all
    class="elevation-1"
    @input="onInput"
  >
    <template slot="headers" scope="props">
      <span v-tooltip:bottom="{ 'html': props.item.text }">
        {{ props.item.text }}
      </span>
    </template>
    <template slot="items" scope="props">
      <td>
        <v-checkbox
          primary
          hide-details
          v-model="props.selected"
        ></v-checkbox>
      </td>
      <td>{{ props.item.name }}</td>
      <td  class="text-xs-right">{{ props.item.calories }}</td>
      <td  class="text-xs-right">{{ props.item.fat }}</td>
      <td  class="text-xs-right">{{ props.item.carbs }}</td>
      <td  class="text-xs-right">{{ props.item.protein }}</td>
      <td  class="text-xs-right">{{ props.item.sodium }}</td>
      <td  class="text-xs-right">{{ props.item.calcium }}</td>
      <td  class="text-xs-right">{{ props.item.iron }}</td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
      data() {
          return {
              search: '',
              selected: [],
              headers: [
                  {
                      text: 'Dessert (100g serving)',
                      left: true,
                      sortable: false,
                      value: 'name'
                  },
                  {text: 'Calories', value: 'calories'},
                  {text: 'Fat (g)', value: 'fat'},
                  {text: 'Carbs (g)', value: 'carbs'},
                  {text: 'Protein (g)', value: 'protein'},
                  {text: 'Sodium (mg)', value: 'sodium'},
                  {text: 'Calcium (%)', value: 'calcium'},
                  {text: 'Iron (%)', value: 'iron'}
              ],
              items: [
                  {
                      value: false,
                      name: 'Frozen Yogurt',
                      calories: 159,
                      fat: 6.0,
                      carbs: 24,
                      protein: 4.0,
                      sodium: 87,
                      calcium: '14%',
                      iron: '1%'
                  },
                  {
                      value: false,
                      name: 'Ice cream sandwich',
                      calories: 237,
                      fat: 9.0,
                      carbs: 37,
                      protein: 4.3,
                      sodium: 129,
                      calcium: '8%',
                      iron: '1%'
                  }
              ]
          };
      },
      methods: {
          onInput(val) {
              console.log(val);
          }
      }

  };
</script>
