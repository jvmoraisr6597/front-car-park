<template>
    <table class="table">
      <thead>
        <tr>
            <th scope="col" v-for="item of thead">
                {{ item.name }}
            </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="line in tbody">
          <td><p>{{ line.nome }}</p></td>
          <td><p>{{ line.endereco }}</p></td>      
        </tr>
      </tbody>
    </table>
</template>

<script>
export default {
    props: ['thead', 'tbody']
}

</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>
