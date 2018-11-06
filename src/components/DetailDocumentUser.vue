<template>
  <v-container fluid>
    <h1>Detail Verify Document</h1>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="dataUser" :search="search">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.fullname }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-left">{{ props.item.first_name }}</td>
          <td class="text-xs-left">{{ props.item.last_name }}</td>
          <td class="text-xs-left">
            <router-link v-bind:to="{ name: 'DetailVerifyDocument', params: { id: props.item.id, data: props.item } }" class="link-type">
              <span>Detail</span>
            </router-link>
          </td>
          <td class="text-xs-left">{{ props.item.document_status }}</td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
import { VCard, VCardTitle, VTextField, VDataTable } from 'vuetify/lib'
import axios from 'axios';

export default {
  components: {
    VCard,
    VCardTitle,
    VTextField,
    VDataTable
  },
  props: ['data'],
  data () {
    return {
      dataUser: '',
      search: '',
      headers: [
        {
          text: 'User Name',
          align: 'left',
          sortable: false,
          value: 'username'
        },
        {
          text: 'Email',
          align: 'left',
          sortable: false,
          value: 'email'
        },
        {
          text: 'First Name',
          align: 'left',
          sortable: false,
          value: 'firstname'
        },
        {
          text: 'Last Name',
          align: 'left',
          sortable: false,
          value: 'lastname'
        },
        {
          text: '',
          align: 'left',
          sortable: false,
          value: 'detail'
        },
        {
          text: 'Status',
          align: 'left',
          sortable: false,
          value: 'status'
        }
      ]
    }
  },
  created () {
    let config = {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk4Njk0NWJmMWIwNDYxZjBiZDViNTRhZWQ0YzQ1ZWU0ODMzMjgxOWEifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZm9yZXgtZWMyMDgiLCJuYW1lIjoiTmFtIEhvYW5nIiwiYXVkIjoiZm9yZXgtZWMyMDgiLCJhdXRoX3RpbWUiOjE1NDA0NTA3NTYsInVzZXJfaWQiOiIwN0lWSjZHM083VnVTcUpydW5IRlM0aDhzMHQxIiwic3ViIjoiMDdJVko2RzNPN1Z1U3FKcnVuSEZTNGg4czB0MSIsImlhdCI6MTU0MDQ1MDc1NiwiZXhwIjoxNTQwNDU0MzU2LCJlbWFpbCI6ImFkbWluQHZuY2RldnMuaW8iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhZG1pbkB2bmNkZXZzLmlvIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.GD50QJECR6YXe_5DXUQPkhfdaY-4u5c-pRJeuzT1xdn5fMZsU2eL4QSge65MkFt8j9UJYiTFmaWxuJJGW9L7c2TIDaNExmjHFHhzsPemww0yXXN-HbKtOpSRFBFPulucJWL1VC5V8rUgp0NW6eIREGHrRRIC8r0Rk8D6fWIyGZjtkFLt35OlJKKyw0pmN_xT0-DqqKLHDpAaFkB2a8xUB_yMDM_xtN1GlEb305afbLZeexj_GxhwMWqN08d2t-2qVkMfSXuT02nkcoBOdro-n6C3AGAukBkd7B-mVAp1DEERw2abGo-KpAuI2aQUT3i6yt8qPVw0KetUWIiRakPZZw'
      }
    }
    axios
      .get('https://api.fxce.net/api/1.0/users', config)
      .then(resp => {
        let data = resp.data.users
        console.log(data)
        this.dataUser = data
      }).catch(error => {
        // commit('setRealAccounts', [])
        console.log('error', error.message)
      })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
