<template>
  <v-container fluid>
    <h1>Detail Verify Document</h1>
    <v-card v-if="dataUser">
      <v-card-title>
        <v-flex xs12 sm6>
          <v-select :items="states" v-model="searchlist" label="Select" multiple chips hint="What are the target status" persistent-hint></v-select>
        </v-flex>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="filterlist" :search="search">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.fullname }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
          <td class="text-xs-left">{{ props.item.first_name }}</td>
          <td class="text-xs-left">{{ props.item.last_name }}</td>
          <td class="text-xs-left">
            <template>
              <router-link v-bind:to="{ name: 'DetailVerifyDocument', params: { id: props.item.id, data: props.item } }" class="link-type">
                <span>Detail</span>
              </router-link>
            </template>
          </td>
          <td class="text-xs-left">{{ props.item.document_status }}</td>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
    </v-card>
    {{searchlist}}
  </v-container>
</template>
<script>
import { VCard, VCardTitle, VTextField, VDataTable, VFlex, VSelect, VAlert } from 'vuetify/lib'
import axios from 'axios';

export default {
  components: {
    VCard,
    VCardTitle,
    VTextField,
    VFlex,
    VSelect,
    VDataTable,
    VAlert

  },
  props: ['data'],
  data () {
    return {
      select: "PENDING",
      searchlist: [],
      states: [
        "APPROVED", "PENDING", "REJECT"
      ],
      datafilter: '',
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
  computed: {
    filterlist: function (value) {
      let filtered = this.dataUser;
      let result = [];
      if (this.dataUser == '') {
        console.log('NOOOOOOOO');
        filtered = this.dataUser
        return filtered
      } else {
        let filtered = this.dataUser;

        var i; var j; var filter;
        if (this.searchlist.length > 0) {
          for (i = 0; i < this.searchlist.length; i++) {
            console.log('this.searchlist[i] :', this.searchlist[i]);

            for (j = 0; j < filtered.length; j++) {
              if (filtered[j].document_status.toLowerCase() == this.searchlist[i].toLowerCase()) {
                result.push(filtered[j])
              }
            }
          }
        }
        if (result.length == 0) {
          return this.dataUser
        }
        console.log(result);
        // console.log(filtered);
        // this.datafilter = filtered
        return result
      }
    }
  },
  mounted () {
    axios
      .get('https://api.fxce.net/api/1.0/users', JSON.parse(localStorage.getItem('config')))
      .then(resp => {
        // console.log(data)
        this.dataUser = resp.data.users
      }).catch(error => {
        console.log('error', error.message)
      })
  }
}

</script>
<style scoped>
</style>
