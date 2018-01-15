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
import roi from 'roi';

export default {
  name: "Contacts",
  data() {
    return {
      contacts: [],
      contact: {name: '', email: '', number: ''}
    };
  },
  created() {
    const opts = {
      endpoint: `http://booster-backend-demomean.192.168.42.194.nip.io/contacts`,
      noAuth: true
    }
    roi.get(opts)
    .then(response => {
      this.contacts = JSON.parse(response.body);
    })
    .catch(e => {
      console.log(e);
    })
  },
  methods: {
    add() {
      const opts = {
        endpoint: `http://booster-backend-demomean.192.168.42.194.nip.io/contacts`,
        noAuth: true
      }
      roi.post(opts, {name: this.contact.name, email: this.contact.email, number: this.contact.number})
      .then(response => {
        this.contact = {name: '', email: '', number: ''};
      })
      .catch(e => {
        console.log(e);
      })
    },
    remove(id) {
      const opts = {
        endpoint: `http://booster-backend-demomean.192.168.42.194.nip.io/contacts/${id}`,
        noAuth: true
      }
      roi.del(opts)
      .then(response => {
        console.log('update the table list');
      })
      .catch(e => {
        console.log(e);
      })
    },
    edit(id) {
      const opts = {
        endpoint: `http://booster-backend-demomean.192.168.42.194.nip.io/contacts/${id}`,
        noAuth: true
      }
      roi.get(opts)
      .then(response => {
        const body = JSON.parse(response.body);
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
