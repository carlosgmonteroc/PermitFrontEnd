<template>
  <Form @submit="createPermit" v-slot="{ meta }">
    <table class="table">
      <thead>
        <tr>
          <th colspan="5">
            <h2>Add new Permit</h2>
          </th>
        </tr>
        <tr>
          <th scope="col" width="20%">
            <div class="mb-3">
              <label for="firstName" class="form-label">First Name</label>
              <Field name="firstName" type="text" class="form-control" id="firstName" :rules="stringRules"
                v-model="newPermit.firstName" />
              <ErrorMessage name="firstName" />
            </div>
          </th>
          <th scope="col" width="20%">
            <div class="mb-3">
              <label for="lastName" class="form-label">Last Name</label>
              <Field name="lastName" type="text" class="form-control" id="lastName" :rules="stringRules"
                v-model="newPermit.lastName" />
              <ErrorMessage name="lastName" />
            </div>
          </th>
          <th scope="col" width="20%">
            <div class="mb-3">
              <label for="permitType" class="form-label">Permit Type</label>
              <Field name="permitType" as="select" class="form-select" :rules="permitTypeRules"
                v-model="newPermit.permitTypeId">
                <option value="" disabled>Select a Permit Type</option>
                <option v-for="permitType in permitTypes" :key="permitType.id" :value="permitType.id">{{
                  permitType.description }}</option>
              </Field>
              <ErrorMessage name="permitType" />
            </div>
          </th>
          <th scope="col" width="20%">
            <div class="mb-3">
              <label for="permitDate" class="form-label">Permit Date</label>
              <Field name="permitDate" type="date" class="form-control" :rules="dateRules"
                v-model="newPermit.permitDate" />
              <ErrorMessage name="permitDate" />
            </div>
          </th>
          <th scope="col" width="20%">
            <div class="mb-3">
              <button type="submit" class="btn btn-primary" :disabled="!meta.valid">
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </th>
        </tr>
      </thead>
    </table>
  </Form>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col" width="16%">#</th>
        <th scope="col" width="17%">First Name</th>
        <th scope="col" width="17%">Last Name</th>
        <th scope="col" width="17%">Permit Type</th>
        <th scope="col" width="17%">Permit Date</th>
        <th width="16%"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="permit in permits">
        <td colspan="6">
          <Form @submit="editPermit(permit)" v-slot="{ meta }">
            <table style="width:100%">
              <tr>
                <th scope="row" width="16%">
                  {{ permit.id }}
                </th>
                <td width="17%">
                  <div class="mb-3">
                    <Field name="firstName-{{permit.id}}" type="text" class="form-control" id="firstName-{{permit.id}}"
                      :rules="stringRules" v-model="permit.firstName" />
                    <ErrorMessage name="firstName-{{permit.id}}" />
                  </div>
                </td>
                <td width="17%">
                  <div class="mb-3">
                    <Field name="lastName-{{permit.id}}" type="text" class="form-control" id="lastName-{{permit.id}}"
                      :rules="stringRules" v-model="permit.lastName" />
                    <ErrorMessage name="lastName-{{permit.id}}" />
                  </div>
                </td>
                <td width="17%">
                  <div class="mb-3">
                    <Field name="permitType-{{permit.id}}" as="select" class="form-select" :rules="permitTypeRules"
                      v-slot="{ value }" v-model="permit.permitType.id">
                      <option value="" disabled>Select a Permit Type</option>
                      <option v-for="permitType in permitTypes" :key="permitType.id" :value="permitType.id"
                        :selected="value">{{
                          permitType.description }}</option>
                    </Field>
                    <ErrorMessage name="permitType" />
                  </div>
                </td>
                <td width="17%">
                  <div class="mb-3">
                    <Field name="permitDate-{{permit.id}}" type="date" class="form-control" :rules="dateRules"
                      v-model="permit.permitDate" />
                    <ErrorMessage name="permitDate-{{permit.id}}" />
                  </div>
                </td>
                <td width="16%">
                  <div class="mb-3">
                    <button type="submit" class="btn btn-primary" :disabled="!meta.valid">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button type="button" class="btn btn-danger" @click="$event => deletePermit(permit.id)">
                      <i class="bi bi-x"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </table>
          </Form>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { getPermitTypes, createPermit, getPermits, updatePermit, deletePermit } from '../services';
import * as yup from 'yup';
import { useToast } from 'vue-toast-notification';
const $toast = useToast();

export default {
  name: 'TableView',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data: () => {
    return {
      disabled: true,
      permitTypes: [],
      permits: [],
      newPermit: {
        firstName: '',
        lastName: '',
        permitTypeId: '',
        permitDate: ''
      },
      stringRules: yup.string().required().min(5),
      dateRules: yup.date().required().max(new Date()),
      permitTypeRules: yup.number().required().moreThan(0),
      enableEdit: false
    }
  },
  props: {
    type: String
  },
  methods: {
    getPermitTypes() {
      getPermitTypes().then(v => {
        this.permitTypes = v
      })
    },
    getPermits() {
      getPermits().then(v => {
        this.permits = v
        console.log(this.permits)
      })
    },
    createPermit() {
      createPermit({
        firstName: this.newPermit.firstName,
        lastName: this.newPermit.lastName,
        permitTypeId: this.newPermit.permitTypeId,
        permitDate: this.newPermit.permitDate
      }).then(v => {
        this.getPermits();
        this.newPermit = {
          firstName: '',
          lastName: '',
          permitTypeId: '',
          permitDate: ''
        }
        $toast.success('New permit created!');
      })
    },
    editPermit(permit) {
      updatePermit(permit.id, {
        firstName: permit.firstName,
        lastName: permit.lastName,
        permitTypeId: permit.permitType.id,
        permitDate: permit.permitDate
      })
        .then(v => {
          this.getPermits();
          $toast.success('Permit updated!');
        })
    },
    deletePermit(id) {
      deletePermit(id)
        .then(v => {
          this.getPermits();
          $toast.success('Permit deleted!');
        })
    }
  },
  mounted() {
    this.getPermitTypes();
    this.getPermits();
  }
}
</script>