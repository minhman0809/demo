<template>
  <v-container fluid grid-list-lg>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-left>
        <div class="title-doc"> {{ data.fullname }}</div>
        <div class="page-detail-document">
          <div class="list-image">
            <v-layout row wrap>
              <v-flex xs4>
                <div class="item-image">
                  <!-- {{ document_no }} -->
                  <div class="image">
                    <div class="super-img loaded ratio-16x9" v-bind:style="{ 'backgroundImage': 'url(' + documents.front_pic + ')' }">
                      <img v-bind:src="documents.front_pic" />
                    </div>
                  </div>
                  <p>Front Image</p>
                </div>
              </v-flex>

              <v-flex xs4>
                <div class="item-image">
                  <!-- {{ document_no }} -->
                  <div class="image">
                    <div class="super-img loaded ratio-16x9" v-bind:style="{ 'backgroundImage': 'url(' + documents.back_pic + ')' }">
                      <img v-bind:src="documents.back_pic" />
                    </div>
                  </div>
                  <p>Back Image</p>
                </div>
              </v-flex>

              <v-flex xs4>
                <div class="item-image">
                  <div class="image">
                    <div class="super-img loaded ratio-16x9" v-bind:style="{ 'backgroundImage': 'url(' + documents.selfie_pic + ')' }">
                      <img v-bind:src="documents.selfie_pic" />
                    </div>
                  </div>
                  <p>Selfie Image</p>
                </div>
              </v-flex>
            </v-layout>
          </div>
          <div class="document-info">
            <p><span>Document number</span> {{ documents.document_no }}</p>
            <p><span>Username</span> {{ data.fullname }}</p>
            <p><span>Email</span> {{ data.email }}</p>
            <p><span>First Name</span> {{ data.first_name }}</p>
            <p><span>Last Name</span> {{ data.last_name }}</p>
            <p><span>Reject Reason *</span> <span class="input"><input v-model="note" type="text" required></span></p>
          </div>

          <div class="form-btn-submit">
            <div class="text-center">
              <div>{{result}}</div>
              <button type="submit" class="btn btn-info btn-fill btn-approve" @click.prevent="changeStatus('approved')">
                APPROVE
              </button>
              <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="changeStatus('reject')">
                REJECT
              </button>
            </div>
          </div>
        </div>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import Vue from "vue";
import axios from "axios";

export default {
  props: ["id", "data"],
  data () {
    return {
      documents: "",
      note: '',
      result: ''
    };
  },
  mounted () {
    axios
      .get("https://api.fxce.net/api/1.0/users/document/" + this.id, JSON.parse(localStorage.getItem('config')))
      .then(resp => {
        console.log('get document');
        this.documents = resp.data
      }).catch(error => {
        console.log('error', error.message)
      });
  },
  methods: {
    changeStatus (value) {
      var url = 'https://api.fxce.net/api/1.0/documents/update/status/' + this.documents.id
      var data = {
        status: value,
        note: this.note
      };

      axios.patch(url, data, JSON.parse(localStorage.getItem('config')))
        .then(response => {
          this.result = 'Update ' + value + ' success'
          console.log('SUCCESS UPDATE!!', value);
        })
        .catch(function () {
          this.result = 'FAIL'
          console.log('FAILURE UPDATE !!');
        });

    }
  }
};
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
.title-doc {
  font-size: 30px;
  color: #000;
  font-weight: bold;
  margin-bottom: 20px;
}
.super-img img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  opacity: 0;
}

.super-img {
  position: relative;
  width: 100%;
  background: no-repeat center center;
  background-size: cover;
  overflow: hidden;
  padding-top: 56.25%;
  opacity: 0;
}
.super-img.loaded {
  opacity: 1;
}
.super-img.ratio-16x9 {
  padding-top: 56.25%;
}
.super-img.ratio-1x1 {
  padding-top: 100%;
}

.page-detail-document .card {
  background-color: transparent;
  box-shadow: none;
}

.page-detail-document .card-header {
  padding: 0;
}
.page-detail-document .card-header h4 {
  font-size: 30px;
  text-transform: uppercase;
}

.page-detail-document .list-image {
  display: inline-block;
  width: 100%;
  margin-bottom: 40px;
}
.page-detail-document .list-image .item-image {
  width: 100%;
  text-align: center;
}
.page-detail-document .list-image .item-image img {
  max-width: 100%;
  width: 100%;
}
.page-detail-document .list-image .item-image .image {
  margin-bottom: 20px;
}
.page-detail-document .list-image .item-image p {
  font-size: 20px;
}

.page-detail-document .document-info > p {
  font-size: 20px;
  margin-bottom: 30px;
}
.page-detail-document .document-info > p > span {
  font-weight: bold;
  color: #000;
  display: inline-block;
  min-width: 175px;
  margin-right: 30px;
}
.page-detail-document .document-info > p > span.input {
  border: 1px solid rgba(0, 0, 0, 0.3);
  color: #000;
  font-size: 20px;
  font-weight: normal;
  padding-left: 10px;
  outline: none;
}
.page-detail-document .document-info > p > span.input:focus {
  outline: none;
}
.page-detail-document .form-btn-submit {
  text-align: center;
}
.page-detail-document .form-btn-submit button {
  font-size: 18px;
  color: #fff;
  padding: 5px 30px;
  border-radius: 20px;
  margin-right: 10px;
  background-color: red;
}
.page-detail-document .form-btn-submit button:focus {
  outline: none;
}
.page-detail-document .form-btn-submit button:hover {
  opacity: 0.7;
}
.page-detail-document .form-btn-submit button.btn-approve {
  background-color: #42b983;
}
</style>
