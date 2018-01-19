<template>
  <div class="container">
    <h1>Vuejs Contacts Application</h1>
    <div class="panel panel-default">
      <div class="panel-heading">
        <div class="panel-title">Contacts</div>
      </div>
      <div class="panel-body">
        <form>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th colspan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="text" class="form-control" v-model="contact.name" name="name"></td>
              <td><input type="text" class="form-control" v-model="contact.email" name="email"></td>
              <td><input type="text" class="form-control" v-model="contact.number" name="number"></td>
              <td><button type="button" class="btn btn-default btn-block" @click="add()">Add contact</button></td>
              <td><button type="button" class="btn btn-info btn-block" @click="update(contact)">Update</button></td>
            </tr>
            <tr v-for="c in contacts">
              <td>{{c.name}}</td>
              <td>{{c.email}}</td>
              <td>{{c.number}}</td>
              <td><button type="button" class="btn btn-danger btn-block" @click="remove(c._id)">Remove</button></td>
              <td><button type="button" class="btn btn-warning btn-block" @click="edit(c._id)">Edit</button></td>
            </tr>
          </tbody>
        </table>
      </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
delete axios.defaults.headers.common["Authorization"];  //replacement for noAuth:true in roi opts
const endpoint = 'http://booster-backend-demomean.192.168.42.194.nip.io/contacts';
export default {
  name: "Contacts",
  data() {
    return {
      contacts: [],
      contact: {name: '', email: '', number: ''}
    };
  },
  created() {
    axios.get(endpoint)
    .then(response => {
      this.contacts = response.data;
    })
    .catch(e => {
      console.log(e);
    })
  },
  methods: {
    add() {
      axios.post(endpoint, {name: this.contact.name, email: this.contact.email, number: this.contact.number})
      .then(response => {
        this.contacts.push(response.data.contact);
        this.contact = {name: '', email: '', number: ''};
      })
      .catch(e => {
        console.log(e);
      })
    },
    remove(id) {
      const delEndpoint = endpoint + `/${id}`;
      axios.delete(delEndpoint)
      .then(response => {
        this.contacts = this.contacts.filter((c) => c._id !== id);
      })
      .catch(e => {
        console.log(e);
      })
    },
    edit(id) {
      const editEndpoint = endpoint + `/${id}`;
      axios.get(editEndpoint)
      .then(response => {
        const body = response.data;
        this.contact = {name: body.name, email: body.email, number: body.number};
      })
      .catch(e => {
        console.log(e);
      })
    },
    update(contact) {
      console.log('not implemented yet. Contact:', contact.name, contact.email, contact.number);
    }
  }
};
</script>
